<?php

namespace App\DTO;

use App\Trait\AutoMapper;
use Symfony\Component\Validator\Constraints as Assert;

class UserPasswordUpdateDTO
{
  use AutoMapper;

  #[Assert\NotBlank(message: "Current password is required.")]
  public ?string $currentPassword;

  #[Assert\NotBlank(message: "Password is required.")]
  #[Assert\Length(min: 6, minMessage: "The password must contain at least {{ limit }} characters.")]
  public ?string $password;
}
