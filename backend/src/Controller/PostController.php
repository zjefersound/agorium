<?php

namespace App\Controller;

use App\DTO\PostDTO;
use App\DTO\PostSearchDTO;
use App\Helper\ErrorMapper;
use App\Service\PostService;
use App\Service\UserService;
use App\Trait\HttpResponse;
use Nyholm\Psr7\Response;
use Nyholm\Psr7\ServerRequest;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PostController
{
    use HttpResponse;

    private PostService $postService;
    private UserService $userService;
    private ValidatorInterface $validator;

    public function __construct(PostService $postService, UserService $userService, ValidatorInterface $validator)
    {
        $this->postService = $postService;
        $this->userService = $userService;
        $this->validator = $validator;
    }

    public function savePost(ServerRequest $req, Response $res, $args): Response
    {
        $data = (array) json_decode($req->getBody()->getContents(), true);

        $postDTO = new PostDTO($data);
        $errors = $this->validator->validate($postDTO);

        if (count($errors) > 0) {
            return $this->unprocessable(["error" => ErrorMapper::GetDTOErrorMessages($errors)]);
        }

        $postId = isset($args['id']) ? (int)$args['id'] : 0;

        if ($postId > 0) {
            $postDTO->id = $postId;
        } else {
            $userId = (int) $req->getAttribute("userId");
            $postDTO->user = $this->userService->getUserById($userId);
        }

        try {
            $this->postService->savePost($postDTO);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }

        return $this->created("Post saved successfully.");
    }

    public function getPost($req, $res, $args): Response
    {
        $postId = (int)$args['id'];

        try {
            $post = $this->postService->getPost($postId);
            return $this->ok($post->jsonSerialize());
        } catch (\Throwable $th) {
            return $this->notFound(["error" => $th->getMessage()]);
        }
    }

    public function searchPosts(ServerRequest $req): Response
    {
        $queryParams = $req->getQueryParams();
        try {
            $search = new PostSearchDTO($queryParams);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => "Invalid query parameters"]);
        }

        $result = $this->postService->searchPosts($search);

        return $this->ok($result);
    }

    public function deletePost($req, $res, $args): Response
    {
        $postId = (int)$args['id'];

        try {
            $this->postService->deletePost($postId);
            return $this->ok("Post deleted successfully.");
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }
    }

    public function updateFavoriteComment($req, $res, $args): Response
    {
        $postId = (int)$args['id'];
        $userId = (int) $req->getAttribute("userId");
        $data = (array) json_decode($req->getBody()->getContents(), true);

        if (!isset($data['favoriteCommentId'])) {
            return $this->unprocessable(["error" => "favoriteCommentId is required"]);
        }

        $favoriteCommentId = (int) $data['favoriteCommentId'];

        try {
            $this->postService->updateFavoriteComment($postId, $favoriteCommentId, $userId);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }

        return $this->ok("Favorite comment updated successfully.");
    }
}
