# Flux d'Intégration API Profil + Webhook N8N

## 📊 Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT (Frontend / Mobile)                    │
└────────────────────────┬────────────────────────────────────────┘
                         │ JWT Token
                         │
                    ┌────▼────┐
                    │ Login   │
                    └────┬────┘
                         │ Token
                    ┌────▼────────────────────┐
                    │ API Profil (Symfony)   │
                    │ ─────────────────────  │
                    │ POST /api/profiles     │
                    │ GET  /api/profiles     │
                    │ PATCH /api/profiles/{id}
                    │ DELETE /api/profiles/{id}
                    └────┬─────────────────┬─┘
                         │                 │
                    ┌────▼─────┐    ┌─────▼──────────┐
                    │  Database │    │ HttpClient     │
                    │  (MySQL)  │    │ (Async)        │
                    └──────────┘    └─────┬──────────┘
                                          │ POST JSON
                                   ┌──────▼──────────────┐
                                   │ N8N Webhook URL    │
                                   │ ─────────────────  │
                                   │ webhook-test/post  │
                                   └──────┬──────────────┘
                                          │
                    ┌─────────────────────┴──────────────────┐
                    │      N8N Automation Workflow          │
                    │ ────────────────────────────────────  │
                    │ • Parser JSON                         │
                    │ • Validater Éligibilité              │
                    │ • Envoyer Emails                     │
                    │ • Sauvegarder DB N8N               │
                    │ • Créer Tâches Suivi                │
                    └───────────────────────────────────────┘
```

---

## 🔄 Flux Détaillé - Création de Profil

### 1️⃣ Client envoie requête POST

```
┌──────────────────────────────────┐
│  CLIENT (Frontend)               │
├──────────────────────────────────┤
│ POST /api/profiles               │
│ Authorization: Bearer {JWT}      │
│                                  │
│ Body:                            │
│ {                                │
│   "sexe": "M",                   │
│   "nationalite": "Français",     │
│   "telephone": "+33612...",      │
│   "domaine_etude": "Informatique",
│   "moyenne_generale": "14.5"     │
│ }                                │
└──────┬───────────────────────────┘
       │
       ▼
```

### 2️⃣ Serveur Symfony traite la requête

```
┌──────────────────────────────────────────────┐
│  SYMFONY SERVER                              │
├──────────────────────────────────────────────┤
│ ProfileController::createOrUpdateProfile()  │
│                                              │
│ ✓ Vérifier JWT Token                        │
│ ✓ Parser JSON Body                          │
│ ✓ Valider Données                           │
│ ✓ Créer/Mettre à jour Profil en DB         │
│ ✓ Sérialiser Réponse                        │
└──────┬───────────────────────────────────────┘
       │
       ▼
```

### 3️⃣ Envoyer au Webhook N8N (en parallèle)

```
┌────────────────────────────────────────────────┐
│  ASYNC WEBHOOK CALL                            │
├────────────────────────────────────────────────┤
│ $httpClient->request('POST',                  │
│   'https://iandrianinameeting.app.n8n.cloud/ │
│   webhook-test/post',                        │
│   [                                            │
│     'json' => $payload,                       │
│     'headers' => [                            │
│       'Content-Type' => 'application/json'   │
│     ]                                         │
│   ]                                           │
│ )                                             │
└──────┬───────────────────────────────────────┘
       │
       ▼
```

### 4️⃣ Retourner réponse au client

```
┌─────────────────────────────────────────┐
│  RESPONSE (201 Created)                 │
├─────────────────────────────────────────┤
│ {                                       │
│   "id": 1,                              │
│   "sexe": "M",                          │
│   "nationalite": "Français",            │
│   "telephone": "+33612345678",          │
│   "domaine_etude": "Informatique",      │
│   "moyenne_generale": "14.5",           │
│   "date_creation": "2025-12-18 20:15"  │
│ }                                       │
└─────────────────────────────────────────┘
```

### 5️⃣ N8N reçoit et traite les données

```
┌────────────────────────────────────────────────────┐
│  N8N WORKFLOW EXECUTION                            │
├────────────────────────────────────────────────────┤
│                                                    │
│  [Webhook Trigger]                                │
│          │                                         │
│          ▼                                         │
│  [Parse JSON] ──► Valider structure             │
│          │                                         │
│          ▼                                         │
│  [Check Eligibility]                             │
│          │                                         │
│    ┌─────┴─────┐                                  │
│    ▼           ▼                                   │
│  [Send Email] [Log Entry]                        │
│    │           │                                   │
│    ▼           ▼                                   │
│  [Webhook Out] [DB Save]                         │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 📦 Payload du Webhook

### Envoyé depuis le serveur vers N8N

```json
{
  "action": "profile_updated",
  "timestamp": "2025-12-18 20:15:30",
  "user": {
    "id": 1,
    "email": "jean.dupont@example.com",
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
    "experiences_academiques": "Stage chez Google été 2024",
    "activites_extrascolaires": "Tennis, Débat oratoire",
    "engagement_associatif": "Président du club informatique",
    "recompenses_distinctions": ["Bourse d'excellence académique"]
  }
}
```

---

## 🔀 Flux pour Mise à Jour (PATCH)

