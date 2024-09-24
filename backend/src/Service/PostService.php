<?php

declare(strict_types=1);

namespace App\Service;

use App\Domain\Post;
use App\DTO\PostDTO;
use App\DTO\PostSearchDTO;
use App\Repository\CategoryRepository;
use App\Repository\PostRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Exception\DriverException;
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

    public function savePost(PostDTO $postDTO)
    {
        if ($postDTO->id > 0) {
            /** @var Post $post */
            $post = $this->postRepository->find($postDTO->id);

            $post->setTitle($postDTO->title);
            $post->setContent($postDTO->content);
            $post->setUpdatedAt(new DateTimeImmutable());
        } else {
            $post = new Post($postDTO);
        }

        $category = $this->categoryRepository->find($postDTO->categoryId);
        if (!$category) {
            throw new Exception("Category does not exist!");
        }

        $post->setCategory($category);

        try {
            $this->postRepository->save($post, $postDTO->tags);
        } catch (\Throwable $th) {
            throw new Exception("Error adding user!");
        }
    }

    public function getPost(int $postId): Post
    {
        $post = $this->postRepository->find($postId);

        if (!$post) {
            throw new Exception("Post not found.");
        }

        return $post;
    }

    public function getDetailedPost(int $postId, int $userId)
    {
        $post = $this->postRepository->findDetailed($postId, $userId);

        if (!$post) {
            throw new Exception("Post not found.");
        }

        return $post;
    }

    public function updateFavoriteComment(int $postId, int $favoriteCommentId, int $userId): void
    {
        $post = $this->postRepository->find($postId);

        if (!$post) {
            throw new Exception("Post not found.");
        }

        if ($post->getUser()->getId() !== $userId) {
            throw new Exception("User not authorized to update this post.");
        }

        $comment = $post->getComments()->filter(function ($comment) use ($favoriteCommentId) {
            return $comment->getId() === $favoriteCommentId;
        })->first();

        if (!$comment) {
            throw new Exception("Comment not found or not associated with this post.");
        }

        if ($post->getFavoriteComment() && $post->getFavoriteComment()->getId() === $favoriteCommentId) {
            // If the input comment is the same as the current favorite, remove it (toggle off)
            $post->setFavoriteComment(null);
        } else {
            $post->setFavoriteComment($comment);
        }
        $post->setUpdatedAt(new DateTimeImmutable());

        try {
            $this->postRepository->save($post);
        } catch (\Throwable $th) {
            throw new Exception("Error updating favorite comment.");
        }
    }

    public function searchPosts(PostSearchDTO $search, int $loggedUserId): array
    {
        $search->term ??= "";
        $search->page ??= 1;
        $search->limit ??= 10;
        $search->sortBy ??= "title";
        $search->sortOrder = strtolower($search->sortOrder ?? 'asc') === 'desc' ? 'desc' : 'asc';

        try {
            return $this->postRepository->search($search, $loggedUserId);
        } catch (\Throwable $th) {
            throw new Exception("An error occured while searching for posts.");
        }
    }

    public function deletePost(int $postId)
    {
        $post = $this->postRepository->find($postId);

        if (!$post) {
            throw new Exception("Post not found.");
        }

        try {
            $this->postRepository->delete($post);
        } catch (DriverException $th) {
            throw new Exception("Post could not be deleted!");
        }
    }
}
