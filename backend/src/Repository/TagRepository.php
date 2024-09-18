<?php

namespace App\Repository;

use App\Domain\Tag;
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

    public function search(string $searchTerm): array
    {
        $qb = $this->createQueryBuilder('t');

        // Optional term search
        if (!empty($searchTerm)) {
            $qb->where('t.name LIKE :search')
                ->setParameter('search', '%' . $searchTerm . '%');
        }

        // Execute query and get results
        $tags = $qb->getQuery()->getResult();

        return array_map(fn($tag) => $tag->jsonSerialize(), $tags);
    }

    public function delete(Tag $tag)
    {
        $em = $this->getEntityManager();
        $em->remove($tag);
        $em->flush();
    }
}
