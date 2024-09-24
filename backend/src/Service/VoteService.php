<?php

namespace App\Service;

use App\Domain\Vote;
use App\Domain\User;
use App\Domain\Post;
use App\Domain\Comment;
use App\Repository\VoteRepository;
use Doctrine\DBAL\Exception\DriverException;
use Exception;

class VoteService
{
    private VoteRepository $voteRepository;

    public function __construct(VoteRepository $voteRepository)
    {
        $this->voteRepository = $voteRepository;
    }

    public function castVote(string $voteType, User $user, ?Post $post = null, ?Comment $comment = null)
    {
        if (!$post && !$comment) {
            throw new Exception("Either post or comment must be provided for voting.");
        }

        $vote = new Vote($voteType, $user, $post, $comment);

        try {
            $this->voteRepository->save($vote);
        } catch (\Throwable $th) {
            throw new Exception("Error casting vote.");
        }
    }

    public function deleteVote(int $voteId)
    {
        try {
            $this->voteRepository->delete($voteId);
        } catch (DriverException $th) {
            throw new Exception("Post could not be deleted!");
        }
    }
}
