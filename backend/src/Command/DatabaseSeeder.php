<?php

namespace App\Command;

use App\Domain\Category;
use Doctrine\ORM\EntityManagerInterface;

class DatabaseSeeder
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function run(): void
    {
        $this->seedCategories();
    }

    private function seedCategories(): void
    {
        $categories = [
            ['name' => 'Issue', 'description' => 'A category for reporting problems, bugs, and challenges.'],
            ['name' => 'Discussion', 'description' => 'Engage in conversations and share thoughts on various topics.'],
            ['name' => 'Research', 'description' => 'Share and discuss research findings, studies, and academic insights.'],
            ['name' => 'Questions', 'description' => 'Ask questions and seek answers from the community.'],
            ['name' => 'Debate', 'description' => 'Debate and deliberate on controversial topics and opposing viewpoints.'],
            ['name' => 'Collaboration', 'description' => 'Work together on projects, ideas, and group tasks.'],
            ['name' => 'Feedback', 'description' => 'Give and receive feedback on work, ideas, and concepts.'],
            ['name' => 'Tutorials', 'description' => 'Post or find step-by-step guides and how-tos on various subjects.']
        ];
        
        foreach ($categories as $categoryData) {
            $category = new Category();
            $category->setName($categoryData['name']);
            $category->setDescription($categoryData['description']);

            $this->entityManager->persist($category);
        }

        $this->entityManager->flush();
    }
}