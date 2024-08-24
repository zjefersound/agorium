<?php

namespace App\Trait;

use Nyholm\Psr7\Response;

trait HttpResponse
{
    protected function jsonResponse(int $statusCode, $body = [], array $headers = []): Response
    {
        $headers = array_merge(['Content-Type' => 'application/json'], $headers);
        return new Response($statusCode, $headers, json_encode($body, JSON_UNESCAPED_UNICODE));
    }

    protected function ok($body = '', array $headers = []): Response
    {
        return $this->jsonResponse(200, $body, $headers);
    }

    protected function created($body = '', array $headers = []): Response
    {
        return $this->jsonResponse(201, $body, $headers);
    }

    protected function badRequest($body = '', array $headers = []): Response
    {
        return $this->jsonResponse(400, $body, $headers);
    }

    protected function unauthorized($body = '', array $headers = []): Response
    {
        return $this->jsonResponse(401, $body, $headers);
    }

    protected function forbidden($body = '', array $headers = []): Response
    {
        return $this->jsonResponse(403, $body, $headers);
    }

    protected function notFound($body = '', array $headers = []): Response
    {
        return $this->jsonResponse(404, $body, $headers);
    }

    protected function unprocessable($body = '', array $headers = []): Response
    {
        return $this->jsonResponse(422, $body, $headers);
    }
}
