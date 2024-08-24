<?php

namespace App\DTO;

use App\Trait\AutoMapper;
use Symfony\Component\Validator\Constraints as Assert;

class UserSignupDTO
{
    use AutoMapper;

    #[Assert\NotBlank(message: "Nome não deve ser vazio.")]
    public ?string $fullName;

    #[Assert\NotBlank(message: "Nome de usuario não deve ser vazio.")]
    public ?string $username;

    #[Assert\NotBlank(message: "Email não deve ser vazio.")]
    #[Assert\Email(message: "O email '{{ value }}' é invalido.")]
    public ?string $email;

    #[Assert\NotBlank(message: "Senha não deve ser vazia.")]
    #[Assert\Length(min: 6, minMessage: "Senha deve deve conter no minimo {{ limit }} caracteres.")]
    public ?string $password;
    
    public ?string $avatar;
}