# Use a lighter Alpine-based image with PHP
FROM alpine

# Set working directory
WORKDIR /var/www/

# Set timezone to America/Sao_Paulo (UTC-3)
RUN ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo "America/Sao_Paulo" > /etc/timezone

# Install production dependencies
RUN apk add --no-cache --update \
    php php83 \
    php83-curl php83-mbstring php83-phar php83-openssl \
    php83-tokenizer php83-fileinfo php83-sockets \
    php83-mysqli php83-mysqlnd php83-pdo_mysql \
    curl git

# Install Composer (for PHP package management)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the PHP configuration file (ensure this file is production-ready)
COPY php/php.ini /etc/php83/php.ini

# Set a non-root user (optional for security)
RUN addgroup -g 1000 app && \
    adduser -D -s /bin/bash -G app -u 1000 app

# Switch to the non-root user
USER app
EXPOSE 80

# Command to run your PHP app (e.g., start a PHP built-in server or your app entrypoint)
CMD ["php", "-S", "0.0.0.0:80", "-t", "/var/www/"]
