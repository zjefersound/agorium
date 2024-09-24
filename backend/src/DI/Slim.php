<?php

declare(strict_types=1);

namespace App\DI;

use App\Domain\{Category, Comment, Tag, User};
use App\Controller\{CategoryController, CommentController, PostController, UserController, TagController, VoteController};
use App\Repository\{CategoryRepository, CommentRepository, PostRepository, TagRepository, UserRepository, VoteRepository};
use App\Service\{AuthService, CategoryService, CommentService, MailerService, PostService, TagService, UserService, VoteService};
use App\Middleware\AuthMiddleware;
use Doctrine\ORM\EntityManager;
use Nyholm\Psr7\Response;
use Psr\Container\ContainerInterface;
use Slim\App;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;
use Slim\Middleware\ContentLengthMiddleware;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use UMA\DIC\Container;
use UMA\DIC\ServiceProvider;

final class Slim implements ServiceProvider
{
    public function provide(Container $c): void
    {
        $this->provideFrameworkServices($c);
        $this->provideRepositories($c);
        $this->provideServices($c);
        $this->provideControllers($c);
        $this->provideMiddleware($c);
    }

    private function provideFrameworkServices(Container $c): void
    {
        $c->set(ValidatorInterface::class, static function (): ValidatorInterface {
            return Validation::createValidatorBuilder()
                ->enableAttributeMapping()
                ->getValidator();
        });

        $c->set(App::class, static function (ContainerInterface $c): App {
            $app = AppFactory::create(null, $c);
            $errorMiddleware = $app->addErrorMiddleware(true, true, true);

            $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function () {
                return new Response(404, ['Content-Type' => 'application/json'], json_encode(["error" => "API Endpoint not found!"]));
            });

            $app->add(new ContentLengthMiddleware());
            return $app;
        });
    }

    private function provideRepositories(Container $c): void
    {
        $c->set(UserRepository::class, static function (ContainerInterface $c): UserRepository {
            return new UserRepository(
                $c->get(EntityManager::class),
                $c->get(EntityManager::class)->getClassMetadata(User::class)
            );
        });

        $c->set(PostRepository::class, static function (ContainerInterface $c): PostRepository {
            return new PostRepository(
                $c->get(EntityManager::class)
            );
        });

        $c->set(CategoryRepository::class, static function (ContainerInterface $c): CategoryRepository {
            return new CategoryRepository(
                $c->get(EntityManager::class),
                $c->get(EntityManager::class)->getClassMetadata(Category::class)
            );
        });

        $c->set(CommentRepository::class, static function (ContainerInterface $c): CommentRepository {
            return new CommentRepository(
                $c->get(EntityManager::class),
                $c->get(EntityManager::class)->getClassMetadata(Comment::class)
            );
        });

        $c->set(TagRepository::class, static function (ContainerInterface $c): TagRepository {
            return new TagRepository(
                $c->get(EntityManager::class),
                $c->get(EntityManager::class)->getClassMetadata(Tag::class)
            );
        });

        $c->set(VoteRepository::class, static function (ContainerInterface $c): VoteRepository {
            return new VoteRepository(
                $c->get(EntityManager::class)
            );
        });
    }

    private function provideServices(Container $c): void
    {
        $c->set(AuthService::class, static function (ContainerInterface $c): AuthService {
            return new AuthService(
                $c->get(UserRepository::class),
                $c->get('settings')['jwt']['secret']
            );
        });

        $c->set(MailerService::class, static function (ContainerInterface $c): MailerService {
            return new MailerService();
        });

        $c->set(UserService::class, static function (ContainerInterface $c): UserService {
            return new UserService(
                $c->get(UserRepository::class),
                $c->get(VoteRepository::class),
                $c->get(MailerService::class)
            );
        });

        $c->set(PostService::class, static function (ContainerInterface $c): PostService {
            return new PostService($c->get(PostRepository::class), $c->get(CategoryRepository::class));
        });

        $c->set(CategoryService::class, static function (ContainerInterface $c): CategoryService {
            return new CategoryService($c->get(CategoryRepository::class));
        });

        $c->set(CommentService::class, static function (ContainerInterface $c): CommentService {
            return new CommentService(
                $c->get(CommentRepository::class),
                $c->get(PostRepository::class),
                $c->get(UserRepository::class)
            );
        });

        $c->set(TagService::class, static function (ContainerInterface $c): TagService {
            return new TagService($c->get(TagRepository::class));
        });

        $c->set(VoteService::class, static function (ContainerInterface $c): VoteService {
            return new VoteService($c->get(VoteRepository::class));
        });
    }

    private function provideControllers(Container $c): void
    {
        $c->set(UserController::class, static function (ContainerInterface $c): UserController {
            return new UserController(
                $c->get(UserService::class),
                $c->get(AuthService::class),
                $c->get(ValidatorInterface::class)
            );
        });

        $c->set(PostController::class, static function (ContainerInterface $c): PostController {
            return new PostController($c->get(PostService::class), $c->get(UserService::class), $c->get(ValidatorInterface::class));
        });

        $c->set(CategoryController::class, static function (ContainerInterface $c): CategoryController {
            return new CategoryController($c->get(CategoryService::class));
        });

        $c->set(CommentController::class, static function (ContainerInterface $c): CommentController {
            return new CommentController(
                $c->get(CommentService::class),
                $c->get(UserService::class),
                $c->get(ValidatorInterface::class)
            );
        });

        $c->set(TagController::class, static function (ContainerInterface $c): TagController {
            return new TagController($c->get(TagService::class));
        });

        $c->set(VoteController::class, static function (ContainerInterface $c): VoteController {
            return new VoteController(
                $c->get(VoteService::class),
                $c->get(UserService::class),
                $c->get(PostService::class),
                $c->get(CommentService::class)
            );
        });
    }

    private function provideMiddleware(Container $c): void
    {
        $c->set(AuthMiddleware::class, static function (ContainerInterface $c): AuthMiddleware {
            return new AuthMiddleware(
                $c->get(AuthService::class),
                $c->get('settings')['jwt']['secret']
            );
        });
    }
}
