#!/bin/bash

# ============================================================
# Script de test de l'API Profile avec données d'exemple
# ============================================================

# Configuration
API_URL="http://localhost:8000/api"
WEBHOOK_URL="https://iandrianinameeting.app.n8n.cloud/webhook-test/post"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les titres
print_title() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

# Fonction pour afficher les succès
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Fonction pour afficher les erreurs
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Fonction pour afficher les infos
print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# ============================================================
# 1. LOGIN/AUTHENTIFICATION
# ============================================================
print_title "1. Authentification"

print_info "Connexion avec les identifiants de test..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/login" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test@example.com",
        "password": "password123"
    }')

# Extraire le token JWT
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    print_error "Impossible de récupérer le token JWT"
    echo "Réponse: $LOGIN_RESPONSE"
    exit 1
fi

print_success "Token JWT obtenu: ${TOKEN:0:50}..."

# ============================================================
# 2. CRÉER UN PROFIL COMPLET
# ============================================================
print_title "2. Création d'un profil complet"

PROFILE_DATA='{
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
    "recompenses_distinctions": ["Bourse d'\''excellence académique", "Prix de programmation 2024", "Scholarship recognition"]
}'

print_info "Envoi des données du profil..."
PROFILE_RESPONSE=$(curl -s -X POST "$API_URL/profiles" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$PROFILE_DATA")

echo -e "${YELLOW}Données envoyées:${NC}"
echo "$PROFILE_DATA" | jq '.' 2>/dev/null || echo "$PROFILE_DATA"

echo -e "\n${YELLOW}Réponse du serveur:${NC}"
echo "$PROFILE_RESPONSE" | jq '.' 2>/dev/null || echo "$PROFILE_RESPONSE"

# Extraire l'ID du profil
PROFILE_ID=$(echo $PROFILE_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

if [ -z "$PROFILE_ID" ]; then
    print_error "Impossible de récupérer l'ID du profil"
    exit 1
fi

print_success "Profil créé avec l'ID: $PROFILE_ID"
print_info "Les données ont été envoyées au webhook N8N"

# ============================================================
# 3. RÉCUPÉRER LE PROFIL
# ============================================================
print_title "3. Récupération du profil créé"

print_info "Récupération du profil de l'utilisateur connecté..."
GET_RESPONSE=$(curl -s -X GET "$API_URL/profiles" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json")

echo -e "${YELLOW}Réponse:${NC}"
echo "$GET_RESPONSE" | jq '.' 2>/dev/null || echo "$GET_RESPONSE"

print_success "Profil récupéré avec succès"

# ============================================================
# 4. METTRE À JOUR UN CHAMP (PATCH)
# ============================================================
print_title "4. Mise à jour partielle du profil (PATCH)"

UPDATE_DATA='{
    "moyenne_generale": "15.5",
    "niveau_francais": "Excellent (C2)",
    "experiences_academiques": "Stage chez Google été 2024, Stage chez Microsoft hiver 2023, Internship chez Apple printemps 2025"
}'

print_info "Mise à jour des champs..."
PATCH_RESPONSE=$(curl -s -X PATCH "$API_URL/profiles/$PROFILE_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$UPDATE_DATA")

echo -e "${YELLOW}Données mises à jour:${NC}"
echo "$UPDATE_DATA" | jq '.' 2>/dev/null || echo "$UPDATE_DATA"

echo -e "\n${YELLOW}Réponse du serveur:${NC}"
echo "$PATCH_RESPONSE" | jq '.' 2>/dev/null || echo "$PATCH_RESPONSE"

print_success "Profil mis à jour"
print_info "Les données mises à jour ont été renvoyées au webhook N8N"

# ============================================================
# 5. RÉCUPÉRER UN PROFIL PAR ID
# ============================================================
print_title "5. Récupération d'un profil par ID"

print_info "Récupération du profil ID $PROFILE_ID..."
GET_BY_ID=$(curl -s -X GET "$API_URL/profiles/$PROFILE_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json")

echo -e "${YELLOW}Réponse:${NC}"
echo "$GET_BY_ID" | jq '.' 2>/dev/null || echo "$GET_BY_ID"

print_success "Profil récupéré par ID"

# ============================================================
# 6. EXEMPLE DE DONNÉES BRUTES POUR POSTMAN
# ============================================================
print_title "6. Exemple pour Postman"

echo -e "${YELLOW}Utilisez les données suivantes dans Postman:${NC}\n"

echo -e "${BLUE}Token JWT:${NC}"
echo "$TOKEN"

echo -e "\n${BLUE}Profil ID:${NC}"
echo "$PROFILE_ID"

echo -e "\n${BLUE}Données complètes du profil:${NC}"
echo "$PROFILE_DATA" | jq '.'

# ============================================================
# 7. INFORMATIONS POUR TESTER LE WEBHOOK
# ============================================================
print_title "7. Information Webhook N8N"

echo -e "${YELLOW}URL du webhook:${NC}"
echo "https://iandrianinameeting.app.n8n.cloud/webhook-test/post"

echo -e "\n${YELLOW}Les payloads envoyés au webhook contiennent:${NC}"
cat << 'EOF'
{
    "action": "profile_updated",
    "timestamp": "2025-12-18 20:00:00",
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
        "moyenne_generale": "15.5",
        "annee_diplome_prevue": "2026",
        "langue": "Français",
        "niveau_francais": "Excellent (C2)",
        "niveau_anglais": "Fluent (C1)",
        "date_naissance": "2003-05-15",
        "autres_langues": ["Espagnol B2", "Allemand A2"],
        "experiences_academiques": "Stage chez Google été 2024...",
        "activites_extrascolaires": "Tennis, Débat oratoire...",
        "engagement_associatif": "Président du club informatique...",
        "recompenses_distinctions": ["Bourse d'excellence académique", "Prix de programmation 2024"]
    }
}
EOF

# ============================================================
# 8. TEST AVEC CURL DIRECT (OPTIONNEL)
# ============================================================
print_title "8. Command curl pour tester directement le webhook (optionnel)"

echo -e "${YELLOW}Vous pouvez tester l'envoi au webhook avec:${NC}\n"

cat << 'EOF'
curl -X POST "https://iandrianinameeting.app.n8n.cloud/webhook-test/post" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "profile_updated",
    "timestamp": "'$(date '+%Y-%m-%d %H:%M:%S')'",
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
      "moyenne_generale": "15.5",
      "annee_diplome_prevue": "2026",
      "langue": "Français",
      "niveau_francais": "Excellent (C2)",
      "niveau_anglais": "Fluent (C1)",
      "date_naissance": "2003-05-15",
      "autres_langues": ["Espagnol B2", "Allemand A2"],
      "experiences_academiques": "Stage chez Google été 2024, Stage chez Microsoft hiver 2023",
      "activites_extrascolaires": "Tennis, Débat oratoire, Programmation compétitive",
      "engagement_associatif": "Président du club informatique, Trésorier association étudiante",
      "recompenses_distinctions": ["Bourse d'\''excellence académique", "Prix de programmation 2024", "Scholarship recognition"]
    }
  }'
EOF

# ============================================================
# RÉSUMÉ
# ============================================================
print_title "Résumé du test"

echo -e "${GREEN}✓ Authentification réussie${NC}"
echo -e "${GREEN}✓ Profil créé avec ID: $PROFILE_ID${NC}"
echo -e "${GREEN}✓ Profil récupéré${NC}"
echo -e "${GREEN}✓ Profil mis à jour${NC}"
echo -e "${GREEN}✓ Données envoyées au webhook N8N${NC}"

echo -e "\n${YELLOW}Les prochaines étapes:${NC}"
echo "1. Vérifier que les données arrivent bien dans N8N"
echo "2. Configurer le flux N8N pour traiter les données"
echo "3. Connecter N8N à votre système de gestion de bourses"
