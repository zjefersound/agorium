FROM php:8.3-fpm-alpine

WORKDIR /var/www/

# Set timezone to America/Sao_Paulo
RUN apk add --no-cache tzdata && \
    ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    echo "America/Sao_Paulo" > /etc/timezone

# Install PHP extensions and necessary tools
RUN apk add --no-cache --update \
    php83-curl php83-mbstring php83-phar php83-openssl \
    php83-tokenizer php83-fileinfo php83-sockets \
    php83-mysqli php83-mysqlnd php83-pdo_mysql \
    curl git

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
