<?php

declare(strict_types=1);

use UMA\DIC\Container;

require_once __DIR__ . '/../vendor/autoload.php';

$settings = [
    'settings' => [
        'doctrine' => [
            // Enables or disables Doctrine metadata caching
            // for either performance or convenience during development.
            'dev_mode' => true,
            'metadata_dirs' => [__DIR__ . '/Domain'],
            'connection' => [
                'dbname' => 'docker',
                'user' => 'docker',
                'password' => 'docker',
                'host' => 'mysql',
                'driver' => 'pdo_mysql'
            ]
        ],
        'jwt' => [
            'secret' => 'chambres'
        ]
    ]
];

return new Container($settings);