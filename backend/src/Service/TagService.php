<?php

namespace App\Service;

use App\DTO\SearchDTO;
use App\Repository\TagRepository;
use Exception;

class TagService
{
    private TagRepository $tagRepository;

    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    public function searchTags(SearchDTO $search): array
    {
        $search->term ??= "";
        $search->page ??= 1;
        $search->limit ??= 10;
        $search->sortBy ??= 'name';
        $search->sortOrder = strtolower($search->sortOrder ?? 'asc') === 'desc' ? 'desc' : 'asc';

        try {
            return $this->tagRepository->search($search);
        } catch (\Throwable $th) {
            throw new Exception("An error occured while searching for categories.");
        }
    }
}
