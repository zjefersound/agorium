FROM nginx:stable-alpine

RUN apk add --no-cache --update openssl \
    && mkdir -p /var/www/api \
    && openssl req -newkey rsa:2048 -x509 -nodes -set_serial 1 -days 3650 \
       -subj "/C=US/ST=NY/L=NY" \
       -keyout "/etc/ssl/private/server.key" -out "/etc/ssl/private/server.crt" \
    && chmod 400 /etc/ssl/private/server.*