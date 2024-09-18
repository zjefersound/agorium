<?php

declare(strict_types=1);

namespace App\Helper;

use RuntimeException;
use InvalidArgumentException;
use LogicException;
use Nyholm\Psr7\UploadedFile;

class UploadHelper
{
    /**
     * Upload the user's avatar and return the generated filename.
     *
     * @param UploadedFile $uploadedAvatar
     * @return string
     * @throws InvalidArgumentException
     * @throws RuntimeException
     * @throws LogicException
     */
    public static function uploadUserAvatar(UploadedFile $uploadedAvatar): string
    {
        $avatarStream = $uploadedAvatar->getStream();

        // Check if the file stream and size are valid
        if ($avatarStream && $avatarStream->getSize() !== null && $avatarStream->getSize() > 0) {

            // Validate file type using the client's MIME type
            $fileType = $uploadedAvatar->getClientMediaType();
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (!in_array($fileType, $allowedTypes, true)) {
                throw new InvalidArgumentException('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            }

            // Generate a unique file name
            $avatarGuid = self::generateGuid() . '.' . pathinfo($uploadedAvatar->getClientFilename(), PATHINFO_EXTENSION);

            // Define the upload directory and ensure it exists
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
            if (!is_dir($uploadDir) && !mkdir($uploadDir, 0777, true)) {
                throw new RuntimeException('Failed to create the upload directory.');
            }

            // Move the uploaded file
            try {
                $uploadedAvatar->moveTo($uploadDir . $avatarGuid);
            } catch (\Throwable $e) {
                throw new RuntimeException('File upload failed: ' . $e->getMessage());
            }

            return $avatarGuid;
        }

        throw new LogicException('Invalid file upload: Empty or invalid file stream.');
    }

    /**
     * Generate a unique GUID for the uploaded file.
     *
     * @return string
     */
    public static function generateGuid(): string
    {
        return bin2hex(random_bytes(16));
    }
}
