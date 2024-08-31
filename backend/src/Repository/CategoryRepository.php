<?php

namespace App\Repository;

use App\Domain\Category;
use App\DTO\SearchDTO;
use Doctrine\ORM\EntityRepository;

class CategoryRepository extends EntityRepository
{
    public function save(Category $category): Category
    {
        $em = $this->getEntityManager();
        $em->persist($category);
        $em->flush();

        return $category;
    }

    public function search(SearchDTO $search): array
    {
        $qb = $this->createQueryBuilder('c');

        // Optional term search
        if (!empty($search->term)) {
            $qb->where('c.name LIKE :search OR c.description LIKE :search')
                ->setParameter('search', '%' . $search->term . '%');
        }

        // Sorting
        if (!empty($search->sortBy)) {
            $qb->orderBy('c.' . $search->sortBy, $search->sortOrder);
        }

        // Apply pagination
        $qb->setFirstResult(($search->page - 1) * $search->limit)
            ->setMaxResults($search->limit);

        // Get paginated results
        $query = $qb->getQuery();
        $categories = $query->getResult();

        $total = count($categories);

        return [
            'data' =>  array_map(fn($category) => $category->jsonSerialize(), $categories),
            'pagination' => [
                'currentPage' => $search->page,
                'perPage' => $search->limit,
                'total' => $total,
                'totalPages' => ceil($total / $search->limit),
            ],
        ];
    }

    public function delete(Category $category)
    {
        $em = $this->getEntityManager();
        $em->remove($category);
        $em->flush();
    }
}
