#!/bin/sh
set -e

chown -R www-data:www-data /var/www/html

# attendre MySQL (optionnel)
until php -r "new PDO('mysql:host=database;dbname=${DB_NAME}', '${DB_USER}', '${DB_PASSWORD}');" 2>/dev/null; do
  echo "⏳ Waiting for MySQL..."
  sleep 2
done

# générer les clés JWT si besoin
if [ ! -f config/jwt/private.pem ] || [ ! -f config/jwt/public.pem ]; then
  echo "🔐 Generating JWT keys..."
  mkdir -p config/jwt
  openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096 -pass pass:${JWT_PASSPHRASE}
  openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout -passin pass:${JWT_PASSPHRASE}
  echo "✅ JWT keys generated"
fi

# lancer PHP-FPM sous www-data
exec php-fpm --allow-to-run-as-root
