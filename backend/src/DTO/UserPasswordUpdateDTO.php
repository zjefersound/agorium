<?php

namespace App\DTO;

use App\Trait\AutoMapper;
use Symfony\Component\Validator\Constraints as Assert;

class UserPasswordUpdateDTO
{
  use AutoMapper;

  #[Assert\NotBlank(message: "Password is required.")]
  public ?string $password;

  #[Assert\NotBlank(message: "New password is required.")]
  #[Assert\Length(min: 6, minMessage: "The new password must contain at least {{ limit }} characters.")]
  public ?string $newPassword;
}
