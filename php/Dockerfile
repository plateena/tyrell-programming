# Dockerfile for CakePHP with Nginx and PHP-FPM
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install required extensions and tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        wget \
        unzip \
        git \
        libzip-dev \
        libonig-dev \
        libicu-dev \
        ca-certificates \
        sqlite3 \
        && docker-php-ext-install pdo_mysql zip intl \
        && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN wget -O composer-setup.php --show-progress=on https://getcomposer.org/installer && \
    php composer-setup.php --quiet --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php

# Copy CakePHP application files into the container
COPY ./api /var/www/html

# Install CakePHP dependencies
RUN composer install --no-plugins --no-scripts

# Adjust file permissions
RUN chown -R www-data:www-data /var/www/html && \
    find /var/www/html -type d -exec chmod 777 {} \; && \
    find /var/www/html -type f -exec chmod 777 {} \; && \
    chmod -R 777 /var/www/html/logs /var/www/html/tmp && \
    chmod -R 777 /var/www/html/tmp/cache

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm", "-F"]
