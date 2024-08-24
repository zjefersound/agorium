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

        if (!$jwt) {
            return $this->unauthorized(["error" => "Token de autenticação não fornecido."]);
        }

        try {
            $decoded = $this->authService->validateJwt($jwt);
            $request = $request->withAttribute('jwt', $decoded);
            return $handler->handle($request);

        } catch (Throwable $th) {
            return $this->unauthorized(["error" => "Token JWT invalido."]);
        }
    }
}
