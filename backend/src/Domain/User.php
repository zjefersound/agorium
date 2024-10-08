<?php

declare(strict_types=1);

namespace App\Domain;

use App\DTO\UserSignupDTO;
use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity, ORM\Table(name: 'users')]
class User
{
    public function __construct(UserSignupDTO $userSignupDTO)
    {
        $this->fullName = $userSignupDTO->fullName;
        $this->username = $userSignupDTO->username;
        $this->email = $userSignupDTO->email;
        $this->comments = new ArrayCollection();
        $this->posts = new ArrayCollection();
        $this->passwordHash = password_hash($userSignupDTO->password, PASSWORD_BCRYPT);
        $this->createdAt = new DateTimeImmutable();
        $this->avatar = $userSignupDTO->avatar ?? null;
    }

    #[ORM\Id, ORM\Column(type: 'integer'), ORM\GeneratedValue(strategy: 'AUTO')]
    private int $id;

    #[ORM\Column(type: 'string', length: 255, nullable: false)]
    private string $fullName;

    #[ORM\Column(type: 'string', length: 50, unique: true, nullable: false)]
    private string $username;

    #[ORM\Column(type: 'string', length: 100, unique: true, nullable: false)]
    private string $email;

    #[ORM\Column(type: 'string', length: 40, nullable: true)]
    private ?string $avatar;

    #[ORM\Column(name: 'password_hash', type: 'string', length: 255, nullable: false)]
    private string $passwordHash;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Post::class)]
    private Collection $posts;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Comment::class)]
    private Collection $comments;

    #[ORM\Column(name: 'created_at', type: 'datetimetz_immutable', nullable: false)]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetimetz_immutable', nullable: true)]
    private ?DateTimeImmutable $updatedAt = null;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getFullName(): string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): self
    {
        $this->fullName = $fullName;
        return $this;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(string $avatar): self
    {
        $this->avatar = $avatar;
        return $this;
    }

    public function getPasswordHash(): string
    {
        return $this->passwordHash;
    }

    public function setPasswordHash(string $password): self
    {
        $this->passwordHash = password_hash($password, PASSWORD_BCRYPT);
        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * @return Collection|Post[]
     */
    public function getPosts(): Collection
    {
        return $this->posts;
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

    public function jsonSerialize(): array
    {
        $response = [
            'id' => $this->getId(),
            'fullName' => $this->fullName,
            'username' => $this->username,
            'email' => $this->email,
            'createdAt' => $this->createdAt->format(DateTimeImmutable::ATOM),
            'updatedAt' => $this->updatedAt?->format(DateTimeImmutable::ATOM),
        ];

        if ($this->getAvatar()) {
            $response["avatar"] = "/user/avatar/" . $this->getId() . "/" . $this->getAvatar();
        }

        return $response;
    }
    public function jsonSerializePublic(): array
    {
        $response = [
            'id' => $this->getId(),
            'fullName' => $this->fullName,
            'username' => $this->username,
        ];

        if ($this->getAvatar()) {
            $response["avatar"] = "/user/avatar/" . $this->getId() . "/" . $this->getAvatar();
        }

        return $response;
    }
}
