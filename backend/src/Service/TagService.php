<?php

namespace App\Service;

use App\Repository\TagRepository;
use Exception;

class TagService
{
    private TagRepository $tagRepository;

    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    public function searchTags(string $searchTerm): array
    {
        try {
            return $this->tagRepository->search($searchTerm);
        } catch (\Throwable $th) {
            throw new Exception("An error occurred while searching for tags.");
        }
    }
}
