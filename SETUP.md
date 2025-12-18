# Configuration de l'environnement local

Pour développer localement, vous devez configurer votre fichier `.env.local`.

## Étapes de configuration

### 1. À la racine du projet (`/`)

```bash
cp .env.example .env
```

Puis éditez `.env` avec vos identifiants locaux.

### 2. Dans le dossier Backend (`/Backend`)

```bash
cp .env.example .env.local
```

Puis éditez `.env.local` avec vos secrets locaux :

- `APP_SECRET`: Clé secrète Symfony
- `DATABASE_URL`: URL de connexion à la base de données
- `JWT_PASSPHRASE`: Passphrase pour les clés JWT

### 3. Variables d'environnement requises

Le fichier `.env` à la racine doit contenir :

```env
DB_USER=usr          # Nom d'utilisateur MySQL
DB_PASSWORD=pwd         # Mot de passe MySQL
DB_NAME=harva            # Nom de la base de données
DB_ROOT_PASSWORD=pwd    # Mot de passe root MySQL
DB_VERSION=8.0           # Version MySQL
APP_ENV=dev              # Environnement
VITE_API_URL=http://localhost:8080/api  # URL de l'API
```

## ⚠️ Important

- **Ne commitez JAMAIS** les fichiers `.env` ou `.env.local`
- Ils sont ignorés par `.gitignore`
- Utilisez `.env.example` comme template

## Lancement des services

```bash
docker-compose up
```

Les variables d'environnement seront automatiquement chargées depuis le fichier `.env` à la racine.
