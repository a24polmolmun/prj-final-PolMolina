FROM php:8.4.2-alpine

WORKDIR /app

# Instalar dependencias del sistema mínimas necesarias para Laravel
RUN apk add --no-cache \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    linux-headers

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo pdo_pgsql zip bcmath mbstring

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY back/principal/composer.json back/principal/composer.lock* ./

RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY back/principal/ ./

RUN composer run-script post-autoload-dump

CMD ["sh", "-c", "php artisan storage:link || true && php artisan serve --host=0.0.0.0 --port=8000"]
EXPOSE 8000
