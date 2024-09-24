<?php

declare(strict_types=1);

namespace App\Domain;

use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;

#[ORM\Entity, ORM\Table(name: 'votes')]
class Vote
{
    public function __construct(string $voteType, User $user, ?Post $post = null, ?Comment $comment = null)
    {
        $this->voteType = $voteType;
        $this->user = $user;
        $this->post = $post;
        $this->comment = $comment;
        $this->createdAt = new DateTimeImmutable();
    }

    #[ORM\Id, ORM\Column(type: 'integer'), ORM\GeneratedValue(strategy: 'AUTO')]
    private int $id;

    #[ORM\Column(type: 'string', length: 10, nullable: false)]
    private string $voteType;

    #[ORM\Column(name: 'created_at', type: 'datetimetz_immutable', nullable: false)]
    private DateTimeImmutable $createdAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id', nullable: false)]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Post::class)]
    #[ORM\JoinColumn(name: 'post_id', referencedColumnName: 'id', nullable: true)]
    private ?Post $post = null;

    #[ORM\ManyToOne(targetEntity: Comment::class)]
    #[ORM\JoinColumn(name: 'comment_id', referencedColumnName: 'id', nullable: true)]
    private ?Comment $comment = null;

    public function getId(): int
    {
        return $this->id;
    }

    public function getVoteType(): string
    {
        return $this->voteType;
    }

    public function setVoteType(string $voteType): self
    {
        $this->voteType = $voteType;
        return $this;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): self
    {
        $this->post = $post;
        return $this;
    }

    public function getComment(): ?Comment
    {
        return $this->comment;
    }

    public function setComment(?Comment $comment): self
    {
        $this->comment = $comment;
        return $this;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'voteType' => $this->getVoteType(),
            'createdAt' => $this->getCreatedAt()->format(DateTimeImmutable::ATOM),
            'postId' => $this->getPost() ? $this->getPost()->getId() : null,
            'commentId' => $this->getComment() ? $this->getComment()->getId() : null,
        ];
    }
}
