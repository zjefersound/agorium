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
}
