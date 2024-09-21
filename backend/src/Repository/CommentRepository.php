<?php

namespace App\Repository;

use App\Domain\Comment;
use Doctrine\ORM\EntityManagerInterface;

class CommentRepository
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function find(int $id)
    {
        return $this->em->getRepository(Comment::class)->find($id);
    }

    public function getPostComments(int $postId, ?int $commentId = null): array
    {
        $conn = $this->em->getConnection();

        $commentCondition = $commentId ? 'AND c.id = :commentId' : 'AND c.parent_comment_id IS NULL';

        $sql = <<<SQL
            WITH RECURSIVE comment_tree AS (
                SELECT 
                    c.id, 
                    c.content, 
                    c.created_at, 
                    c.updated_at, 
                    c.post_id, 
                    c.user_id AS comment_user_id,
                    c.parent_comment_id,
                    u.id AS user_id, 
                    u.fullName, 
                    u.username, 
                    u.avatar,
                    0 AS depth
                FROM comments c
                JOIN users u ON c.user_id = u.id
                WHERE c.post_id = :postId $commentCondition
        
                UNION ALL
        
                SELECT 
                    child.id, 
                    child.content, 
                    child.created_at, 
                    child.updated_at, 
                    child.post_id, 
                    child.user_id AS comment_user_id,
                    child.parent_comment_id,
                    u.id AS user_id, 
                    u.fullName, 
                    u.username, 
                    u.avatar,
                    parent.depth + 1 AS depth
                FROM comments child
                JOIN users u ON child.user_id = u.id
                INNER JOIN comment_tree parent ON parent.id = child.parent_comment_id
            )
            SELECT * FROM comment_tree
            ORDER BY depth, created_at ASC;
        SQL;

        $stmt = $conn->prepare($sql);
        $stmt->bindValue("postId", $postId);

        if ($commentId) {
            $stmt->bindValue("commentId", $commentId);
        }

        $resultSet = $stmt->executeQuery()->fetchAllAssociative();

        if ($commentId && empty($resultSet)) {
            throw new \Exception("Comment not found");
        }

        $comments = $this->buildHierarchy($resultSet);

        return $commentId ? ($comments[0] ?? []) : $comments;
    }

    public function save(Comment $comment)
    {
        $this->em->persist($comment);
        $this->em->flush();
    }

    public function update(Comment $comment)
    {
        $comment->setUpdatedAt(new \DateTimeImmutable());
        $this->em->flush();
    }

    public function delete(Comment $comment)
    {
        $this->em->remove($comment);
        $this->em->flush();
    }

    private function buildHierarchy(array $comments): array
    {
        $commentsById = [];
        $rootComments = [];

        foreach ($comments as $comment) {
            $user = [
                'id' => $comment['user_id'],
                'fullName' => $comment['fullName'],
                'username' => $comment['username'],
                'avatar' => $comment['avatar'] ? "/user/avatar/" . $comment['user_id'] . "/" . $comment['avatar'] : null,
            ];

            $commentsById[$comment['id']] = [
                'id' => $comment['id'],
                'content' => $comment['content'],
                'createdAt' => $comment['created_at'],
                'updatedAt' => $comment['updated_at'],
                'user' => $user,
                'children' => [],
                'totalUpvotes' => 0,
            ];
        }

        foreach ($comments as $comment) {
            if ($comment['parent_comment_id'] && isset($commentsById[$comment['parent_comment_id']])) {
                // Add this comment to its parent's 'children' array
                $commentsById[$comment['parent_comment_id']]['children'][] = &$commentsById[$comment['id']];
            } else {
                // If no parent, it's a root comment
                $rootComments[] = &$commentsById[$comment['id']];
            }
        }

        return $rootComments;
    }
}
