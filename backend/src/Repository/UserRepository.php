<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;
use App\Domain\User;

class UserRepository extends EntityRepository
{
    public function isEmailTaken(string $email): bool
    {
        return $this->findOneBy(['email' => $email]) != null;
    }

    public function isUsernameTaken(string $username): bool
    {
        return $this->findOneBy(['username' => $username]) != null;
    }

    public function findUserByEmailOrUsername(string $login): ?User
    {
        return $this->createQueryBuilder('u')
            ->where('u.email = :login OR u.username = :login')
            ->setParameter('login', $login)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function add(User $user): ?User
    {
        $em = $this->getEntityManager();
        $em->persist($user);
        $em->flush();

        return $user;
    }

    public function getRankedUsers(int $page, int $limit): array
    {
        $qb = $this->createQueryBuilder('u')
            ->select(
                'u',
                '(SELECT COUNT(v.id) FROM App\Domain\Vote v 
                LEFT JOIN v.post postVote 
                LEFT JOIN v.comment commentVote 
                WHERE (postVote.user = u OR commentVote.user = u) AND v.voteType = \'upvote\') AS totalUpvotes',
                '(SELECT COUNT(post.id) FROM App\Domain\Post post WHERE post.user = u) AS totalPosts',
                '(SELECT COUNT(comment.id) FROM App\Domain\Comment comment WHERE comment.user = u) AS totalComments'
            )
            ->groupBy('u.id')
            ->orderBy('totalUpvotes', 'DESC')
            ->addOrderBy('totalPosts', 'DESC')
            ->addOrderBy('totalComments', 'DESC');

        // Pagination logic
        $qb->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit);

        // Get the query results
        $query = $qb->getQuery();
        $users = $query->getResult();

        $total = (int) $this->createQueryBuilder('u')
            ->select('COUNT(u.id)')
            ->getQuery()
            ->getSingleScalarResult();

        $rankedUsers = [];
        foreach ($users as $key => $user) {
            $rankedUsers[] = [
                'userId' => $user[0]->getId(),
                'user' => $user[0]->jsonSerializePublic(),
                'totalUpvotes' => (int) $user['totalUpvotes'],
                'totalPosts' => (int) $user['totalPosts'],
                'totalComments' => (int) $user['totalComments'],
                'position' => ($page - 1) * $limit + $key + 1
            ];
        }

        return [
            'data' => $rankedUsers,
            'pagination' => [
                'currentPage' => $page,
                'perPage' => $limit,
                'total' => $total,
                'totalPages' => ceil($total / $limit),
            ],
        ];
    }

    public function save(User $user): User
    {
        $em = $this->getEntityManager();
        $em->persist($user);
        $em->flush();

        return $user;
    }
}
