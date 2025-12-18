<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use OpenApi\Attributes as OA;

final class AuthController extends AbstractController
{
    // ---------------- LOGIN ----------------
    #[Route('/api/login', name: 'app_login', methods: ['POST'])]
    #[OA\Post(
        path: "/api/login",
        summary: "Connexion utilisateur",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "email", type: "string"),
                    new OA\Property(property: "password", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Connexion réussie, retourne le JWT",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "token", type: "string")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Email ou mot de passe incorrect")
        ],
        tags: ["Auth"]
    )]
    public function login(): JsonResponse
    {
        return $this->json(['message' => 'Connexion via json_login'], 200);
    }

    // ---------------- REGISTER ----------------
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    #[OA\Post(
        path: "/api/register",
        summary: "Créer un nouvel utilisateur",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "email", type: "string"),
                    new OA\Property(property: "password", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Utilisateur créé"),
            new OA\Response(response: 400, description: "Email ou mot de passe manquant")
        ],
        tags: ["Auth"]
    )]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password']) || empty($data['nom']) || empty($data['prenom'])) {
            return $this->json(['message' => 'Email, mot de passe, nom ou prénom manquant'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword($hasher->hashPassword($user, $data['password']));
        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);


        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'User created'], 201);
    }


}
