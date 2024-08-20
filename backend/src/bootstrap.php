<?php

declare(strict_types=1);

use UMA\DIC\Container;

require_once __DIR__ . '/../vendor/autoload.php';

$settings = [
    'settings' => [
        'slim' => [
            // Returns a detailed HTML page with error details and
            // a stack trace. Should be disabled in production.
            'displayErrorDetails' => true,
            'logErrors' => true,

            // If true, display full errors with message and stack trace on the PHP log.
            // If false, display only "Slim Application Error" on the PHP log.
            // Doesn't do anything when 'logErrors' is false.
            'logErrorDetails' => true,
        ],

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
    ]
];

return new Container($settings);