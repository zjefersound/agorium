<?php

declare(strict_types=1);

namespace App\Domain;

use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity, ORM\Table(name: 'comments')]
class Comment
{
    public function __construct(string $content, Post $post, User $user, ?Comment $parentComment = null)
    {
        $this->content = $content;
        $this->post = $post;
        $this->user = $user;
        $this->parentComment = $parentComment;
        $this->createdAt = new DateTimeImmutable();
        $this->votes = new ArrayCollection();
    }

    #[ORM\Id, ORM\Column(type: 'integer'), ORM\GeneratedValue(strategy: 'AUTO')]
    private int $id;

    #[ORM\Column(type: 'text', nullable: false)]
    private string $content;

    #[ORM\Column(name: 'created_at', type: 'datetimetz_immutable', nullable: false)]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetimetz_immutable', nullable: true)]
    private ?DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(targetEntity: Post::class)]
    #[ORM\JoinColumn(name: 'post_id', referencedColumnName: 'id', nullable: false)]
    private Post $post;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id', nullable: false)]
    private User $user;

    #[ORM\OneToMany(mappedBy: 'comment', targetEntity: Vote::class, cascade: ['persist', 'remove'])]
    private Collection $votes;

    #[ORM\ManyToOne(targetEntity: self::class)]
    #[ORM\JoinColumn(name: 'parent_comment_id', referencedColumnName: 'id', nullable: true)]
    private ?Comment $parentComment = null;

    public function getId(): int
    {
        return $this->id;
    }

    public function getVotes(): Collection
    {
        return $this->votes;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;
        return $this;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function getPost(): Post
    {
        return $this->post;
    }

    public function setPost(Post $post): self
    {
        $this->post = $post;
        return $this;
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

    public function getParentComment(): ?Comment
    {
        return $this->parentComment;
    }

    public function setParentComment(?Comment $parentComment): self
    {
        $this->parentComment = $parentComment;
        return $this;
    }
}
