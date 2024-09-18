<?php

namespace App\Helper;

use Exception;
use Nyholm\Psr7\UploadedFile;

class UploadHelper
{
    static function uploadUserAvatar(UploadedFile $uploadedAvatar): String
    {
        $avatarStream = $uploadedAvatar->getStream();

        if ($avatarStream && $avatarStream->getSize() != null && $avatarStream->getSize() > 0) {
            $fileType = explode(', ', $uploadedAvatar->getClientMediaType());
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (!array_intersect($fileType, $allowedTypes)) {
                throw new Exception('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            }

            $avatarGuid = UploadHelper::generateGuid() . '.' . pathinfo($uploadedAvatar->getClientFilename(), PATHINFO_EXTENSION);

            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
            $uploadedAvatar->moveTo($uploadDir . $avatarGuid);

            return $avatarGuid;
        }
    }
    static function generateGuid(): string
    {
        return bin2hex(random_bytes(16));
    }
}
