<?php

namespace App\DTO;

use App\Trait\AutoMapper;

class PostSearchDTO extends SearchDTO
{
    use AutoMapper;

    public ?int $categoryId;

    public ?int $tagId;

    public int $userId;
}
