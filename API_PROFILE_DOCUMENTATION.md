# API CRUD du Profil Utilisateur - Documentation Complète

## 📋 Vue d'ensemble

Cette API fournit des endpoints CRUD complets pour gérer les profils utilisateurs dans l'application Harva. Chaque utilisateur peut créer et gérer son profil avec des informations académiques, linguistiques et personnelles détaillées.

## 🔐 Authentification

Tous les endpoints requirent une authentification JWT. Le token doit être envoyé dans le header `Authorization` :

```
Authorization: Bearer <your_jwt_token>
```

## 📍 Endpoints

### 1. **GET /api/profiles** - Récupérer le profil de l'utilisateur connecté

Récupère le profil de l'utilisateur actuellement authentifié.

**Authentification:** Requise (Bearer Token)

**Réponse Réussie (200 OK):**
```json
{
  "id": 1,
  "telephone": "+33612345678",
  "sexe": "M",
  "nationalite": "Français",
  "ville_residence": "Paris",
  "parcours_academique": "Baccalauréat Scientifique",
  "niveau_etude_actuel": "Licence 3",
  "domaine_etude": "Informatique",
  "etablissement_actuel": "Université Paris-Dauphine",
  "moyenne_generale": "14.5",
  "annee_diplome_prevue": "2026",
  "langue": "Français",
  "niveau_francais": "Natif",
  "niveau_anglais": "Fluent (C1)",
  "date_naissance": "2003-05-15",
  "autres_langues": ["Espagnol", "Allemand"],
  "experiences_academiques": "Stage chez XYZ en 2024",
  "activites_extrascolaires": "Tennis, Débat",
  "engagement_associatif": "Président du club informatique",
  "recompenses_distinctions": ["Bourse d'excellence", "Prix de l'excellence"]
}
```

**Erreurs Possibles:**
- `401 Unauthorized` - Non authentifié
- `404 Not Found` - Profil non trouvé

---

### 2. **POST /api/profiles** - Créer un nouveau profil

Crée un nouveau profil pour l'utilisateur connecté ou le met à jour s'il existe déjà.

**Authentification:** Requise (Bearer Token)

**Corps de la requête:**
```json
{
  "telephone": "+33612345678",
  "sexe": "M",
  "nationalite": "Français",
  "ville_residence": "Paris",
  "parcours_academique": "Baccalauréat Scientifique",
  "niveau_etude_actuel": "Licence 3",
  "domaine_etude": "Informatique",
  "etablissement_actuel": "Université Paris-Dauphine",
  "moyenne_generale": "14.5",
  "annee_diplome_prevue": "2026",
  "langue": "Français",
  "niveau_francais": "Natif",
  "niveau_anglais": "Fluent (C1)",
  "date_naissance": "2003-05-15",
  "autres_langues": ["Espagnol", "Allemand"],
  "experiences_academiques": "Stage chez XYZ en 2024",
  "activites_extrascolaires": "Tennis, Débat",
  "engagement_associatif": "Président du club informatique",
  "recompenses_distinctions": ["Bourse d'excellence", "Prix de l'excellence"]
}
```

**Champs Obligatoires:**
- `sexe` (string) - Valeurs acceptées: "M", "F", "Autre"
- `nationalite` (string)

**Champs Optionnels:**
- Tous les autres champs sont facultatifs
- `date_naissance` - Format: "YYYY-MM-DD"
- `autres_langues` - Array de strings
- `recompenses_distinctions` - Array de strings

**Réponse Réussie (201 Created):**
Retourne le profil créé avec l'ID généré.

**Erreurs Possibles:**
- `400 Bad Request` - Données invalides ou mal formatées
- `401 Unauthorized` - Non authentifié

---

### 3. **PATCH /api/profiles/{id}** - Mettre à jour un champ du profil

Met à jour un ou plusieurs champs spécifiques du profil.

**Authentification:** Requise (Bearer Token)

**Paramètres:**
- `id` (integer, path) - ID du profil à mettre à jour

**Corps de la requête:**
```json
{
  "niveau_francais": "Excellent (C2)",
  "moyenne_generale": "15.0"
}
```

Vous pouvez envoyer n'importe quel sous-ensemble de champs à mettre à jour.

**Réponse Réussie (200 OK):**
Retourne le profil complet après la mise à jour.

**Erreurs Possibles:**
- `400 Bad Request` - Données invalides
- `401 Unauthorized` - Non authentifié
- `403 Forbidden` - Vous ne pouvez modifier que votre propre profil
- `404 Not Found` - Profil non trouvé

---

### 4. **GET /api/profiles/{id}** - Récupérer un profil spécifique

Récupère les détails d'un profil particulier. Les utilisateurs normaux ne peuvent voir que leur propre profil, tandis que les admins peuvent voir tous les profils.

**Authentification:** Requise (Bearer Token)

**Paramètres:**
- `id` (integer, path) - ID du profil

**Réponse Réussie (200 OK):**
Retourne les détails du profil.

**Erreurs Possibles:**
- `401 Unauthorized` - Non authentifié
- `403 Forbidden` - Accès refusé
- `404 Not Found` - Profil non trouvé

