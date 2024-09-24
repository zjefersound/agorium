<?php

namespace App\Controller;

use App\Service\VoteService;
use App\Service\UserService;
use App\Service\PostService;
use App\Service\CommentService;
use App\Trait\HttpResponse;
use Nyholm\Psr7\Response;
use Nyholm\Psr7\ServerRequest;

class VoteController
{
    use HttpResponse;

    private VoteService $voteService;
    private UserService $userService;
    private PostService $postService;
    private CommentService $commentService;

    public function __construct(
        VoteService $voteService,
        UserService $userService,
        PostService $postService,
        CommentService $commentService
    ) {
        $this->voteService = $voteService;
        $this->userService = $userService;
        $this->postService = $postService;
        $this->commentService = $commentService;
    }

    public function vote(ServerRequest $req): Response
    {
        $data = (array) json_decode($req->getBody()->getContents(), true);

        $voteType = isset($data["voteType"]) ? $data["voteType"] : null;

        $userId = (int) $req->getAttribute("userId");
        $postId = isset($data["postId"]) ? (int) $data["postId"] : null;
        $commentId = isset($data["commentId"]) ? (int) $data["commentId"] : null;

        if (
            !in_array($voteType, ["upvote", "downvote"]) ||
            !$userId ||
            ((!$postId && !$commentId) || ($postId && $commentId))
        ) {
            return $this->unprocessable(["error" => "Invalid data provided."]);
        }

        try {
            $user = $this->userService->getUserById($userId);
            $post = $postId ? $this->postService->getPost($postId) : null;
            $comment = $commentId ? $this->commentService->getComment($commentId) : null;

            $this->voteService->castVote($voteType, $user, $post, $comment);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }

        return $this->created("Vote cast successfully.");
    }

    public function deleteVote($req, $res, $args): Response
    {
        $voteId = (int)$args["id"];

        try {
            $this->voteService->deleteVote($voteId);
            return $this->ok("Vote deleted successfully.");
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }
    }
}
