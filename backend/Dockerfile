FROM alpine

WORKDIR /var/www/

RUN ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo "America/Sao_Paulo" > /etc/timezone

RUN apk add --no-cache --update \
    php php83 \
    php83-curl php83-mbstring php83-phar php83-openssl \
    php83-tokenizer php83-fileinfo php83-sockets \
    php83-mysqli php83-mysqlnd php83-pdo_mysql \
    curl git

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY php/php.ini /etc/php83/php.ini

# Remove or comment out this line
# USER app

EXPOSE 80

CMD ["php", "-S", "0.0.0.0:80", "-t", "/var/www/"]
