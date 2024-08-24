<?php

declare(strict_types=1);

namespace App\DI;

use App\Controller\UserController;
use App\Domain\User;
use App\Middleware\AuthMiddleware;
use App\Repository\UserRepository;
use App\Service\AuthService;
use App\Service\UserService;
use Doctrine\ORM\EntityManager;
use Psr\Container\ContainerInterface;
use Slim\App;
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
            $app->addErrorMiddleware(true, true, true);
            $app->add(new ContentLengthMiddleware());
            return $app;
        });
    }

    private function provideRepositories(Container $c): void
    {
        $c->set(UserRepository::class, static function (ContainerInterface $c): UserRepository {
            return $c->get(EntityManager::class)->getRepository(User::class);
        });
    }

    private function provideServices(Container $c): void
    {
        $c->set(UserService::class, static function (ContainerInterface $c): UserService {
            return new UserService(
                $c->get(UserRepository::class),
                $c->get(ValidatorInterface::class)
            );
        });

        $c->set(AuthService::class, static function (ContainerInterface $c): AuthService {
            return new AuthService(
                $c->get(UserRepository::class),
                $c->get('settings')['jwt']['secret']
            );
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
