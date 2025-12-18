#!/bin/bash

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

API_URL="http://localhost:8000"
EMAIL="test@harva.com"
PASSWORD="Test@12345"

echo -e "${BLUE}=== Test API JWT ===${NC}\n"

# 1. Test Login (get JWT token)
echo -e "${YELLOW}1. Tentative de connexion...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

echo "Réponse: $LOGIN_RESPONSE"
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}Erreur: Pas de token obtenu${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Token JWT obtenu: ${TOKEN:0:50}...${NC}\n"

# 2. Test Get My Profile
echo -e "${YELLOW}2. Récupération de mon profil...${NC}"
PROFILE=$(curl -s -X GET "$API_URL/api/profiles" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json")

echo "Réponse: $PROFILE"
echo -e "${GREEN}✓ Profil récupéré${NC}\n"

# 3. Test Create Profile
echo -e "${YELLOW}3. Création d'un profil...${NC}"
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/api/profiles" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sexe": "M",
    "nationalite": "Malgache",
    "telephone": "+261321234567",
    "ville_residence": "Antananarivo",
    "parcours_academique": "Lycée Victor Augagneur",
    "niveau_etude_actuel": "Licence",
    "domaine_etude": "Informatique",
    "etablissement_actuel": "Université d'\''Antananarivo",
    "moyenne_generale": 15.5,
    "annee_diplome_prevue": 2026,
    "langue": "Français"
  }')

echo "Réponse: $CREATE_RESPONSE"
PROFILE_ID=$(echo $CREATE_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo -e "${GREEN}✓ Profil créé avec ID: $PROFILE_ID${NC}\n"

# 4. Test Update Profile Field
if [ ! -z "$PROFILE_ID" ]; then
  echo -e "${YELLOW}4. Mise à jour d'un champ du profil...${NC}"
  UPDATE=$(curl -s -X PATCH "$API_URL/api/profiles/$PROFILE_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "moyenne_generale": 16.0
    }')
  
  echo "Réponse: $UPDATE"
  echo -e "${GREEN}✓ Profil mis à jour${NC}\n"

  # 5. Test Get Specific Profile
  echo -e "${YELLOW}5. Récupération du profil créé...${NC}"
  GET_ONE=$(curl -s -X GET "$API_URL/api/profiles/$PROFILE_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json")
  
  echo "Réponse: $GET_ONE"
  echo -e "${GREEN}✓ Profil récupéré${NC}\n"
fi

# 6. Test List All Profiles (may require ROLE_ADMIN)
echo -e "${YELLOW}6. Liste de tous les profils...${NC}"
LIST=$(curl -s -X GET "$API_URL/api/profiles/list/all" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json")

echo "Réponse: $LIST"
echo -e "${GREEN}✓ Liste des profils récupérée${NC}\n"

echo -e "${BLUE}=== Tests complétés ===${NC}"