```
[CLIENT]
   │ PATCH /api/profiles/1
   │ {"moyenne_generale": "15.5"}
   │
   ▼
[SERVER]
   │ ✓ Vérifier permissions
   │ ✓ Mettre à jour BD
   │ ✓ Envoyer au webhook
   │
   ▼
[N8N]
   │ ✓ Recevoir données
   │ ✓ Traiter mise à jour
   │
   ▼
[RESPONSE 200]
   {"id": 1, "moyenne_generale": "15.5", ...}
```

---

## 🗑️ Flux pour Suppression (DELETE)

```
[CLIENT]
   │ DELETE /api/profiles/1
   │
   ▼
[SERVER]
   │ ✓ Vérifier permissions
   │ ✓ Supprimer BD
   │ [NO WEBHOOK CALL]
   │
   ▼
[RESPONSE 204]
   (No Content)
```

---

## 🔐 Sécurité du Flux

### 1️⃣ Authentication Layer

```
┌─────────────────────────────────┐
│  JWT Token Validation           │
├─────────────────────────────────┤
│ • Extrait du header Authorization
│ • Vérifié par Symfony Security  │
│ • Associé à un User Object     │
└─────────────────────────────────┘
```

### 2️⃣ Authorization Layer

```
┌──────────────────────────────────────┐
│  Permission Check                    │
├──────────────────────────────────────┤
│ GET /api/profiles                    │
│ └─ Utilisateur voit SON profil     │
│                                      │
│ PATCH /api/profiles/{id}             │
│ └─ Doit être propriétaire du profil │
│                                      │
│ GET /api/profiles/list/all           │
│ └─ Admin seulement (ROLE_ADMIN)     │
└──────────────────────────────────────┘
```

### 3️⃣ Data Validation Layer

```
┌──────────────────────────────────────┐
│  Symfony Validator                   │
├──────────────────────────────────────┤
│ • Valide types (string, int, etc)   │
│ • Vérifie champs obligatoires        │
│ • Valide formats (email, date)      │
│ • Retourne 400 Bad Request si erreur │
└──────────────────────────────────────┘
```

---

## ⚡ Performance

### Optimisations mises en place

```
┌────────────────────────────────────┐
│  Request Processing                │
├────────────────────────────────────┤
│ 1. Parse JSON              → ~1ms  │
│ 2. Validate Data           → ~2ms  │
│ 3. Database Query          → ~5ms  │
│ 4. Serialize Response      → ~1ms  │
│                ─────────────────   │
│ Total Sync Time            → ~9ms  │
│                                    │
│ 5. ASYNC: Send to Webhook → Async │
│    (Doesn't block response)        │
│                                    │
│ Total Response Time        → ~10ms │
└────────────────────────────────────┘
```

---

## 🛠️ Gestion d'Erreurs

### Scénarios possibles

```
┌──────────────────────────────────────┐
│  CLIENT REQUEST                      │
└──────────────────────────────────────┘
         │
    ┌────┴──────────────────┐
    │                       │
    ▼                       ▼
┌─────────────┐      ┌──────────────┐
│  Valid      │      │  Invalid     │
└─────┬───────┘      └──────┬───────┘
      │                     │
      ▼                     ▼
┌─────────────────┐  ┌─────────────────┐
│ Process & Save  │  │ Return 400      │
│ Send Webhook    │  │ Error Message   │
└─────┬───────────┘  └─────────────────┘
      │
  ┌───┴────────┐
  │            │
  ▼            ▼
Success      Error in Webhook
│            │
▼            ▼
200/201      Logged but
Response     doesn't affect
             Response
```

---

## 📊 Cas d'Usage

### Use Case 1: Candidature Bourse

```
Étudiant → Crée Profil → N8N Reçoit Données
                             ↓
                    Vérifie Éligibilité
                             ↓
                    Éligible ? ─────┐
                        ↓           │
                   YES ▼            ▼ NO
                   │              │
        Envoie Email      Envoie Notification
        d'Acceptation     de Rejet
```

### Use Case 2: Pipeline de Recrutement

```
Candidat → Profil → N8N
                     ↓
              Ajoute à CRM
                     ↓
              Envoie au Manager
                     ↓
              Crée Interview Task
                     ↓
              Notification Calendrier
```

### Use Case 3: Analytics & Reporting

```
Profil Créé/Mis à jour → N8N
                         ↓
                  Insère dans BI
                         ↓
                  Update Dashboards
                         ↓
                  Statistiques en temps réel
```

---

## 📝 Logs & Monitoring

### Logs disponibles

```bash
# Voir les requêtes du serveur
docker compose logs -f backend

# Voir N8N webhook receptions
# (Accédez à N8N dashboard)

# Voir les erreurs d'intégration
docker compose logs backend | grep -i "webhook\|error"
```

---

## 🎯 Résumé

| Étape | Action | Durée | Async |
|-------|--------|-------|-------|
| 1 | Recevoir requête | 1ms | ✗ |
| 2 | Valider données | 2ms | ✗ |
| 3 | Sauvegarder BD | 5ms | ✗ |
| 4 | Envoyer webhook | 2s | ✅ |
| 5 | Retourner réponse | 10ms | ✗ |

**L'utilisateur reçoit sa réponse immédiatement, N8N traite les données en arrière-plan! 🚀**

---

**Version:** 1.0
**Créé:** 18 décembre 2025
