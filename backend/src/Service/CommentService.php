<?php

namespace App\Service;

use App\Domain\Comment;
use App\DTO\CommentDTO;
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
        $post = $this->postRepository->find($commentDTO->postId);
        if (!$post) {
            throw new Exception("Post not found.");
        }

        /** @var \App\Domain\User $user */
        $user = $this->userRepository->find($commentDTO->user->getId());
        if (!$user) {
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
                $user,
                $parentComment
            );
        }

        if ($comment->getUser()->getId() != $user->getId()) {
            throw new Exception("This comment belongs to another user.");
        }

        $this->commentRepository->save($comment);
    }

    public function getPostComments(int $postId, ?int $commentId = null): array
    {
        $comments = $this->commentRepository->getPostComments($postId, $commentId);
        if (!$comments) {
            throw new Exception("No comments found for this post.");
        }

        return $comments;
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
