<?php

namespace App\DTO;

use App\Trait\AutoMapper;

class SearchDTO
{
    use AutoMapper;

    public ?string $term;

    public ?int $page;

    public ?int $limit;

    public ?string $sortBy;

    public ?string $sortOrder;
}
