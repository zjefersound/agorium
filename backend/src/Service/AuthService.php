<?php

namespace App\Service;

use App\Repository\UserRepository;
use App\Domain\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService
{
    private UserRepository $userRepository;
    private string $jwtSecret;

    public function __construct(UserRepository $userRepository, string $jwtSecret)
    {
        $this->userRepository = $userRepository;
        $this->jwtSecret = $jwtSecret;
    }

    public function generateJwt(User $user, int $expiry): string
    {
        $payload = [
            'iss' => 'localhost',
            'sub' => $user->getId(),
            'iat' => time(),
            'exp' => time() + $expiry
        ];

        return JWT::encode($payload, $this->jwtSecret, 'HS256');
    }

    public function validateJwt(string $token): array
    {
        return (array) JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
    }

    public function authenticate(string $login, string $password): ?string
    {
        $user = $this->userRepository->findUserByEmailOrUsername($login);

        if ($user && password_verify($password, $user->getPasswordHash())) {
            return $this->generateJwt($user, 3600);
        }

        return null;
    }
}