---

### 5. **DELETE /api/profiles/{id}** - Supprimer un profil

Supprime complètement un profil utilisateur.

**Authentification:** Requise (Bearer Token)

**Paramètres:**
- `id` (integer, path) - ID du profil à supprimer

**Réponse Réussie (204 No Content):**
Aucun corps de réponse.

**Erreurs Possibles:**
- `401 Unauthorized` - Non authentifié
- `403 Forbidden` - Vous ne pouvez supprimer que votre propre profil
- `404 Not Found` - Profil non trouvé

---

### 6. **GET /api/profiles/list/all** - Récupérer tous les profils

Liste tous les profils de la base de données. **Réservé aux administrateurs.**

**Authentification:** Requise (Bearer Token avec rôle ROLE_ADMIN)

**Réponse Réussie (200 OK):**
```json
[
  {
    "id": 1,
    "telephone": "+33612345678",
    "sexe": "M",
    ...
  },
  {
    "id": 2,
    "telephone": "+33698765432",
    "sexe": "F",
    ...
  }
]
```

**Erreurs Possibles:**
- `401 Unauthorized` - Non authentifié
- `403 Forbidden` - Accès administrateur requis

---

## 🧪 Exemples d'Utilisation

### Créer un profil avec cURL

```bash
curl -X POST http://localhost:8000/api/profiles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sexe": "M",
    "nationalite": "Français",
    "telephone": "+33612345678",
    "niveau_etude_actuel": "Licence 3",
    "domaine_etude": "Informatique",
    "moyenne_generale": "14.5"
  }'
```

### Récupérer son profil

```bash
curl -X GET http://localhost:8000/api/profiles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Mettre à jour un champ

```bash
curl -X PATCH http://localhost:8000/api/profiles/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "moyenne_generale": "15.5",
    "niveau_francais": "Excellent"
  }'
```

### Supprimer un profil

```bash
curl -X DELETE http://localhost:8000/api/profiles/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📊 Structure de Réponse

### Réussite
```json
{
  "id": 1,
  "telephone": "+33612345678",
  ...
}
```

### Erreur
```json
{
  "error": "Message d'erreur descriptif"
}
```

Ou pour les erreurs de validation :
```json
{
  "errors": {
    "field_name": "Message d'erreur pour ce champ",
    "another_field": "Message d'erreur"
  }
}
```

---

## 🔒 Contrôle d'Accès

- **GET /api/profiles** - Utilisateur connecté peut voir son propre profil
- **POST/PUT /api/profiles** - Utilisateur connecté crée/met à jour son profil
- **GET /api/profiles/{id}** - Utilisateur connecté peut voir son profil ou admin peut voir tous
- **PATCH /api/profiles/{id}** - Utilisateur connecté peut modifier son profil
- **DELETE /api/profiles/{id}** - Utilisateur connecté peut supprimer son profil
- **GET /api/profiles/list/all** - Administrateurs uniquement

---

## 🛠️ Configuration des Valeurs Énumérées

### Sexe
- `M` - Masculin
- `F` - Féminin
- `Autre` - Autre

### Niveaux de Langue
- `Débutant (A1)`
- `Élémentaire (A2)`
- `Intermédiaire (B1)`
- `Intermédiaire supérieur (B2)`
- `Avancé (C1)`
- `Fluent (C1+)`
- `Excellent (C2)`
- `Natif`

---

## 📝 Validations

Les validations suivantes sont appliquées :

- `sexe` - Requis
- `nationalite` - Requis
- `telephone` - Format téléphone optionnel
- `date_naissance` - Format date valide (YYYY-MM-DD)
- `autres_langues` - Array de strings
- `recompenses_distinctions` - Array de strings

---

## 🔄 Cycle de Vie du Profil

1. **Création** - L'utilisateur crée un profil via POST /api/profiles
2. **Lecture** - L'utilisateur peut récupérer son profil à tout moment
3. **Mise à jour** - L'utilisateur peut mettre à jour son profil partiellement (PATCH) ou complètement (PUT)
4. **Suppression** - L'utilisateur peut supprimer son profil

---

## 🚀 Guide d'Intégration Frontend

### React/JavaScript

```javascript
// Récupérer le profil
async function getProfile(token) {
  const response = await fetch('/api/profiles', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}

// Créer un profil
async function createProfile(data, token) {
  const response = await fetch('/api/profiles', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Mettre à jour un champ
async function updateProfileField(profileId, updates, token) {
  const response = await fetch(`/api/profiles/${profileId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
}
```

---

## 📌 Notes Importantes

- Un utilisateur ne peut gérer que **son propre profil**
- Les administrateurs peuvent consulter tous les profils
- Les données sont validées côté serveur
- Les réponses d'erreur incluent des messages descriptifs
- Les dates doivent être au format ISO 8601 (YYYY-MM-DD)
- Les arrays (langues, récompenses) sont stockés comme JSON

---

## 🔄 Mise à Jour Documentaire

Dernière mise à jour: 18 décembre 2025
API Version: 1.0
