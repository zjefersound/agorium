<?php

namespace App\Controller;

use App\DTO\CommentDTO;
use App\Helper\ErrorMapper;
use App\Service\CommentService;
use App\Service\UserService;
use App\Trait\HttpResponse;
use Nyholm\Psr7\Response;
use Nyholm\Psr7\ServerRequest;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CommentController
{
    use HttpResponse;

    private CommentService $commentService;
    private UserService $userService;
    private ValidatorInterface $validator;

    public function __construct(CommentService $commentService, UserService $userService, ValidatorInterface $validator)
    {
        $this->commentService = $commentService;
        $this->userService = $userService;
        $this->validator = $validator;
    }

    public function saveComment(ServerRequest $req, Response $res, $args): Response
    {
        $data = (array) json_decode($req->getBody()->getContents(), true);

        $commentDTO = new CommentDTO($data);
        $commentDTO->postId = isset($args['postId']) ? (int)$args['postId'] : 0;
        $commentDTO->commentId = isset($args['commentId']) ? (int)$args['commentId'] : 0;

        $errors = $this->validator->validate($commentDTO);
        if (count($errors) > 0) {
            return $this->unprocessable(["error" => ErrorMapper::GetDTOErrorMessages($errors)]);
        }

        $userId = (int) $req->getAttribute("userId");
        $commentDTO->user = $this->userService->getUserById($userId);

        try {
            $this->commentService->saveComment($commentDTO);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }

        return $this->created("Comment saved successfully.");
    }

    public function getPostComments(ServerRequest $req, Response $res, $args): Response
    {
        $postId = isset($args['postId']) ? (int)$args['postId'] : 0;
        $commentId = isset($args['commentId']) ? (int)$args['commentId'] : 0;

        $userId = (int) $req->getAttribute("userId") ?? 0;

        try {
            $comments = $this->commentService->getPostComments($postId, $userId, $commentId);
            return $this->ok($comments);
        } catch (\Throwable $th) {
            return $this->notFound(["error" => $th->getMessage()]);
        }
    }

    public function deleteComment($req, $res, $args): Response
    {
        $commentId = isset($args['commentId']) ? (int)$args['commentId'] : 0;

        try {
            $this->commentService->deleteComment($commentId);
            return $this->ok("Comment deleted successfully.");
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }
    }
}
