<?php

namespace App\DTO;

use App\Trait\AutoMapper;
use Symfony\Component\Validator\Constraints as Assert;

class UserUpdateDTO
{
	use AutoMapper;

	#[Assert\NotBlank(message: "Full name is required.")]
	#[Assert\Length(min: 3, minMessage: "Full name must contain at least {{ limit }} characters")]
	#[Assert\Length(max: 255, minMessage: "Full name must contain at most {{ limit }} characters")]
	#[Assert\Regex(
		pattern: "/^\p{L}+( \p{L}+)+$/u",
		htmlPattern: "^\p{L}+( \p{L}+)+$",
		message: "Full name must contain at least two words with only letters"
	)]
	public ?string $fullName;

	#[Assert\NotBlank(message: "Username is required.")]
	#[Assert\Length(min: 3, minMessage: "Username must contain at least {{ limit }} characters")]
	#[Assert\Length(max: 50, minMessage: "Username must contain at most {{ limit }} characters")]
	#[Assert\Regex(
		pattern: "/^[a-z0-9]+$/i",
		htmlPattern: "^[a-zA-Z0-9]+$",
		message: "Username must contain only letter or numbers"
	)]
	public ?string $username;

	#[Assert\NotBlank(message: "Email is required.")]
	#[Assert\Email(message: "The email '{{ value }}' is invalid.")]
	public ?string $email;
}
