<?php

use Nyholm\Psr7\Response;
use Nyholm\Psr7\Stream;
use Slim\App;

return function (App $app) {
    $app->get('/', fn() => new Response(body: "Hello!"));
    $app->get('/ping', fn() => new Response(body: "pong"));

    $app->get('/swagger', function ($req, $res) {
        $stream = new Stream(fopen(__DIR__ . '/swagger.yaml', 'rb'));

        return $res
            ->withHeader('Content-Disposition', 'attachment; filename=openapi.yaml')
            ->withBody($stream);
    });
};
