# 📚 Guide Complet - API Profil + Webhook N8N

## 🎯 Vue d'ensemble

Cette API permet de gérer les profils utilisateurs avec intégration automatique au webhook N8N pour le traitement des données de candidature.

### Flux de données
```
Client → API Profil → BD Profil → Webhook N8N → Traitement N8N
```

---

## 🚀 Démarrage Rapide

### 1. Démarrer les services
```bash
cd /media/ari/Nouveau\ nom1/Hackathon\ decembre\ 2025/Harva
docker compose up -d
```

### 2. Exécuter le script de test
```bash
bash test_profile_api.sh
```

---

## 📖 API Endpoints

### Authentication
**POST** `/api/login`
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```
**Réponse:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### Profil - Créer/Mettre à jour
**POST/PUT** `/api/profiles`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body (Minimum required):**
```json
{
  "sexe": "M",
  "nationalite": "Français"
}
```

**Body (Complet):**
```json
{
  "telephone": "+33612345678",
  "sexe": "M",
  "nationalite": "Français",
  "ville_residence": "Paris",
  "parcours_academique": "Baccalauréat Scientifique 2020",
  "niveau_etude_actuel": "Licence 3",
  "domaine_etude": "Informatique",
  "etablissement_actuel": "Université Paris-Dauphine",
  "moyenne_generale": "14.5",
  "annee_diplome_prevue": "2026",
  "langue": "Français",
  "niveau_francais": "Natif",
  "niveau_anglais": "Fluent (C1)",
  "date_naissance": "2003-05-15",
  "autres_langues": ["Espagnol B2", "Allemand A2"],
  "experiences_academiques": "Stage chez Google été 2024, Stage chez Microsoft hiver 2023",
  "activites_extrascolaires": "Tennis, Débat oratoire, Programmation compétitive",
  "engagement_associatif": "Président du club informatique, Trésorier association étudiante",
  "recompenses_distinctions": ["Bourse d'excellence académique", "Prix de programmation 2024"]
}
```

**Réponse (201 Created):**
```json
{
  "id": 1,
  "telephone": "+33612345678",
  "sexe": "M",
  "nationalite": "Français",
  ...
}
```

**À ce moment, les données sont envoyées au webhook N8N! ✨**

---

### Profil - Récupérer le sien
**GET** `/api/profiles`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Réponse (200 OK):**
```json
{
  "id": 1,
  "telephone": "+33612345678",
  "sexe": "M",
  ...
}
```

---

### Profil - Mettre à jour partiellement
**PATCH** `/api/profiles/{id}`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body (Seulement les champs à modifier):**
```json
{
  "moyenne_generale": "15.5",
  "niveau_francais": "Excellent (C2)"
}
```

**À ce moment, les données mises à jour sont renvoyées au webhook N8N! ✨**

---

### Profil - Récupérer par ID
**GET** `/api/profiles/{id}`

**Réponse (200 OK):**
```json
{
  "id": 1,
  ...
}
```

---

### Profil - Supprimer
**DELETE** `/api/profiles/{id}`

**Réponse (204 No Content)**

---

### Profils - Lister tous (Admin)
**GET** `/api/profiles/list/all`

**Réponse (200 OK):**
```json
[
  { "id": 1, ... },
  { "id": 2, ... }
]
```

---

## 🔗 Webhook N8N

### URL
```
https://iandrianinameeting.app.n8n.cloud/webhook-test/post
```

### Payload envoyé

Chaque fois qu'un profil est créé ou mis à jour, le serveur envoie automatiquement:

```json
{
  "action": "profile_updated",
  "timestamp": "2025-12-18 20:15:30",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "nom": "Dupont",
    "prenom": "Jean"
  },
  "profile": {
    "id": 1,
    "telephone": "+33612345678",
    "sexe": "M",
    "nationalite": "Français",
    "ville_residence": "Paris",
    "parcours_academique": "Baccalauréat Scientifique 2020",
    "niveau_etude_actuel": "Licence 3",
    "domaine_etude": "Informatique",
    "etablissement_actuel": "Université Paris-Dauphine",
    "moyenne_generale": "14.5",
    "annee_diplome_prevue": "2026",
    "langue": "Français",
    "niveau_francais": "Natif",
    "niveau_anglais": "Fluent (C1)",
    "date_naissance": "2003-05-15",
    "autres_langues": ["Espagnol B2", "Allemand A2"],
    "experiences_academiques": "Stage chez Google été 2024, Stage chez Microsoft hiver 2023",
    "activites_extrascolaires": "Tennis, Débat oratoire, Programmation compétitive",
    "engagement_associatif": "Président du club informatique, Trésorier association étudiante",
    "recompenses_distinctions": ["Bourse d'excellence académique", "Prix de programmation 2024"]
  }
}
```

---

## 📋 Données de Test

### Test Minimale
```bash
curl -X POST http://localhost:8000/api/profiles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sexe": "F",
    "nationalite": "Française"
  }'
