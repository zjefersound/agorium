<?php

namespace App\DTO;

use App\Trait\AutoMapper;
use Symfony\Component\Validator\Constraints as Assert;

class UserSignupDTO
{
    use AutoMapper;

    #[Assert\NotBlank(message: "Full name is required.")]
    public ?string $fullName;

    #[Assert\NotBlank(message: "Username is required.")]
    public ?string $username;

    #[Assert\NotBlank(message: "Email is required.")]
    #[Assert\Email(message: "The email '{{ value }}' is invalid.")]
    public ?string $email;

    #[Assert\NotBlank(message: "Password is required.")]
    #[Assert\Length(min: 6, minMessage: "The password must contain at least {{ limit }} characters.")]
    public ?string $password;
    
    public ?string $avatar;
}