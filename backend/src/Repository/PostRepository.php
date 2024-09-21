<?php

namespace App\Repository;

use App\Domain\Post;
use App\Domain\Tag;
use App\DTO\PostSearchDTO;
use Doctrine\ORM\EntityManagerInterface;

class PostRepository
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function find(int $id)
    {
        return $this->em->getRepository(Post::class)->find($id);
    }

    /**
     * Save a Post entity, optionally handling tags.
     *
     * @param Post $post
     * @param array|null $tagNames Optional tag names to associate with the post.
     */
    public function save(Post $post, ?array $tagNames = null): void
    {
        if ($tagNames !== null) {
            $this->handleTags($tagNames, $post);
        }

        // Persist the post and any changes
        $this->em->persist($post);
        $this->em->flush();

        if ($tagNames !== null) {
            $this->cleanUpTags();
        }
    }

    public function search(PostSearchDTO $search): array
    {
        $qb = $this->em->getRepository(Post::class)->createQueryBuilder('p');

        // Optional term search
        if (!empty($search->term)) {
            $qb->where('p.title LIKE :search')
                ->setParameter('search', '%' . $search->term . '%');
        }

        // Filter by categoryId
        if (!empty($search->categoryId)) {
            $qb->andWhere('p.category = :categoryId')
                ->setParameter('categoryId', $search->categoryId);
        }

        // Filter by tagId
        if (!empty($search->tagId)) {
            $qb->innerJoin('p.tags', 't')
                ->andWhere('t.id = :tagId')
                ->setParameter('tagId', $search->tagId);
        }

        $totalQb = clone $qb;
        $total = (int) $totalQb->select('COUNT(p.id)')->getQuery()->getSingleScalarResult();

        // Join with the votes table to get vote counts and the user's specific vote
        $qb->leftJoin('p.votes', 'v')
            ->addSelect(
                'SUM(CASE WHEN v.voteType = \'upvote\' THEN 1 ELSE 0 END) AS upvotes',
                'SUM(CASE WHEN v.voteType = \'downvote\' THEN 1 ELSE 0 END) AS downvotes',
                'MAX(CASE WHEN v.user = :userId THEN v.voteType ELSE \'\' END) AS userVote'
            )
            ->setParameter('userId', (int) $search->userId)
            ->groupBy('p.id');

        // Sorting
        if (!empty($search->sortBy)) {
            $qb->orderBy('p.' . $search->sortBy, $search->sortOrder);
        }

        // Apply pagination
        $qb->setFirstResult(($search->page - 1) * $search->limit)
            ->setMaxResults($search->limit);

        // Get paginated results
        $query = $qb->getQuery();
        $posts = $query->getResult();

        return [
            'data' => array_map(function ($post) {
                $userVote = $post['userVote'];
                return array_merge(
                    $post[0]->jsonSerialize(),
                    [
                        'upvotes' => (int) $post['upvotes'],
                        'downvotes' => (int) $post['downvotes'],
                        'totalVotes' => (int) $post['upvotes'] - (int) $post['downvotes'],
                        'voted' => !is_null($userVote),
                        'userVote' => $userVote,
                    ]
                );
            }, $posts),
            'pagination' => [
                'currentPage' => $search->page,
                'perPage' => $search->limit,
                'total' => $total,
                'totalPages' => ceil($total / $search->limit),
            ],
        ];
    }

    public function delete(Post $post)
    {
        $this->em->remove($post);
        $this->em->flush();
    }

    private function cleanUpTags(): void
    {
        $deleteQuery = <<<SQL
            DELETE FROM tags 
            WHERE id NOT IN (
                SELECT DISTINCT tag_id 
                FROM post_tags
            )
        SQL;

        $this->em->getConnection()->executeQuery($deleteQuery);
    }

    private function handleTags(array $tagNames, Post $post)
    {
        // Handle Tags
        $tags = [];
        foreach ($tagNames as $tagName) {
            $tag = $this->em->getRepository(Tag::class)
                ->findOneBy(['name' => $tagName]);

            if (!$tag) {
                $tag = new Tag($tagName);
                $this->em->persist($tag);
            }
            $tags[] = $tag;
        }

        // Clear old tags and set new ones
        $post->getTags()->clear();
        foreach ($tags as $tag) {
            $post->getTags()->add($tag);
        }
    }
}
