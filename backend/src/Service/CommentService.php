<?php

namespace App\Service;

use App\Domain\Comment;
use App\DTO\CommentDTO;
use App\Helper\QueueHelper;
use App\Repository\CommentRepository;
use App\Repository\PostRepository;
use App\Repository\UserRepository;
use App\Trait\HttpResponse;
use Doctrine\DBAL\Exception\DriverException;
use Exception;

class CommentService
{
    use HttpResponse;

    private CommentRepository $commentRepository;
    private PostRepository $postRepository;
    private UserRepository $userRepository;

    public function __construct(
        CommentRepository $commentRepository,
        PostRepository $postRepository,
        UserRepository $userRepository
    ) {
        $this->commentRepository = $commentRepository;
        $this->postRepository = $postRepository;
        $this->userRepository = $userRepository;
    }

    public function saveComment(CommentDTO $commentDTO)
    {
        /** @var \App\Domain\Post $post */
        $post = $this->postRepository->find($commentDTO->postId);
        if (!$post) {
            throw new Exception("Post not found.");
        }

        $commentDTO->post = $post;

        /** @var \App\Domain\User $requestUser */
        $requestUser = $this->userRepository->find($commentDTO->userId);
        if (!$requestUser) {
            throw new Exception("User not found.");
        }

        $parentComment = $commentDTO->parentCommentId ? $this->commentRepository->find($commentDTO->parentCommentId) : null;

        /** @var Comment $comment */
        $comment = null;

        if ($commentDTO->commentId) {
            $comment = $this->commentRepository->find($commentDTO->commentId);
            if (!$comment) {
                throw new Exception("Comment not found.");
            }

            $comment->setContent($commentDTO->content);
        } else {
            $comment = new Comment(
                $commentDTO->content,
                $post,
                $requestUser,
                $parentComment
            );
        }

        if ($comment->getUser()->getId() != $requestUser->getId()) {
            throw new Exception("This comment belongs to another user.");
        }

        $postUser = $post->getUser();
        if ($postUser->getId() != $requestUser->getId()) {
            QueueHelper::queueUserCommentedEmail($commentDTO);
        }

        return 0;
        $this->commentRepository->save($comment);
    }

    public function getComment(int $commentId): Comment
    {
        $comment = $this->commentRepository->find($commentId);

        if (!$comment) {
            throw new Exception("Comment not found.");
        }

        return $comment;
    }

    public function getPostComments(int $postId, int $userId, ?int $commentId = null): array
    {
        $comments = $this->commentRepository->getPostComments($postId, $userId, $commentId);

        return $comments ?? [];
    }

    public function deleteComment(int $commentId)
    {
        $comment = $this->commentRepository->find($commentId);

        if (!$comment) {
            throw new Exception("Comment not found.");
        }

        try {
            $this->commentRepository->delete($comment);
        } catch (DriverException $th) {
            throw new Exception("Comment could not be deleted!");
        }
    }
}
