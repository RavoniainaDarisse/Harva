FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git unzip zip libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    gosu \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql intl zip gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Installer Node.js (si tu utilises Encore)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Installer Symfony CLI (optionnel)
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash && \
    apt-get install -y symfony-cli

WORKDIR /var/www/html
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
COPY docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf
RUN mkdir -p /var/log && touch /var/log/php-fpm.log && chown www-data:www-data /var/log/php-fpm.log
