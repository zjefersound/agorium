<?php

use Nyholm\Psr7\Response;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function () {
    return new Response(200, ['Content-Type' => 'application/json'], "Hello, world!");
});

$app->run();