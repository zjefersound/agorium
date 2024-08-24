<?php

use App\Controller\UserController;
use App\Middleware\AuthMiddleware;
use Nyholm\Psr7\Response;
use Nyholm\Psr7\Stream;
use Slim\App;

return function (App $app) {
    $app->get("/ping", fn() => new Response(200, body: "pong"));

    $app->post('/signup', UserController::class . ':signup');
    $app->post('/login', UserController::class . ':login');
    
    $app->group('user', function () use ($app) {
        $app->get('/user/me', UserController::class . ':getUser');
        $app->get('/user/avatar/{id}', UserController::class . ':getUserAvatar');
    })->add(AuthMiddleware::class);

    $app->get('/swagger', function ($req, $res) {
        $stream = new Stream(fopen(__DIR__ . '/swagger.yaml', 'rb'));

        return $res
            ->withHeader('Content-Disposition', 'attachment; filename=openapi.yaml')
            ->withBody($stream);
    });
};
