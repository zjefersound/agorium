<?php

namespace App\Repository;

use App\Domain\Vote;
use Doctrine\ORM\EntityManagerInterface;
use Exception;

class VoteRepository
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function save(Vote $vote)
    {
        $this->em->persist($vote);
        $this->em->flush();
    }

    public function find(int $id)
    {
        return $this->em->getRepository(Vote::class)->find($id);
    }

    public function delete(int $voteId)
    {
        $user = $this->em->getReference(Vote::class, $voteId);
        if (!$user) {
            throw new Exception("Vote not found!");
        }

        $this->em->remove($user);
        $this->em->flush();
    }

    public function getUserTotalUpvotes(int $userId): int
    {
        $qb = $this->em->createQueryBuilder();

        $qb->select('COUNT(v.id)')
            ->from(Vote::class, 'v')
            ->leftJoin('v.post', 'p')
            ->leftJoin('v.comment', 'c')
            ->where('(p.user = :userId OR c.user = :userId)')
            ->andWhere('v.voteType = :upvote')
            ->setParameter('userId', $userId)
            ->setParameter('upvote', 'upvote');

        return (int) $qb->getQuery()->getSingleScalarResult();
    }
}
