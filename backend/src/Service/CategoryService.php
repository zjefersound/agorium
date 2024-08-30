<?php

namespace App\Service;

use App\Domain\Category;
use App\Repository\CategoryRepository;
use Exception;

class CategoryService
{
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function saveCategory(int $categoryId, string $categoryName)
    {
        if (!isset($categoryName)) throw new Exception("Category name is required.");

        $category = new Category();

        if ($categoryId > 0) {
            $category = $this->categoryRepository->find($categoryId);
        }

        $category->setName($categoryName);

        return $this->categoryRepository->save($category);
    }
}
