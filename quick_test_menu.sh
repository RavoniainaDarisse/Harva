#!/bin/bash

# =================================================================
# QUICK TEST COMMANDS - API Profil + Webhook N8N
# =================================================================

# Configuration
API_URL="http://localhost:8000/api"
WEBHOOK_URL="https://iandrianinameeting.app.n8n.cloud/webhook-test/post"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         HARVA API PROFIL - COMMANDES RAPIDES          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}\n"

# Menu
PS3=$'Choisir une action:\n> '
options=(
    "1. Tester Création de Profil"
    "2. Tester Récupération de Profil"
    "3. Tester Mise à Jour (PATCH)"
    "4. Tester Suppression"
    "5. Tester Accès Admin (Lister tous)"
    "6. Envoyer Test au Webhook N8N"
    "7. Afficher Données d'Exemple"
    "8. Générer Token JWT"
    "9. Quitter"
)

select opt in "${options[@]}"
do
    case $REPLY in
        1)
            echo -e "\n${YELLOW}📝 Création de Profil${NC}\n"
            read -p "Token JWT: " TOKEN
            curl -X POST "$API_URL/profiles" \
              -H "Authorization: Bearer $TOKEN" \
              -H "Content-Type: application/json" \
              -d '{
                "sexe": "M",
                "nationalite": "Français",
                "telephone": "+33612345678",
                "niveau_etude_actuel": "Licence 3",
                "domaine_etude": "Informatique",
                "moyenne_generale": "14.5",
                "niveau_francais": "Natif",
                "niveau_anglais": "Fluent (C1)",
                "etablissement_actuel": "Université Paris-Dauphine",
                "annee_diplome_prevue": "2026"
              }' | jq '.'
            echo -e "\n${GREEN}✓ Profil créé et données envoyées au webhook N8N!${NC}\n"
            ;;
        2)
            echo -e "\n${YELLOW}📖 Récupération de Profil${NC}\n"
            read -p "Token JWT: " TOKEN
            curl -X GET "$API_URL/profiles" \
              -H "Authorization: Bearer $TOKEN" | jq '.'
            ;;
        3)
            echo -e "\n${YELLOW}✏️  Mise à Jour de Profil${NC}\n"
            read -p "Token JWT: " TOKEN
            read -p "ID Profil: " PROFILE_ID
            curl -X PATCH "$API_URL/profiles/$PROFILE_ID" \
              -H "Authorization: Bearer $TOKEN" \
              -H "Content-Type: application/json" \
              -d '{
                "moyenne_generale": "15.5",
                "niveau_francais": "Excellent (C2)"
              }' | jq '.'
            echo -e "\n${GREEN}✓ Profil mis à jour et données renvoyées au webhook N8N!${NC}\n"
            ;;
        4)
            echo -e "\n${YELLOW}🗑️  Suppression de Profil${NC}\n"
            read -p "Token JWT: " TOKEN
            read -p "ID Profil: " PROFILE_ID
            curl -X DELETE "$API_URL/profiles/$PROFILE_ID" \
              -H "Authorization: Bearer $TOKEN"
            echo -e "\n${GREEN}✓ Profil supprimé!${NC}\n"
            ;;
        5)
            echo -e "\n${YELLOW}👨‍💼 Lister Tous les Profils (Admin)${NC}\n"
            read -p "Token Admin JWT: " TOKEN
            curl -X GET "$API_URL/profiles/list/all" \
              -H "Authorization: Bearer $TOKEN" | jq '.'
            ;;
        6)
            echo -e "\n${YELLOW}🔗 Envoyer Test au Webhook N8N${NC}\n"
            curl -X POST "$WEBHOOK_URL" \
              -H "Content-Type: application/json" \
              -d '{
                "action": "profile_updated",
                "timestamp": "'$(date '+%Y-%m-%d %H:%M:%S')'",
                "user": {
                  "id": 999,
                  "email": "test@harva.com",
                  "nom": "TestDupont",
                  "prenom": "TestJean"
                },
                "profile": {
                  "id": 999,
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
                  "recompenses_distinctions": ["Bourse d'\''excellence académique"]
                }
              }' | jq '.'
            echo -e "\n${GREEN}✓ Test envoyé au webhook N8N!${NC}\n"
            echo -e "${YELLOW}Accédez à: https://iandrianinameeting.app.n8n.cloud${NC}\n"
            ;;
        7)
            echo -e "\n${YELLOW}📊 Données d'Exemple${NC}\n"
            cat << 'EOF'

🔹 PROFIL MINIMAL (Requis)
{
  "sexe": "M",
  "nationalite": "Français"
}

🔹 PROFIL STANDARD
{
  "telephone": "+33612345678",
  "sexe": "M",
  "nationalite": "Français",
  "niveau_etude_actuel": "Licence 3",
  "domaine_etude": "Informatique",
  "moyenne_generale": "14.5"
}

🔹 PROFIL COMPLET
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

Voir PROFILE_API_TEST_DATA.json pour plus d'exemples

EOF
            ;;
        8)
            echo -e "\n${YELLOW}🔐 Générer Token JWT${NC}\n"
            read -p "Email: " EMAIL
            read -sp "Mot de passe: " PASSWORD
            echo ""
            curl -s -X POST "$API_URL/login" \
              -H "Content-Type: application/json" \
              -d "{
                \"email\": \"$EMAIL\",
                \"password\": \"$PASSWORD\"
              }" | jq '.'
            echo -e "\n${GREEN}✓ Token généré!${NC}\n"
            echo -e "${YELLOW}Copiez le token et utilisez-le dans Authorization: Bearer <token>${NC}\n"
            ;;
        9)
            echo -e "\n${GREEN}Au revoir! 👋${NC}\n"
            break
            ;;
        *)
            echo -e "\n${YELLOW}Option invalide${NC}\n"
            ;;
    esac
done
