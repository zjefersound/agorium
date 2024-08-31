<?php

declare(strict_types=1);

namespace App\Domain;

use App\DTO\PostDTO;
use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity, ORM\Table(name: 'posts')]
class Post
{
    public function __construct(PostDTO $postDTO)
    {
        $this->title = $postDTO->title;
        $this->content = $postDTO->content;
        $this->user = $postDTO->user;
        $this->tags = new ArrayCollection();
        $this->createdAt = new DateTimeImmutable();
    }

    #[ORM\Id, ORM\Column(type: 'integer'), ORM\GeneratedValue(strategy: 'AUTO')]
    private int $id;

    #[ORM\Column(type: 'string', length: 255, nullable: false)]
    private string $title;

    #[ORM\Column(type: 'text', nullable: false)]
    private string $content;

    #[ORM\Column(name: 'created_at', type: 'datetimetz_immutable', nullable: false)]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetimetz_immutable', nullable: true)]
    private ?DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id', nullable: false)]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Category::class, cascade: ['persist'])]
    #[ORM\JoinColumn(name: 'category_id', referencedColumnName: 'id', nullable: false)]
    private Category $category;

    #[ORM\ManyToOne(targetEntity: Comment::class)]
    #[ORM\JoinColumn(name: 'favorite_comment_id', referencedColumnName: 'id', nullable: true)]
    private ?Comment $favoriteComment = null;

    #[ORM\ManyToMany(targetEntity: Tag::class, cascade: ['persist'])]
    #[ORM\JoinTable(
        name: 'post_tags',
        joinColumns: [new ORM\JoinColumn(name: 'post_id', referencedColumnName: 'id')],
        inverseJoinColumns: [new ORM\JoinColumn(name: 'tag_id', referencedColumnName: 'id')]
    )]
    private Collection $tags;

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
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

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getCategory(): Category
    {
        return $this->category;
    }

    public function setCategory(Category $category): self
    {
        $this->category = $category;
        return $this;
    }

    public function getFavoriteComment(): ?Comment
    {
        return $this->favoriteComment;
    }

    public function setFavoriteComment(?Comment $favoriteComment): self
    {
        $this->favoriteComment = $favoriteComment;
        return $this;
    }

    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'content' => $this->getContent(),
            'createdAt' => $this->getCreatedAt()->format(DateTimeImmutable::ATOM),
            'updatedAt' => $this->getUpdatedAt()?->format(DateTimeImmutable::ATOM),
            'user' => $this->getUser()->getId(),
            'category' => $this->getCategory()->getId(),
            'favoriteComment' => $this->getFavoriteComment()?->getId(),
        ];
    }
}
