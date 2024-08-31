<?php

namespace App\Service;

use App\Domain\Category;
use App\DTO\SearchDTO;
use App\Repository\CategoryRepository;
use Doctrine\DBAL\Exception\DriverException;
use Exception;

class CategoryService
{
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function saveCategory(int $categoryId, string $categoryName, ?string $description = null)
    {
        if (empty($categoryName)) {
            throw new Exception("Category name is required.");
        }

        $category = new Category();

        if ($categoryId > 0) {
            $category = $this->categoryRepository->find($categoryId);

            if (!$category) {
                throw new Exception("Category not found.");
            }
        }

        $category->setName($categoryName);
        $category->setDescription($description);

        return $this->categoryRepository->save($category);
    }

    public function getCategory(int $categoryId): Category
    {
        $category = $this->categoryRepository->find($categoryId);

        if (!$category) {
            throw new Exception("Category not found.");
        }

        return $category;
    }

    public function searchCategories(SearchDTO $search): array
    {
        $search->term ??= "";
        $search->page ??= 1;
        $search->limit ??= 10;
        $search->sortBy ??= 'name';
        $search->sortOrder = strtolower($search->sortOrder ?? 'asc') === 'desc' ? 'desc' : 'asc';

        try {
            return $this->categoryRepository->search($search);
        } catch (\Throwable $th) {
            throw new Exception("An error occured while searching for categories.");
        }
    }

    public function deleteCategory(int $categoryId)
    {
        $category = $this->categoryRepository->find($categoryId);

        if (!$category) {
            throw new Exception("Category not found.");
        }

        try {
            $this->categoryRepository->delete($category);
        } catch (DriverException $th) {
            throw new Exception("Category could not be deleted!");
        }
    }
}
