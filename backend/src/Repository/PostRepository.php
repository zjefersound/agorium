<?php

namespace App\Repository;

use App\Domain\Post;
use App\Domain\Tag;
use App\Domain\Vote;
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

    public function findDetailed(int $postId, int $userId): ?array
    {
        $qb = $this->em->getRepository(Post::class)->createQueryBuilder('p')
            ->leftJoin('p.votes', 'v')
            ->addSelect(
                'SUM(CASE WHEN v.voteType = \'upvote\' THEN 1 WHEN v.voteType = \'downvote\' THEN -1 ELSE 0 END) AS totalUpvotes'
            )
            ->where('p.id = :postId')
            ->setParameter('postId', $postId)
            ->groupBy('p.id');

        $post = $qb->getQuery()->getOneOrNullResult();

        if (!$post) {
            return null;
        }

        $userVote = $this->em->getRepository(Vote::class)->findOneBy([
            'post' => $postId,
            'user' => $userId,
        ]);

        $userVoteData = $userVote ? $userVote->jsonSerialize() : null;

        $totalUpvotes = (int) $post['totalUpvotes'];

        return array_merge(
            $post[0]->jsonSerialize(),
            [
                'totalUpvotes' => $totalUpvotes,
                'userVote' => $userVoteData,
            ]
        );
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

    public function search(PostSearchDTO $search, int $loggedUserId): array
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
        // Filter by userId
        if (!empty($search->userId)) {
            $qb->andWhere('p.user = :userId')
                ->setParameter('userId', $search->userId);
        }

        $totalQb = clone $qb;
        $total = (int) $totalQb->select('COUNT(p.id)')->getQuery()->getSingleScalarResult();

        // Join with the votes table to get vote counts and the user's specific vote
        $qb->leftJoin('p.votes', 'v')
            ->addSelect(
                'SUM(CASE WHEN v.voteType = \'upvote\' THEN 1 WHEN v.voteType = \'downvote\' THEN -1 ELSE 0 END) AS totalUpvotes',
                'MAX(CASE WHEN v.user = :loggedUserId THEN v.voteType ELSE \'\' END) AS userVote'
            )
            ->setParameter('loggedUserId', $loggedUserId)
            ->groupBy('p.id');

        // Sorting
        if ($search->sortBy === 'totalUpvotes') {
            $qb->orderBy('totalUpvotes', $search->sortOrder);
        } else {
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
                        'totalUpvotes' => (int) $post['totalUpvotes'],
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
