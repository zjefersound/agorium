<?php

namespace App\Controller;

use App\DTO\SearchDTO;
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
        $description = $data['description'] ?? null;

        if (empty($categoryName)) {
            return $this->unprocessable(["error" => "Category name is required"]);
        }

        try {
            $this->categoryService->saveCategory($categoryId, $categoryName, $description);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }

        return $this->created("Category saved successfully.");
    }

    public function getCategory($req, $res, $args): Response
    {
        $categoryId = (int)$args['id'];

        try {
            $category = $this->categoryService->getCategory($categoryId);
            return $this->ok($category->jsonSerialize());
        } catch (\Throwable $th) {
            return $this->notFound(["error" => $th->getMessage()]);
        }
    }

    public function searchCategories(ServerRequest $req): Response
    {
        $queryParams = $req->getQueryParams();
        $search = new SearchDTO($queryParams);

        $result = $this->categoryService->searchCategories($search);

        return $this->ok($result);
    }

    public function getTrendingCategories(): Response
    {
        $result = $this->categoryService->getTrendingCategories();
        return $this->ok($result);
    }

    public function deleteCategory($req, $res, $args): Response
    {
        $categoryId = (int)$args['id'];

        try {
            $this->categoryService->deleteCategory($categoryId);
            return $this->ok("Category deleted successfully.");
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }
    }
}
