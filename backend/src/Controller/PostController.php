<?php

namespace App\Controller;

use App\DTO\CreatePostDTO;
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

    public function createPost(ServerRequest $req, Response $res): Response
    {
        $data = (array) json_decode($req->getBody()->getContents(), true);

        $createPostDTO = new CreatePostDTO($data);
        $errors = $this->validator->validate($createPostDTO);

        if (count($errors) > 0) {
            return $this->unprocessable(["error" => ErrorMapper::GetDTOErrorMessages($errors)]);
        }

        $jwt = (array) $req->getAttribute("jwt");
        $createPostDTO->user = $this->userService->getUserById($jwt["sub"]);

        try {
            $this->postService->createPost($createPostDTO);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }

        return $this->created("Post created successfully.");
    }
}
