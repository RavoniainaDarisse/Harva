<<<<<<< HEAD
#Creation bdd
php bin/console doctrine:database:create

php bin/console make:entity User

php bin/console make:migration
php bin/console doctrine:migrations:migrate

creation controller
php bin/console make:controller SwaggerController



## Installation et lancement

1- Créer un fichier ***.env*** et changer les information de la connexion à la base de donnée:

```bash
     DATABASE_URL="mysql://app:!ChangeMe!@127.0.0.1:3306/Harva?serverVersion=8.0.32&charset=utf8mb4"
     # DATABASE_URL="mysql://app:!ChangeMe!@127.0.0.1:3306/app?serverVersion=10.11.2-MariaDB&charset=utf8mb4"
     ###< doctrine/doctrine-bundle ###
```

2- Installer les dependances

```bash
     composer install
```

3- Créer la base de donnée

```bash
     symfony console doctrine:database:create
```

- ou

```bash
     php bin/console doctrine:database:create
```

4- Migration base de donnée

```bash
     symfony console d:s:u -f
```

5- Lancer le server

```bash
     symfony serve
```

6- Créer un compte admin via fixture

```bash
     symfony console doctrine:fixtures:load --append
```
=======
# Backend Symfony – Dockeriser
>>>>>>> 07e0312905c01f7bed2eb26492a993114388f729
