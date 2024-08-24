<?php

namespace App\Trait;

use ReflectionClass;
use ReflectionProperty;

trait AutoMapper
{
    public function __construct(array $data)
    {
        $this->mapDataToProperties($data);
    }

    private function mapDataToProperties(array $data): void
    {
        $reflectionClass = new ReflectionClass($this);
        $properties = $reflectionClass->getProperties(ReflectionProperty::IS_PRIVATE | ReflectionProperty::IS_PROTECTED | ReflectionProperty::IS_PUBLIC);

        foreach ($properties as $property) {
            $propertyName = $property->getName();

            if (array_key_exists($propertyName, $data)) {
                $property->setAccessible(true);
                $property->setValue($this, $data[$propertyName]);
            }
        }
    }
}
