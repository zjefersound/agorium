<?php

namespace App\Command;

use App\Domain\Category;
use App\Domain\User;
use App\Domain\Post;
use App\Domain\Comment;
use App\Domain\Vote;
use App\Domain\Tag;
use App\DTO\UserSignupDTO;
use App\DTO\PostDTO;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;

class DatabaseSeeder
{
    private EntityManagerInterface $entityManager;
    private $faker;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->faker = Factory::create();
    }

    public function run(): void
    {
        $this->seedCategories();
        $this->seedUsers();
        $this->seedTags();
        $this->seedPosts();
        $this->seedComments();
        $this->seedVotes();
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

    private function seedUsers(): void
    {
        for ($i = 0; $i < 20; $i++) {
            $userSignupDTO = new UserSignupDTO([]);
            $userSignupDTO->fullName = $this->faker->name();
            $userSignupDTO->username = $this->faker->userName();
            $userSignupDTO->email = $this->faker->email();
            $userSignupDTO->password = "password123";

            $user = new User($userSignupDTO);
            $this->entityManager->persist($user);
        }

        $this->entityManager->flush();
    }

    private function seedTags(): void
    {
        $tagNames = ['technology', 'science', 'politics', 'health', 'education', 'environment', 'sports', 'entertainment'];
        foreach ($tagNames as $tagName) {
            $tag = new Tag($tagName);
            $this->entityManager->persist($tag);
        }
        $this->entityManager->flush();
    }

    private function seedPosts(): void
    {
        $users = $this->entityManager->getRepository(User::class)->findAll();
        $categories = $this->entityManager->getRepository(Category::class)->findAll();
        $tags = $this->entityManager->getRepository(Tag::class)->findAll();

        for ($i = 0; $i < 50; $i++) {
            $user = $this->faker->randomElement($users);
            $category = $this->faker->randomElement($categories);
            $postTags = $this->faker->randomElements($tags, $this->faker->numberBetween(1, 3));

            $postDTO = new PostDTO([]);
            
            $postDTO->title = $this->faker->sentence();
            $postDTO->content = $this->faker->paragraphs(3, true);
            $postDTO->user = $user;

            $post = new Post($postDTO);
            $post->setCategory($category);
            foreach ($postTags as $tag) {
                $post->getTags()->add($tag);
            }

            $this->entityManager->persist($post);
        }
        $this->entityManager->flush();
    }

    private function seedComments(): void
    {
        $users = $this->entityManager->getRepository(User::class)->findAll();
        $posts = $this->entityManager->getRepository(Post::class)->findAll();

        foreach ($posts as $post) {
            $commentCount = $this->faker->numberBetween(0, 10);
            for ($i = 0; $i < $commentCount; $i++) {
                $user = $this->faker->randomElement($users);
                $comment = new Comment(
                    $this->faker->paragraph(),
                    $post,
                    $user
                );

                // 20% chance of being a reply to another comment
                if ($this->faker->boolean(20) && $post->getComments()->count() > 0) {
                    $parentComment = $this->faker->randomElement($post->getComments()->toArray());
                    $comment->setParentComment($parentComment);
                }

                $this->entityManager->persist($comment);
            }
        }
        $this->entityManager->flush();
    }

    private function seedVotes(): void
    {
        $users = $this->entityManager->getRepository(User::class)->findAll();
        $posts = $this->entityManager->getRepository(Post::class)->findAll();
        $comments = $this->entityManager->getRepository(Comment::class)->findAll();

        // Seed votes for posts
        foreach ($posts as $post) {
            $voteCount = $this->faker->numberBetween(0, 20);
            $votedUsers = $this->faker->randomElements($users, $voteCount);
            foreach ($votedUsers as $user) {
                $voteType = $this->faker->randomElement(['upvote', 'downvote']);
                $vote = new Vote($voteType, $user, $post);
                $this->entityManager->persist($vote);
            }
        }

        // Seed votes for comments
        foreach ($comments as $comment) {
            $voteCount = $this->faker->numberBetween(0, 10);
            $votedUsers = $this->faker->randomElements($users, $voteCount);
            foreach ($votedUsers as $user) {
                $voteType = $this->faker->randomElement(['upvote', 'downvote']);
                $vote = new Vote($voteType, $user, null, $comment);
                $this->entityManager->persist($vote);
            }
        }

        $this->entityManager->flush();
    }
}