# Use PHP 8.3 FPM based on Alpine Linux
FROM php:8.3-fpm-alpine

WORKDIR /var/www/

# Set timezone to America/Sao_Paulo
RUN apk add --no-cache tzdata && \
    ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    echo "America/Sao_Paulo" > /etc/timezone

# Install PHP extensions and necessary tools
RUN apk add --no-cache --update \
    curl git libpng-dev libjpeg-turbo-dev freetype-dev \
    libzip-dev oniguruma-dev bash \
    mariadb-connector-c-dev # MySQL client

# Install PHP extensions including PDO and PDO_MYSQL
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the php.ini configuration
COPY php/php.ini /usr/local/etc/php/php.ini

# Copy the project files
COPY . /var/www

# Set up proper permissions
RUN chown -R www-data:www-data /var/www

# Expose port 80
EXPOSE 80

# Set up entrypoint to use PHP's built-in server with a router
CMD ["php", "-S", "0.0.0.0:80", "-t", "/var/www", "/var/www/router.php"]
