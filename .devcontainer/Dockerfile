FROM alpine

WORKDIR /var/www/

RUN ln -snf /usr/share/zoneinfo/UTC /etc/localtime && echo UTC > /etc/timezone

RUN apk add --no-cache --update \ 
    make curl git bash sudo screen \
    nodejs npm \
    php php83 \
    php83-curl php83-mbstring php83-phar php83-openssl \
    php83-tokenizer php83-fileinfo php83-sockets \
    php83-mysqli php83-mysqlnd php83-pdo_mysql \
    php83-pecl-xdebug

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN addgroup -g 1337 vscode && \
    adduser -D -s /bin/bash -G vscode -u 1337 vscode && \
    echo "vscode ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/vscode && \
    chmod 0440 /etc/sudoers.d/vscode

COPY php/php.ini /etc/php83/php.ini