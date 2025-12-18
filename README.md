# Harva – React + Symfony – Docker

Monorepo full-stack :

- `Automatique/` → React (Vite)
- `Backend/` → Symfony 6/7 (API + JWT)
- `docker-compose.yml` unique à la racine

---

## Prérequis

- Docker ≥ 20.10
- Docker Compose (plugin `docker compose`)
- Ports **5173** (React) et **8080** (Symfony) libres

---

## 1. Installation

```bash
git clone git@github.com:RavoniainaDarisse/Harva.git
cd Harva
```

Copie l'env de la racine :

```bash
cp .env.example .env
```

Copie l’env Symfony (si besoin) :

```bash
cp Backend/.env.example Backend/.env
# remplir APP_SECRET, JWT_PASSPHRASE, etc.
```

---

## 2. Lancer la stack

**Avant de lancer le projet verifier d'abord les informations pour la connexion à la base de données dans ***docker/php/entrypoint.sh***, ***compose.yaml*** et dans ***.env*****

```bash
docker compose up -d --build
```

Premier démarrage :

- Installe les deps React
- Génère les clés JWT
- Crée la base `harva`

---

## 3. Base de données

```bash
docker compose exec backend php bin/console doctrine:database:create --if-not-exists
docker compose exec backend php bin/console doctrine:migrations:migrate
```

---

## 4. Accès

| Service | URL |
|---------|-----|
| React (Vite dev) | <http://localhost:5173> |
| Symfony API | <http://localhost:8080/doc> |
| MySQL | `database:3306` (interne) |

---

## 5. Commandes utiles

```bash
# Console Symfony
docker compose exec backend php bin/console make:entity

# Installer un package côté front
docker compose exec frontend npm i axios

# Logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx
```

---

## 6. Arrêt / nettoyage

```bash
docker compose down            # stop
docker compose down -v         # + suppression BDD
```

---

## 7. Build de prod (quand tu seras prêt)

```bash
docker compose -f compose.prod.yml up -d --build
```

> Un `compose.prod.yml` est prévu pour servir le build Vite statique + image PHP-FPM optimisée.

---

## 8. Problèmes fréquents

| Erreur | Solution |
|--------|----------|
| `Port 8080 déjà utilisé` | édite `docker-compose.yml`, change en `8081:80` |
| `localhost:5173 ne charge pas` | vérifie que `Automatique/` contient bien `vite.config.js` avec `host: '0.0.0.0'` |
| `File not found` côté Symfony | re-vérifie que `./Backend/public` est bien monté dans le volume nginx |

---

Happy coding ! 🚀
# Harva
