<?php

declare(strict_types=1);

namespace App\DI;

use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;
use Psr\Container\ContainerInterface;
use UMA\DIC\Container;
use UMA\DIC\ServiceProvider;

final readonly class Doctrine implements ServiceProvider
{
    public function provide(Container $c): void
    {
        $c->set(EntityManager::class, static function (ContainerInterface $c): EntityManager {
            $settings = $c->get('settings');

            $config = ORMSetup::createAttributeMetadataConfiguration(
                $settings['doctrine']['metadata_dirs'],
                $settings['doctrine']['dev_mode']
            );

            $connection = DriverManager::getConnection($settings['doctrine']['connection']);

            $em = new EntityManager($connection, $config);

            return $em;
        });
    }
}
