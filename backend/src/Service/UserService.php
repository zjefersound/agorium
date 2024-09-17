<?php

namespace App\Service;

use App\Repository\UserRepository;
use App\Domain\User;
use App\DTO\UserSignupDTO;
use App\DTO\UserInfoUpdateDTO;
use Exception;
use Nyholm\Psr7\UploadedFile;

class UserService
{
    private UserRepository $userRepository;
    private MailerService $mailerService;

    public function __construct(UserRepository $userRepository, MailerService $mailerService)
    {
        $this->userRepository = $userRepository;
        $this->mailerService = $mailerService;
    }

    public function createUser(UserSignupDTO $userSignupDTO, ?UploadedFile $uploadedAvatar = null): User
    {
        if ($this->userRepository->isEmailTaken($userSignupDTO->email)) {
            throw new Exception("Email is already taken!");
        }

        if ($this->userRepository->isUsernameTaken($userSignupDTO->username)) {
            throw new Exception("Username is already taken!");
        }

        $avatarStream = isset($uploadedAvatar) ? $uploadedAvatar->getStream() : null;

        if ($avatarStream && $avatarStream->getSize() != null && $avatarStream->getSize() > 0) {
            $fileType = explode(', ', $uploadedAvatar->getClientMediaType());
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (!array_intersect($fileType, $allowedTypes)) {
                throw new Exception('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            }

            $avatarGuid = $this->generateGuid() . '.' . pathinfo($uploadedAvatar->getClientFilename(), PATHINFO_EXTENSION);

            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
            $uploadedAvatar->moveTo($uploadDir . $avatarGuid);

            $userSignupDTO->avatar = $avatarGuid;
        }

        $user = new User($userSignupDTO);

        try {
            $this->userRepository->add($user);
        } catch (\Throwable $th) {
            throw new Exception("Error adding user!");
        }

        $this->mailerService->sendWelcomeEmail($user->getEmail(), $user->getFullName());

        return $user;
    }

    public function updateUserInfo(int $userId, UserInfoUpdateDTO $userInfoUpdateDTO): User
    {
        $user = $this->userRepository->find($userId);

        if (!$user) {
            throw new Exception("User not found.");
        }

        if ($userInfoUpdateDTO->email !== $user->getEmail() && $this->userRepository->isEmailTaken($userInfoUpdateDTO->email)) {
            throw new Exception("Email is already taken!");
        }

        if ($userInfoUpdateDTO->username !== $user->getUsername() && $this->userRepository->isUsernameTaken($userInfoUpdateDTO->username)) {
            throw new Exception("Username is already taken!");
        }

        $user->setFullName($userInfoUpdateDTO->fullName);
        $user->setUsername($userInfoUpdateDTO->username);
        $user->setEmail($userInfoUpdateDTO->email);
        $user->setUpdatedAt(new \DateTimeImmutable());

        try {
            $this->userRepository->save($user);
        } catch (\Throwable $th) {
            throw new Exception("Error updating user!");
        }

        return $user;
    }

    public function getUserById(int $id): ?User
    {
        return $this->userRepository->find($id);
    }

    private function generateGuid(): string
    {
        return bin2hex(random_bytes(16));
    }
}
