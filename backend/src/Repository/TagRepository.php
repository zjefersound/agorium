<?php

namespace App\Repository;

use App\Domain\Tag;
use App\DTO\SearchDTO;
use Doctrine\ORM\EntityRepository;

class TagRepository extends EntityRepository
{
    public function save(Tag $tag): Tag
    {
        $em = $this->getEntityManager();
        $em->persist($tag);
        $em->flush();

        return $tag;
    }

    public function search(SearchDTO $search): array
    {
        $qb = $this->createQueryBuilder('t');

        // Optional term search
        if (!empty($search->term)) {
            $qb->where('t.name LIKE :search')
                ->setParameter('search', '%' . $search->term . '%');
        }

        // Clone for total count
        $totalQb = clone $qb;
        $total = (int) $totalQb->select('COUNT(t.id)')->getQuery()->getSingleScalarResult();

        // Sorting
        if (!empty($search->sortBy)) {
            $qb->orderBy('t.' . $search->sortBy, $search->sortOrder);
        }

        // Apply pagination
        $qb->setFirstResult(($search->page - 1) * $search->limit)
            ->setMaxResults($search->limit);

        // Get paginated results
        $query = $qb->getQuery();
        $tags = $query->getResult();

        return [
            'data' => array_map(fn($tag) => $tag->jsonSerialize(), $tags),
            'pagination' => [
                'currentPage' => $search->page,
                'perPage' => $search->limit,
                'total' => $total,
                'totalPages' => ceil($total / $search->limit),
            ],
        ];
    }

    public function trending(): array
    {
        $qb = $this->createQueryBuilder('t')
            ->select('t as tag, COUNT(p.id) as totalPosts')
            ->leftJoin('t.posts', 'p')
            ->groupBy('t.id')
            ->orderBy('totalPosts', 'DESC')
            ->setMaxResults(5);

        $results = $qb->getQuery()->getResult();

        return array_map(fn($result) => [
            'tag' => $result['tag']->jsonSerialize(),
            'totalPosts' => (int) $result['totalPosts']
        ], $results);
    }


    public function delete(Tag $tag)
    {
        $em = $this->getEntityManager();
        $em->remove($tag);
        $em->flush();
    }
}
