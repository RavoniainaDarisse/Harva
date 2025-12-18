<?php

namespace App\Tests\Controller;

use App\Entity\Profile;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Doctrine\ORM\EntityManagerInterface;

class ProfileControllerTest extends WebTestCase
{
    private EntityManagerInterface $entityManager;
    private string $token;

    protected function setUp(): void
    {
        self::bootKernel();
        $this->entityManager = self::getContainer()->get(EntityManagerInterface::class);

        // Créer un utilisateur de test
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setPassword(password_hash('password123', PASSWORD_BCRYPT));
        $user->setNom('Test');
        $user->setPrenom('User');

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        $this->entityManager->close();
    }

    public function testGetMyProfileWithoutAuthentication(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/profiles');

        $this->assertResponseStatusCodeSame(401);
        $this->assertJsonContains(['error' => 'Non authentifié']);
    }

    public function testCreateProfileWithRequiredFields(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/profiles', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'sexe' => 'M',
            'nationalite' => 'Français',
            'telephone' => '+33612345678',
            'niveau_etude_actuel' => 'Licence 3',
        ]));

        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains([
            'sexe' => 'M',
            'nationalite' => 'Français',
            'telephone' => '+33612345678',
        ]);
    }

    public function testCreateProfileWithoutRequiredFields(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/profiles', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'telephone' => '+33612345678',
        ]));

        $this->assertResponseStatusCodeSame(400);
    }

    public function testGetMyProfile(): void
    {
        $client = static::createClient();

        // D'abord créer un profil
        $client->request('POST', '/api/profiles', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'sexe' => 'F',
            'nationalite' => 'Française',
            'moyenne_generale' => '15.5',
        ]));

        // Ensuite récupérer le profil
        $client->request('GET', '/api/profiles', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
        ]);

        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains([
            'sexe' => 'F',
            'nationalite' => 'Française',
            'moyenne_generale' => '15.5',
        ]);
    }

    public function testUpdateProfileField(): void
    {
        $client = static::createClient();

        // Créer un profil
        $client->request('POST', '/api/profiles', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'sexe' => 'M',
            'nationalite' => 'Français',
        ]));

        $response = json_decode($client->getResponse()->getContent(), true);
        $profileId = $response['id'];

        // Mettre à jour un champ
        $client->request('PATCH', '/api/profiles/' . $profileId, [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'moyenne_generale' => '18.0',
            'niveau_francais' => 'Excellent',
        ]));

        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains([
            'moyenne_generale' => '18.0',
            'niveau_francais' => 'Excellent',
        ]);
    }

    public function testDeleteProfile(): void
    {
        $client = static::createClient();

        // Créer un profil
        $client->request('POST', '/api/profiles', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'sexe' => 'M',
            'nationalite' => 'Français',
        ]));

        $response = json_decode($client->getResponse()->getContent(), true);
        $profileId = $response['id'];

        // Supprimer le profil
        $client->request('DELETE', '/api/profiles/' . $profileId, [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
        ]);

        $this->assertResponseStatusCodeSame(204);
    }

    public function testGetNonExistentProfile(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/profiles/99999', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
        ]);

        $this->assertResponseStatusCodeSame(404);
        $this->assertJsonContains(['error' => 'Profil non trouvé']);
    }

    public function testCannotAccessOtherUserProfile(): void
    {
        $client = static::createClient();

        // Créer un second utilisateur
        $user2 = new User();
        $user2->setEmail('test2@example.com');
        $user2->setPassword(password_hash('password123', PASSWORD_BCRYPT));
        $user2->setNom('Test2');
        $user2->setPrenom('User2');

        $this->entityManager->persist($user2);
        $this->entityManager->flush();

        // Créer un profil pour user2
        $profile = new Profile();
        $profile->setUser($user2);
        $profile->setSexe('F');
        $profile->setNationalite('Française');

        $this->entityManager->persist($profile);
        $this->entityManager->flush();

        // Essayer d'accéder au profil de user2 avec le token de user1
        $client->request('GET', '/api/profiles/' . $profile->getId(), [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
        ]);

        $this->assertResponseStatusCodeSame(403);
        $this->assertJsonContains(['error' => 'Accès refusé']);
    }

    public function testCreateProfileWithCompleteData(): void
    {
        $client = static::createClient();

        $data = [
            'telephone' => '+33612345678',
            'sexe' => 'M',
            'nationalite' => 'Français',
            'ville_residence' => 'Paris',
            'parcours_academique' => 'Bac S',
            'niveau_etude_actuel' => 'Licence 3',
            'domaine_etude' => 'Informatique',
            'etablissement_actuel' => 'Université Paris-Dauphine',
            'moyenne_generale' => '14.5',
            'annee_diplome_prevue' => '2026',
            'langue' => 'Français',
            'niveau_francais' => 'Natif',
            'niveau_anglais' => 'Fluent (C1)',
            'date_naissance' => '2003-05-15',
            'autres_langues' => ['Espagnol', 'Allemand'],
            'experiences_academiques' => 'Stage chez XYZ',
            'activites_extrascolaires' => 'Tennis',
            'engagement_associatif' => 'Club informatique',
            'recompenses_distinctions' => ['Bourse excellente'],
        ];

        $client->request('POST', '/api/profiles', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getValidToken(),
            'CONTENT_TYPE' => 'application/json',
        ], json_encode($data));

        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains($data);
    }

    private function getValidToken(): string
    {
        // Récupérer le JWT pour l'utilisateur de test
        // Cette méthode dépend de votre implémentation d'authentification
        // Pour les tests, vous pouvez utiliser un token JWT valide ou créer un helper
        return 'test_token_here'; // À adapter selon votre système d'auth
    }
}
