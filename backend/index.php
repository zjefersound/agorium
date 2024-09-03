<?php

use Slim\App;
use App\DI;

date_default_timezone_set('America/Sao_Paulo');

$container = require_once __DIR__ . '/src/bootstrap.php';

$container->register(new DI\Doctrine());
$container->register(new DI\Slim());

$app = $container->get(App::class);

(require __DIR__ . '/src/routes.php')($app);

$app->run();