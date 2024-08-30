<?php

namespace App\Controller;

use App\Service\CategoryService;
use App\Trait\HttpResponse;
use Nyholm\Psr7\Response;
use Nyholm\Psr7\ServerRequest;

class CategoryController
{
    use HttpResponse;

    private CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function saveCategory(ServerRequest $req, Response $res, $args): Response
    {
        $data = (array) json_decode($req->getBody()->getContents(), true);

        $categoryId = $args["id"] ?? 0;
        $categoryName = $data['categoryName'] ?? "";

        if (!isset($categoryName)) {
            return $this->unprocessable(["error" => "Category name is required"]);
        }

        try {
            $this->categoryService->saveCategory($categoryId, $categoryName);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }

        return $this->created("Category saved successfully.");
    }
}
