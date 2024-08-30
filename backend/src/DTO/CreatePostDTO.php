<?php

namespace App\DTO;

use App\Domain\Category;
use App\Domain\User;
use App\Trait\AutoMapper;
use Symfony\Component\Validator\Constraints as Assert;

class CreatePostDTO
{
    use AutoMapper;

    #[Assert\NotBlank(message: "Title is required.")]
    public ?string $title;

    #[Assert\NotBlank(message: "Content is required.")]
    public ?string $content;

    #[Assert\NotBlank(message: "Category is required.")]
    public ?int $categoryId;

    public Category $category;

    public User $user;

    public array $tags;
}
