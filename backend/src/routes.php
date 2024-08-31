<?php

use App\Controller\{UserController, CategoryController, PostController};
use App\Middleware\AuthMiddleware;
use Nyholm\Psr7\Response;
use Nyholm\Psr7\Stream;
use Slim\App;

return function (App $app) {
    $app->get("/ping", fn() => new Response(200, body: "pong"));

    $app->post('/signup', UserController::class . ':signup');
    $app->post('/login', UserController::class . ':login');
    $app->get('/user/avatar/{id}', UserController::class . ':getUserAvatar');

    $app->group('user', function () use ($app) {
        $app->get('/user/me', UserController::class . ':getUser');
    })->add(AuthMiddleware::class);

    $app->group('posts', function () use ($app) {
        $app->get('/posts', PostController::class . ':searchPosts');
        $app->get('/post/{id}', PostController::class . ':getPost');
        $app->post('/post', PostController::class . ':savePost');
        $app->put('/post/{id}', PostController::class . ':savePost');
        $app->delete('/post/{id}', PostController::class . ':deletePost');
    })->add(AuthMiddleware::class);

    $app->group('categories', function () use ($app) {
        $app->get('/categories', CategoryController::class . ':searchCategories');
        $app->get('/category/{id}', CategoryController::class . ':getCategory');
        $app->post('/category', CategoryController::class . ':saveCategory');
        $app->put('/category/{id}', CategoryController::class . ':saveCategory');
        $app->delete('/category/{id}', CategoryController::class . ':deleteCategory');
    })->add(AuthMiddleware::class);

    $app->get('/swagger', function ($req, $res) {
        $stream = new Stream(fopen(__DIR__ . '/swagger.yaml', 'rb'));

        return $res
            ->withHeader('Content-Disposition', 'attachment; filename=openapi.yaml')
            ->withBody($stream);
    });
};
