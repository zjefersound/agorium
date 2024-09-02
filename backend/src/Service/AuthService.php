<?php

namespace App\Service;

use App\Repository\UserRepository;
use App\Domain\User;
use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Throwable;

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

    public function validateJwt(?string $token): array
    {
        if (!$token) {
            throw new Exception('Auth token not provided.');
        }

        try {
            return (array) JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
        } catch (ExpiredException $e) {
            throw new Exception('Token has expired. Please log in again.');
        } catch (Throwable $e) {
            throw new Exception('Invalid token.');
        }
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
