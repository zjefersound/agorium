<?php

namespace App\Middleware;

use App\Service\AuthService;
use App\Trait\HttpResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Throwable;

class AuthMiddleware implements MiddlewareInterface
{
    use HttpResponse;

    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $authHeader = $request->getHeaderLine('Authorization');

        list($jwt) = sscanf($authHeader, 'Bearer %s');

        try {
            $decoded = $this->authService->validateJwt($jwt);
        } catch (\Throwable $th) {
            return $this->unauthorized(["error" => $th->getMessage()]);
        }

        try {
            $request = $request->withAttribute('jwt', $decoded);
            return $handler->handle($request);
        } catch (Throwable $th) {
            return $this->internal(["error" => $th->getMessage()]);
        }
    }
}
