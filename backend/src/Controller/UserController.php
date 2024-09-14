<?php

namespace App\Controller;

use App\DTO\UserSignupDTO;
use App\Helper\ErrorMapper;
use App\Service\AuthService;
use App\Service\UserService;
use App\Trait\HttpResponse;
use Nyholm\Psr7\Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController
{
    use HttpResponse;

    private UserService $userService;
    private AuthService $authService;
    private ValidatorInterface $validator;

    public function __construct(UserService $userService, AuthService $authService, ValidatorInterface $validator)
    {
        $this->userService = $userService;
        $this->authService = $authService;
        $this->validator = $validator;
    }

    public function signup(Request $req, Response $response): Response
    {
        $data = $req->getParsedBody();
        $userSignupDTO = new UserSignupDTO($data);
        $errors = $this->validator->validate($userSignupDTO);

        if (count($errors) > 0) {
            return $this->unprocessable(["error" => ErrorMapper::GetDTOErrorMessages($errors)]);
        }

        $uploadedFiles = $req->getUploadedFiles();

        $avatar = isset($uploadedFiles["avatar"]) ? $uploadedFiles["avatar"] : null;

        try {
            $this->userService->createUser($userSignupDTO, $avatar);
        } catch (\Throwable $th) {
            return $this->unprocessable(["error" => $th->getMessage()]);
        }

        return $this->created("User created successfully.");
    }

    public function login(Request $req)
    {
        $data = (array) json_decode($req->getBody()->getContents(), true);
        $login = $data["login"] ?? "";
        $password = $data["password"] ?? "";

        $token = $this->authService->authenticate($login, $password);

        if ($token) {
            return $this->ok(["token" => $token]);
        }

        return $this->unauthorized(["error" => "Login or password invalid."]);
    }

    public function getUser(Request $req)
    {
        $userId = (int) $req->getAttribute("userId");
        $user = $this->userService->getUserById($userId);
        return $this->ok($user->jsonSerialize());
    }

    public function getUserAvatar($req, $res, $args)
    {
        $userId = $args["id"];
        if (!$userId) {
            $this->badRequest(["error" => "User id is required."]);
        }

        $user = $this->userService->getUserById($userId);
        $avatar = $user?->getAvatar();
        if (!$user || !$avatar) {
            return $this->notFound(["error" => "The user has no avatar."]);
        }

        $filePath = $_SERVER["DOCUMENT_ROOT"] . "/uploads/" . $avatar;
        if (!file_exists($filePath)) {
            return $this->notFound("File not found");
        }

        $responseHeaders = ["Content-Type" => mime_content_type($filePath), "Content-Length" => filesize($filePath)];

        return new Response(200, $responseHeaders, file_get_contents($filePath));
    }
}
