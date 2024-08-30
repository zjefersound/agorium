<?php

namespace App\Service;

use App\Domain\Post;
use App\DTO\CreatePostDTO;
use App\Repository\CategoryRepository;
use App\Repository\PostRepository;
use Exception;

class PostService
{
    private PostRepository $postRepository;
    private CategoryRepository $categoryRepository;

    public function __construct(PostRepository $postRepository, CategoryRepository $categoryRepository)
    {
        $this->postRepository = $postRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function createPost(CreatePostDTO $createPostDTO)
    {
        $category = $this->categoryRepository->find($createPostDTO->categoryId);
        if (!$category) {
            throw new Exception("Category does not exist!");
        }

        $post = new Post($createPostDTO);

        try {
            $this->postRepository->createOrUpdatePost($post, $createPostDTO->tags);
        } catch (\Throwable $th) {
            throw new Exception("Error adding user!");
        }

        $this->postRepository->createOrUpdatePost($post, $createPostDTO->tags);
    }
}