```

### Test Standard
```bash
curl -X POST http://localhost:8000/api/profiles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telephone": "+33612345678",
    "sexe": "M",
    "nationalite": "Français",
    "niveau_etude_actuel": "Licence 3",
    "domaine_etude": "Informatique",
    "moyenne_generale": "14.5",
    "niveau_francais": "Natif",
    "niveau_anglais": "Fluent (C1)"
  }'
```

### Test Complet
Voir `PROFILE_API_TEST_DATA.json` pour tous les exemples

---

## 🧪 Tester avec Postman

1. Importez `Harva_Profile_API.postman_collection.json` dans Postman
2. Configurez les variables:
   - `{{token}}` - Votre JWT token
   - `{{admin_token}}` - Un token admin (optionnel)
3. Utilisez les requêtes pré-configurées

---

## 📊 Codes de Réponse

| Code | Signification |
|------|---------------|
| 200 | OK - Succès |
| 201 | Created - Ressource créée |
| 204 | No Content - Suppression réussie |
| 400 | Bad Request - Données invalides |
| 401 | Unauthorized - Non authentifié |
| 403 | Forbidden - Accès refusé |
| 404 | Not Found - Ressource non trouvée |

---

## 🔐 Sécurité

- ✅ Authentification JWT requise sur tous les endpoints
- ✅ Utilisateurs ne peuvent modifier que leur propre profil
- ✅ Administrateurs peuvent voir tous les profils
- ✅ HTTPS sur le webhook N8N
- ✅ Validation des données côté serveur

---

## 🛠️ Dépannage

### Erreur 401 Unauthorized
❌ Token JWT absent ou invalide
✅ Vérifiez que le token est inclus dans les headers

### Erreur 403 Forbidden
❌ Vous tentez d'accéder au profil d'un autre utilisateur
✅ Utilisez les endpoints appropriés (GET /api/profiles sans ID)

### Erreur 404 Not Found
❌ Le profil n'existe pas
✅ Créez d'abord un profil via POST

### Webhook ne reçoit pas les données
❌ Vérifiez que le webhook URL est correct
✅ Vérifiez la connexion réseau
✅ Regardez les logs du serveur: `docker compose logs backend`

---

## 📝 Exemple Complet - Flux Utilisateur

### 1. Inscription
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidate@example.com",
    "password": "secure123",
    "nom": "Martin",
    "prenom": "Sophie"
  }'
```

### 2. Connexion
```bash
TOKEN=$(curl -s -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidate@example.com",
    "password": "secure123"
  }' | jq -r '.token')
```

### 3. Créer Profil
```bash
curl -X POST http://localhost:8000/api/profiles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sexe": "F",
    "nationalite": "Française",
    "telephone": "+33612345678",
    "niveau_etude_actuel": "Master 2",
    "domaine_etude": "Informatique",
    "moyenne_generale": "16.5"
  }'
```

✨ **Les données sont maintenant dans N8N!**

### 4. Consulter N8N
- Allez sur votre dashboard N8N
- Vérifiez que les données arrivent au webhook
- Configurez votre flux de traitement

---

## 🔄 Intégration N8N

### Exemple de flux N8N

1. **Trigger:** Webhook POST
2. **Action 1:** Parser les données JSON
3. **Action 2:** Valider les critères d'éligibilité
4. **Action 3:** Envoyer email de confirmation
5. **Action 4:** Sauvegarder dans base de données
6. **Action 5:** Créer tâche suivi

---

## 📞 Support

Pour des questions:
1. Vérifiez la documentation: `API_PROFILE_DOCUMENTATION.md`
2. Consultez les exemples: `PROFILE_API_TEST_DATA.json`
3. Regardez les logs: `docker compose logs backend`

---

**Version:** 1.0  
**Dernière mise à jour:** 18 décembre 2025
