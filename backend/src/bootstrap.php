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
                'dbname' => getenv("DB_NAME"),
                'user' => getenv("DB_USER"),
                'password' => getenv("DB_PASSWORD"),
                'host' => getenv("DB_HOST"),
                'driver' => 'pdo_mysql'
            ]
        ],
        'jwt' => [
            'secret' => getenv("JWT_SECRET")
        ],
        'rabbitmq' => [
            'connection' => [
                'host' => getenv('RABBITMQ_HOST'),
                'port' => getenv('RABBITMQ_PORT'),
                'user' => getenv('RABBITMQ_USER'),
                'password' => getenv('RABBITMQ_PASSWORD'),
            ]
        ]
    ]
];

return new Container($settings);
