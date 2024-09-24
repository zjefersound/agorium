<?php

namespace App\Helper;

use Symfony\Component\Validator\ConstraintViolationListInterface;

class ErrorMapper
{
    public static function getDTOErrorMessages(ConstraintViolationListInterface $errors): array
    {
        $errorMessages = [];

        foreach ($errors as $error) {
            $fieldName = $error->getPropertyPath();
            $errorMessages[$fieldName][] = $error->getMessage();
        }

        return $errorMessages;
    }
}
