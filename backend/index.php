<?php

use Slim\App;
use App\DI;

$container = require_once __DIR__ . '/src/bootstrap.php';

$container->register(new DI\Doctrine());
$container->register(new DI\Slim());

$app = $container->get(App::class);

(require __DIR__ . '/src/routes.php')($app);

$app->run();