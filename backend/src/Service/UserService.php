<?php

namespace App\Service;

use App\Repository\UserRepository;
use App\Domain\User;
use App\DTO\UserSignupDTO;
use App\DTO\UserInfoUpdateDTO;
use App\DTO\UserPasswordUpdateDTO;
use App\Helper\UploadHelper;
use App\Repository\CommentRepository;
use App\Repository\PostRepository;
use App\Repository\VoteRepository;
use Exception;
use Nyholm\Psr7\UploadedFile;

class UserService
{
    private CommentRepository $commentRepository;
    private PostRepository $postRepository;
    private UserRepository $userRepository;
    private VoteRepository $voteRepository;
    private MailerService $mailerService;

    public function __construct(
        CommentRepository $commentRepository,
        PostRepository $postRepository,
        UserRepository $userRepository,
        VoteRepository $voteRepository,
        MailerService $mailerService
    ) {
        $this->userRepository = $userRepository;
        $this->voteRepository = $voteRepository;
        $this->postRepository = $postRepository;
        $this->commentRepository = $commentRepository;
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

        if (isset($uploadedAvatar)) {
            $avatarGuid = UploadHelper::uploadUserAvatar($uploadedAvatar);
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

    public function updateUserAvatar(int $userId, ?UploadedFile $uploadedAvatar = null): User
    {
        $user = $this->userRepository->find($userId);

        if (isset($uploadedAvatar)) {
            $avatarGuid = UploadHelper::uploadUserAvatar($uploadedAvatar);
            $user->setAvatar($avatarGuid);
        }

        $user->setUpdatedAt(new \DateTimeImmutable());

        try {
            $this->userRepository->save($user);
        } catch (\Throwable $th) {
            throw new Exception("Error updating user avatar!");
        }

        return $user;
    }

    public function updateUserPassword(int $userId, UserPasswordUpdateDTO $userPasswordUpdateDTO): User
    {
        $user = $this->userRepository->find($userId);

        if ($user && password_verify($userPasswordUpdateDTO->currentPassword, $user->getPasswordHash())) {
            $user->setPasswordHash($userPasswordUpdateDTO->password);
            $user->setUpdatedAt(new \DateTimeImmutable());
        } else {
            throw new Exception("Password is incorrect.");
        }

        try {
            $this->userRepository->save($user);
        } catch (\Throwable $th) {
            throw new Exception("Error updating user avatar!");
        }

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

    public function getRankedUsers(int $page = 1, int $limit = 10): array
    {
        $page = max($page, 1);
        $limit = max($limit, 1);

        try {
            return $this->userRepository->getRankedUsers($page, $limit);
        } catch (\Throwable $th) {
            throw new \Exception("An error occurred while fetching ranked users.");
        }
    }


    public function getUserOverview(int $userId): array
    {
        $user = $this->userRepository->find($userId);

        if (!$user) {
            throw new Exception("User not found.");
        }

        try {
            $totalPosts = $this->postRepository->getUserTotalPosts($userId);
            $totalComments = $this->commentRepository->getUserTotalComments($userId);
            $totalUpvotes = $this->voteRepository->getUserTotalUpvotes($userId);
        } catch (\Throwable $th) {
            throw new \Exception("An error occurred while fetching posts, comments and upvotes for user.");
        }

        $rankedUsers = $this->userRepository->getRankedUsers(1, 100);

        $position = 101; // Default value for those who are out of the top 100
        foreach ($rankedUsers['data'] as $rankedUser) {
            if ($rankedUser['userId'] === $userId) {
                $position = $rankedUser['position'];
                break;
            }
        }

        return [
            'user' => $user->jsonSerializePublic(),
            'rankingPosition' => $position,
            'totalPosts' => $totalPosts,
            'totalComments' => $totalComments,
            'totalUpvotes' => $totalUpvotes,
        ];
    }
}
