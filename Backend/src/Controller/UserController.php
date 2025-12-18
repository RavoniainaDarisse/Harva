<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Profile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'User')]
final class UserController extends AbstractController
{
    // ===================== ME =====================
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    #[OA\Get(
        path: '/api/me',
        summary: 'Récupérer toutes les informations de l’utilisateur connecté',
        description: 'Retourne les informations User + Profile de l’utilisateur authentifié via JWT',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Informations utilisateur',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [

                        // ===== USER =====
                        new OA\Property(property: 'id', type: 'integer', example: 1),
                        new OA\Property(property: 'email', type: 'string', example: 'test@gmail.com'),
                        new OA\Property(
                            property: 'roles',
                            type: 'array',
                            items: new OA\Items(type: 'string'),
                            example: ['ROLE_USER']
                        ),
                        new OA\Property(property: 'createdAt', type: 'string', format: 'date-time'),

                        new OA\Property(property: 'nom', type: 'string', nullable: true),
                        new OA\Property(property: 'prenom', type: 'string', nullable: true),

                        // ===== PROFILE =====
                        new OA\Property(property: 'profile_id', type: 'integer', nullable: true),

                        new OA\Property(property: 'telephone', type: 'string', nullable: true),
                        new OA\Property(property: 'sexe', type: 'string', enum: ['M', 'F', 'Autre'], nullable: true),
                        new OA\Property(property: 'nationalite', type: 'string', nullable: true),
                        new OA\Property(property: 'ville_residence', type: 'string', nullable: true),

                        new OA\Property(property: 'parcours_academique', type: 'string', nullable: true),
                        new OA\Property(property: 'niveau_etude_actuel', type: 'string', nullable: true),
                        new OA\Property(property: 'domaine_etude', type: 'string', nullable: true),
                        new OA\Property(property: 'etablissement_actuel', type: 'string', nullable: true),
                        new OA\Property(property: 'moyenne_generale', type: 'string', nullable: true),
                        new OA\Property(property: 'annee_diplome_prevue', type: 'string', nullable: true),

                        new OA\Property(property: 'langue', type: 'string', nullable: true),
                        new OA\Property(property: 'niveau_francais', type: 'string', nullable: true),
                        new OA\Property(property: 'niveau_anglais', type: 'string', nullable: true),

                        new OA\Property(
                            property: 'date_naissance',
                            type: 'string',
                            format: 'date',
                            nullable: true
                        ),

                        new OA\Property(
                            property: 'autres_langues',
                            type: 'array',
                            items: new OA\Items(type: 'string'),
                            nullable: true
                        ),

                        new OA\Property(property: 'experiences_academiques', type: 'string', nullable: true),
                        new OA\Property(property: 'activites_extrascolaires', type: 'string', nullable: true),
                        new OA\Property(property: 'engagement_associatif', type: 'string', nullable: true),

                        new OA\Property(
                            property: 'recompenses_distinctions',
                            type: 'array',
                            items: new OA\Items(type: 'string'),
                            nullable: true
                        ),
                    ]
                )
            ),
            new OA\Response(response: 401, description: 'Unauthorized')
        ]
    )]
    public function me(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        /** @var Profile|null $profile */
        $profile = $user->getProfiles()->first() ?: null;

        return $this->json([
            // ===== USER =====
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'createdAt' => $user->getCreatedAt()?->format('Y-m-d H:i:s'),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),

            // ===== PROFILE =====
            'profile_id' => $profile?->getId(),
            'telephone' => $profile?->getTelephone(),
            'sexe' => $profile?->getSexe(),
            'nationalite' => $profile?->getNationalite(),
            'ville_residence' => $profile?->getVilleResidence(),
            'parcours_academique' => $profile?->getParcoursAcademique(),
            'niveau_etude_actuel' => $profile?->getNiveauEtudeActuel(),
            'domaine_etude' => $profile?->getDomaineEtude(),
            'etablissement_actuel' => $profile?->getEtablissementActuel(),
            'moyenne_generale' => $profile?->getMoyenneGenerale(),
            'annee_diplome_prevue' => $profile?->getAnneeDiplomePrevue(),
            'langue' => $profile?->getLangue(),
            'niveau_francais' => $profile?->getNiveauFrancais(),
            'niveau_anglais' => $profile?->getNiveauAnglais(),
            'date_naissance' => $profile?->getDateNaissance()?->format('Y-m-d'),
            'autres_langues' => $profile?->getAutresLangues(),
            'experiences_academiques' => $profile?->getExperiencesAcademiques(),
            'activites_extrascolaires' => $profile?->getActivitesExtrascolaires(),
            'engagement_associatif' => $profile?->getEngagementAssociatif(),
            'recompenses_distinctions' => $profile?->getRecompensesDistinctions(),
        ]);
    }
}
