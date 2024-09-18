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

    public function save(Post $post, array $tagNames): void
    {
        $this->handleTags($tagNames, $post);

        // Persist the post
        $this->em->persist($post);
        $this->em->flush();

        $this->cleanUpTags();
    }

    public function search(PostSearchDTO $search): array
    {
        $qb = $this->em->getRepository(Post::class)->createQueryBuilder('c');

        // Optional term search
        if (!empty($search->term)) {
            $qb->where('c.title LIKE :search')
                ->setParameter('search', '%' . $search->term . '%');
        }

        // Filter by categoryId
        if (!empty($search->categoryId)) {
            $qb->andWhere('c.category = :categoryId')
                ->setParameter('categoryId', $search->categoryId);
        }

        $totalQb = clone $qb;
        $total = (int) $totalQb->select('COUNT(c.id)')->getQuery()->getSingleScalarResult();

        // Sorting
        if (!empty($search->sortBy)) {
            $qb->orderBy('c.' . $search->sortBy, $search->sortOrder);
        }

        // Apply pagination
        $qb->setFirstResult(($search->page - 1) * $search->limit)
            ->setMaxResults($search->limit);

        // Get paginated results
        $query = $qb->getQuery();
        $posts = $query->getResult();

        return [
            'data' =>  array_map(fn($post) => $post->jsonSerialize(), $posts),
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
