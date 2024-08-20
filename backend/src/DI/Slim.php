<?php

declare(strict_types=1);

namespace App\DI;

use Psr\Container\ContainerInterface;
use Slim\App;
use Slim\Factory\AppFactory;
use Slim\Middleware\ContentLengthMiddleware;
use UMA\DIC\Container;
use UMA\DIC\ServiceProvider;

final readonly class Slim implements ServiceProvider
{
    public function provide(Container $c): void
    {
        $c->set(App::class, static function (ContainerInterface $c): App {
            $settings = $c->get('settings');

            $app = AppFactory::create(null, $c);

            $app->addErrorMiddleware(
                $settings['slim']['displayErrorDetails'],
                $settings['slim']['logErrors'],
                $settings['slim']['logErrorDetails']
            );

            $app->add(new ContentLengthMiddleware());

            return $app;
        });
    }
}
