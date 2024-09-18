<?php

namespace App\Controller;

use App\Service\TagService;
use App\Trait\HttpResponse;
use Nyholm\Psr7\Response;
use Nyholm\Psr7\ServerRequest;

class TagController
{
    use HttpResponse;

    private TagService $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    public function searchTags(ServerRequest $req): Response
    {
        $queryParams = $req->getQueryParams();
        $search = $queryParams['search'] ?? '';

        $result = $this->tagService->searchTags($search);

        return $this->ok($result);
    }
}
