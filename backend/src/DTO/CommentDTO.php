<?php

namespace App\DTO;

use App\Domain\Comment;
use App\Domain\Post;
use App\Domain\User;
use App\Trait\AutoMapper;
use Symfony\Component\Validator\Constraints as Assert;

class CommentDTO
{
    use AutoMapper;

    public ?int $commentId = 0;

    #[Assert\GreaterThan(0, message: "Post id is invalid.")]
    public int $postId;

    #[Assert\GreaterThan(0, message: "User id is invalid.")]
    public int $userId;

    #[Assert\NotBlank(message: "Content is required.")]
    public ?string $content;

    public ?int $parentCommentId = null;

    public Comment $parentComment;

    public Post $post;

    public User $user;
}
