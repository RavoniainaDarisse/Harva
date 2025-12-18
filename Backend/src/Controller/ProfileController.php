<?php

namespace App\Controller;

use App\Entity\Profile;
use App\Entity\User;
use App\Repository\ProfileRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use OpenApi\Attributes as OA;

#[Route('/api/profiles', name: 'app_profile')]
#[OA\Tag(name: 'Profile')]
final class ProfileController extends AbstractController
{
    private const N8N_WEBHOOK_URL = 'https://iandrianinameeting.app.n8n.cloud/webhook-test/post';

    public function __construct(
        private ProfileRepository $profileRepository,
        private EntityManagerInterface $entityManager,
        private ValidatorInterface $validator,
        private HttpClientInterface $httpClient
    ) {}

    /**
     * Récupère le profil de l'utilisateur connecté
     */
    #[Route('', name: 'get_my_profile', methods: ['GET'])]
    #[OA\Get(
        path: '/api/profiles',
        summary: 'Récupère le profil de l\'utilisateur connecté',
        responses: [
            new OA\Response(
                response: 200,
                description: 'Profil récupéré avec succès',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(property: 'id', type: 'integer'),
                        new OA\Property(property: 'telephone', type: 'string', nullable: true),
                        new OA\Property(property: 'sexe', type: 'string'),
                        new OA\Property(property: 'nationalite', type: 'string'),
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
                        new OA\Property(property: 'date_naissance', type: 'string', format: 'date', nullable: true),
                        new OA\Property(property: 'autres_langues', type: 'array', items: new OA\Items(type: 'string'), nullable: true),
                        new OA\Property(property: 'experiences_academiques', type: 'string', nullable: true),
                        new OA\Property(property: 'activites_extrascolaires', type: 'string', nullable: true),
                        new OA\Property(property: 'engagement_associatif', type: 'string', nullable: true),
                        new OA\Property(property: 'recompenses_distinctions', type: 'array', items: new OA\Items(type: 'string'), nullable: true),
                    ]
                )
            ),
            new OA\Response(response: 401, description: 'Non authentifié'),
            new OA\Response(response: 404, description: 'Profil non trouvé'),
        ],
        security: [['bearerAuth' => []]],
        tags: ['Profile']
    )]
    public function getMyProfile(#[CurrentUser()] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $profile = $this->profileRepository->findOneBy(['user' => $user]);

        if (!$profile) {
            return $this->json(['error' => 'Profil non trouvé'], 404);
        }

        return $this->json($this->serializeProfile($profile), 200);
    }

    /**
     * Crée ou met à jour le profil de l'utilisateur connecté
     */

    #[OA\Post(
        path: '/api/profiles',
        summary: 'Crée ou met à jour le profil de l\'utilisateur connecté',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                required: ['sexe', 'nationalite'],
                properties: [
                    new OA\Property(property: 'telephone', type: 'string', nullable: true),
                    new OA\Property(property: 'sexe', type: 'string', enum: ['M', 'F', 'Autre']),
                    new OA\Property(property: 'nationalite', type: 'string'),
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
                    new OA\Property(property: 'date_naissance', type: 'string', format: 'date', nullable: true),
                    new OA\Property(property: 'autres_langues', type: 'array', items: new OA\Items(type: 'string'), nullable: true),
                    new OA\Property(property: 'experiences_academiques', type: 'string', nullable: true),
                    new OA\Property(property: 'activites_extrascolaires', type: 'string', nullable: true),
                    new OA\Property(property: 'engagement_associatif', type: 'string', nullable: true),
                    new OA\Property(property: 'recompenses_distinctions', type: 'array', items: new OA\Items(type: 'string'), nullable: true),
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: 'Profil créé avec succès',
            ),
            new OA\Response(response: 400, description: 'Données invalides'),
            new OA\Response(response: 401, description: 'Non authentifié'),
        ],
        security: [['bearerAuth' => []]],
        tags: ['Profile']
    )]
    #[Route('', name: 'create_profile', methods: ['POST', 'PUT'])]
    public function createOrUpdateProfile(
        Request $request,
        #[CurrentUser()] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Données invalides'], 400);
        }

        $profile = $this->profileRepository->findOneBy(['user' => $user]);

        if (!$profile) {
            $profile = new Profile();
            $profile->setUser($user);
        }

        $profile = $this->updateProfileData($profile, $data);

        $errors = $this->validator->validate($profile);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], 400);
        }

        $this->entityManager->persist($profile);
        $this->entityManager->flush();

        return $this->json($this->serializeProfile($profile), 201);
    }

    /**
     * Met à jour un champ spécifique du profil
     */
    #[Route('/{id}', name: 'update_profile_field', methods: ['PATCH'])]
    #[OA\Patch(
        path: '/api/profiles/{id}',
        summary: 'Met à jour un champ spécifique du profil',
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                additionalProperties: true
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Profil mis à jour avec succès'),
            new OA\Response(response: 401, description: 'Non authentifié'),
            new OA\Response(response: 403, description: 'Accès refusé'),
            new OA\Response(response: 404, description: 'Profil non trouvé'),
        ],
        security: [['bearerAuth' => []]],
        tags: ['Profile']
    )]
    public function updateProfileField(
        int $id,
        Request $request,
        #[CurrentUser()] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $profile = $this->profileRepository->find($id);

        if (!$profile) {
            return $this->json(['error' => 'Profil non trouvé'], 404);
        }

        if ($profile->getUser()->getId() !== $user->getId()) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Données invalides'], 400);
        }

        $profile = $this->updateProfileData($profile, $data);

        $errors = $this->validator->validate($profile);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], 400);
        }

        $this->entityManager->flush();

        return $this->json($this->serializeProfile($profile), 200);
    }

    /**
     * Supprime le profil de l'utilisateur connecté
     */
    #[Route('/{id}', name: 'delete_profile', methods: ['DELETE'])]
    #[OA\Delete(
        path: '/api/profiles/{id}',
        summary: 'Supprime le profil de l\'utilisateur',
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(response: 204, description: 'Profil supprimé avec succès'),
            new OA\Response(response: 401, description: 'Non authentifié'),
            new OA\Response(response: 403, description: 'Accès refusé'),
            new OA\Response(response: 404, description: 'Profil non trouvé'),
        ],
        security: [['bearerAuth' => []]],
        tags: ['Profile']
    )]
    public function deleteProfile(
        int $id,
        #[CurrentUser()] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $profile = $this->profileRepository->find($id);

        if (!$profile) {
            return $this->json(['error' => 'Profil non trouvé'], 404);
        }

        if ($profile->getUser()->getId() !== $user->getId()) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }

        $this->entityManager->remove($profile);
        $this->entityManager->flush();

        return $this->json([], 204);
    }

    /**
     * Récupère tous les profils (admin only)
     */
    #[Route('/list/all', name: 'list_all_profiles', methods: ['GET'])]
    #[OA\Get(
        path: '/api/profiles/list/all',
        summary: 'Récupère tous les profils (admin uniquement)',
        responses: [
            new OA\Response(
                response: 200,
                description: 'Liste des profils'
            ),
            new OA\Response(response: 401, description: 'Non authentifié'),
            new OA\Response(response: 403, description: 'Accès refusé'),
        ],
        security: [['bearerAuth' => []]],
        tags: ['Profile']
    )]
    public function listAllProfiles(#[CurrentUser()] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        if (!in_array('ROLE_ADMIN', $user->getRoles())) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }

        $profiles = $this->profileRepository->findAll();
        $serialized = array_map(fn(Profile $profile) => $this->serializeProfile($profile), $profiles);

        return $this->json($serialized, 200);
    }

    /**
     * Récupère le profil d'un utilisateur spécifique par ID
     */
    #[Route('/{id}', name: 'get_profile', methods: ['GET'])]
    #[OA\Get(
        path: '/api/profiles/{id}',
        summary: 'Récupère le profil d\'un utilisateur spécifique',
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Profil récupéré avec succès'
            ),
            new OA\Response(response: 401, description: 'Non authentifié'),
            new OA\Response(response: 403, description: 'Accès refusé'),
            new OA\Response(response: 404, description: 'Profil non trouvé'),
        ],
        security: [['bearerAuth' => []]],
        tags: ['Profile']
    )]
    public function getProfile(
        int $id,
        #[CurrentUser()] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $profile = $this->profileRepository->find($id);

        if (!$profile) {
            return $this->json(['error' => 'Profil non trouvé'], 404);
        }

        // Vérifier les permissions
        if ($profile->getUser()->getId() !== $user->getId() && !in_array('ROLE_ADMIN', $user->getRoles())) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }

        return $this->json($this->serializeProfile($profile), 200);
    }

    /**
     * Envoie le profil au webhook N8N
     */
    #[OA\Post(
        path: '/api/profiles/{id}/send-to-n8n',
        summary: 'Envoie le profil au webhook N8N',
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Profil envoyé à N8N avec succès',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(property: 'message', type: 'string'),
                        new OA\Property(property: 'n8n_response', type: 'object'),
                    ]
                )
            ),
            new OA\Response(response: 401, description: 'Non authentifié'),
            new OA\Response(response: 403, description: 'Accès refusé'),
            new OA\Response(response: 404, description: 'Profil non trouvé'),
            new OA\Response(response: 500, description: 'Erreur lors de l\'envoi à N8N'),
        ],
        security: [['bearerAuth' => []]],
        tags: ['Profile']
    )]
    #[Route('/{id}/send-to-n8n', name: 'send_profile_to_n8n', methods: ['POST'])]
    public function sendProfileToN8N(
        int $id,
        #[CurrentUser()] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $profile = $this->profileRepository->find($id);

        if (!$profile) {
            return $this->json(['error' => 'Profil non trouvé'], 404);
        }

        // Vérifier les permissions
        if ($profile->getUser()->getId() !== $user->getId() && !in_array('ROLE_ADMIN', $user->getRoles())) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }

        $n8nResponse = $this->sendToN8NWebhook($this->serializeProfile($profile), $user);

        if (!$n8nResponse) {
            return $this->json(['error' => 'Erreur lors de l\'envoi à N8N'], 500);
        }

        return $this->json([
            'message' => 'Profil envoyé à N8N avec succès',
            'n8n_response' => $n8nResponse,
        ], 200);
    }

    /**
     * Met à jour les données du profil
     */
    private function updateProfileData(Profile $profile, array $data): Profile
    {
        if (isset($data['telephone'])) {
            $profile->setTelephone($data['telephone']);
        }
        if (isset($data['sexe'])) {
            $profile->setSexe($data['sexe']);
        }
        if (isset($data['nationalite'])) {
            $profile->setNationalite($data['nationalite']);
        }
        if (isset($data['ville_residence'])) {
            $profile->setVilleResidence($data['ville_residence']);
        }
        if (isset($data['parcours_academique'])) {
            $profile->setParcoursAcademique($data['parcours_academique']);
        }
        if (isset($data['niveau_etude_actuel'])) {
            $profile->setNiveauEtudeActuel($data['niveau_etude_actuel']);
        }
        if (isset($data['domaine_etude'])) {
            $profile->setDomaineEtude($data['domaine_etude']);
        }
        if (isset($data['etablissement_actuel'])) {
            $profile->setEtablissementActuel($data['etablissement_actuel']);
        }
        if (isset($data['moyenne_generale'])) {
            $profile->setMoyenneGenerale($data['moyenne_generale']);
        }
        if (isset($data['annee_diplome_prevue'])) {
            $profile->setAnneeDiplomePrevue($data['annee_diplome_prevue']);
        }
        if (isset($data['langue'])) {
            $profile->setLangue($data['langue']);
        }
        if (isset($data['niveau_francais'])) {
            $profile->setNiveauFrancais($data['niveau_francais']);
        }
        if (isset($data['niveau_anglais'])) {
            $profile->setNiveauAnglais($data['niveau_anglais']);
        }
        if (isset($data['date_naissance'])) {
            $profile->setDateNaissance(new \DateTime($data['date_naissance']));
        }
        if (isset($data['autres_langues'])) {
            $profile->setAutresLangues($data['autres_langues']);
        }
        if (isset($data['experiences_academiques'])) {
            $profile->setExperiencesAcademiques($data['experiences_academiques']);
        }
        if (isset($data['activites_extrascolaires'])) {
            $profile->setActivitesExtrascolaires($data['activites_extrascolaires']);
        }
        if (isset($data['engagement_associatif'])) {
            $profile->setEngagementAssociatif($data['engagement_associatif']);
        }
        if (isset($data['recompenses_distinctions'])) {
            $profile->setRecompensesDistinctions($data['recompenses_distinctions']);
        }

        return $profile;
    }

    /**
     * Envoie les données du profil au webhook N8N et retourne la réponse
     */
    private function sendToN8NWebhook(array $profileData, User $user): ?array
    {
        try {
            $payload = [
                'action' => 'profile_updated',
                'timestamp' => (new \DateTime())->format('Y-m-d H:i:s'),
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'nom' => $user->getNom(),
                    'prenom' => $user->getPrenom(),
                ],
                'profile' => $profileData,
            ];

            $response = $this->httpClient->request('POST', self::N8N_WEBHOOK_URL, [
                'json' => $payload,
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
            ]);

            $statusCode = $response->getStatusCode();
            $content = $response->getContent();

            // Décode la réponse JSON si possible
            $responseData = json_decode($content, true);

            error_log('Réponse N8N (Status: ' . $statusCode . '): ' . $content);

            return [
                'status' => $statusCode,
                'data' => $responseData ?? $content,
            ];
        } catch (\Exception $e) {
            // Log l'erreur mais ne bloque pas la réponse
            error_log('Erreur lors de l\'envoi au webhook N8N: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Sérialise un profil pour la réponse JSON
     */
    private function serializeProfile(Profile $profile): array
    {
        return [
            'id' => $profile->getId(),
            'telephone' => $profile->getTelephone(),
            'sexe' => $profile->getSexe(),
            'nationalite' => $profile->getNationalite(),
            'ville_residence' => $profile->getVilleResidence(),
            'parcours_academique' => $profile->getParcoursAcademique(),
            'niveau_etude_actuel' => $profile->getNiveauEtudeActuel(),
            'domaine_etude' => $profile->getDomaineEtude(),
            'etablissement_actuel' => $profile->getEtablissementActuel(),
            'moyenne_generale' => $profile->getMoyenneGenerale(),
            'annee_diplome_prevue' => $profile->getAnneeDiplomePrevue(),
            'langue' => $profile->getLangue(),
            'niveau_francais' => $profile->getNiveauFrancais(),
            'niveau_anglais' => $profile->getNiveauAnglais(),
            'date_naissance' => $profile->getDateNaissance()?->format('Y-m-d'),
            'autres_langues' => $profile->getAutresLangues(),
            'experiences_academiques' => $profile->getExperiencesAcademiques(),
            'activites_extrascolaires' => $profile->getActivitesExtrascolaires(),
            'engagement_associatif' => $profile->getEngagementAssociatif(),
            'recompenses_distinctions' => $profile->getRecompensesDistinctions(),
        ];
    }
}
