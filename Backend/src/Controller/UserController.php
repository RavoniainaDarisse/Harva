<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use OpenApi\Attributes as OA;

final class UserController extends AbstractController
{
    // ---------------- ME ----------------
    #[Route('/api/me', name: 'app_me', methods: ['GET'])]
    #[OA\Get(
        path: "/api/me",
        summary: "Récupère les infos de l'utilisateur connecté",
        responses: [
            new OA\Response(
                response: 200,
                description: "Informations utilisateur",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "id", type: "integer"),
                        new OA\Property(property: "email", type: "string"),
                        new OA\Property(property: "roles", type: "array", items: new OA\Items(type: "string")),
                        new OA\Property(property: "createdAt", type: "string", format: "date-time")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthorized")
        ],
        security: [["bearerAuth" => []]],
        tags: ["User"]
    )]
    public function me(#[CurrentUser()] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'createdAt' => $user->getCreatedAt()->format('Y-m-d H:i:s'),
        ]);
    }
}
