<?php

namespace App\Repository;

use App\Domain\Category;
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
}
