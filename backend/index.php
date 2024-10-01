<?php

use Slim\App;
use App\DI;
use App\Middleware\CorsMiddleware;

date_default_timezone_set('America/Sao_Paulo');

require_once __DIR__ . '/src/Env/index.php';
$container = require_once __DIR__ . '/src/bootstrap.php';

$container->register(new DI\Doctrine());
$container->register(new DI\Slim());

$app = $container->get(App::class);
$app->add(CorsMiddleware::class);

(require __DIR__ . '/src/routes.php')($app);

$app->run();
