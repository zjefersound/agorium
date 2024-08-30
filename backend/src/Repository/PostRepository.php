<?php

namespace App\Repository;

use App\Domain\Post;
use App\Domain\Tag;
use Doctrine\ORM\EntityManagerInterface;

class PostRepository
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function createOrUpdatePost(Post $post, array $tagNames): void
    {
        $this->handleTags($tagNames, $post);

        // Persist the post
        $this->em->persist($post);
        $this->em->flush();

        $this->cleanUpTags();
    }

    private function cleanUpTags(): void
    {
        $this->em->createQuery('DELETE FROM Tag t WHERE t.posts IS EMPTY')
            ->execute();
    }

    private function handleTags(array $tagNames, Post $post)
    {
        // Handle Tags
        $tags = [];
        foreach ($tagNames as $tagName) {
            $tag = $this->em->getRepository(Tag::class)
                ->findOneBy(['name' => $tagName]);

            if (!$tag) {
                $tag = new Tag($tagName);
                $this->em->persist($tag);
            }
            $tags[] = $tag;
        }

        // Clear old tags and set new ones
        $post->getTags()->clear();
        foreach ($tags as $tag) {
            $post->getTags()->add($tag);
        }
    }
}
