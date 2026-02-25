# Build stage - Construir dependencias y extensiones
FROM php:8.4.2-fpm-alpine AS builder

WORKDIR /app

# Instalar dependencias del sistema requeridas para compilar extensiones
RUN apk add --no-cache git unzip libpq-dev libzip-dev oniguruma-dev \
    && docker-php-ext-install pdo pdo_pgsql zip bcmath mbstring

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 1. Copiar solo los archivos de dependencias para aprovechar la caché de Docker
COPY back/principal/composer.json back/principal/composer.lock* ./

# 2. Instalar dependencias SIN el autoloader (el código de la app aún no está aquí)
RUN composer install --no-dev --no-scripts --no-autoloader

# 3. Copiar el código fuente de la aplicación
COPY back/principal/ ./

# 4. Generar el autoloader optimizado ahora que el código está presente
RUN composer dump-autoload --optimize

# Production stage - Imagen final ligera
FROM php:8.4.2-fpm-alpine

WORKDIR /app

# Instalar SOLO librerías en tiempo de ejecución (sin dependencias de compilación)
RUN apk add --no-cache libpq libzip liboniguruma

# Copiar las extensiones de PHP ya compiladas desde la etapa builder
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/

# Copiar configuración PHP optimizada (Sintaxis Heredoc corregida)
COPY <<EOF /usr/local/etc/php/conf.d/app.ini
memory_limit=256M
max_execution_time=30
upload_max_filesize=20M
post_max_size=20M
expose_php=Off
EOF

# Copiar aplicación completa (código + vendor) desde el builder
COPY --from=builder /app /app

# Crear directorios necesarios con permisos adecuados
RUN mkdir -p storage/logs bootstrap/cache \
    && chown -R www-data:www-data /app \
    && chmod -R 755 storage bootstrap/cache

USER www-data

EXPOSE 9000

CMD ["php-fpm"]
