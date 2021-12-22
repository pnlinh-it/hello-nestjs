FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build


FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

RUN set -ex; \
    \
    apk add --no-cache supervisor \
        nginx \
    ;\
    rm -rf /tmp/*; rm -rf /var/cache/apk/*; rm -rf /tmp/pear ~/.pearrc ;\
    ln -sf /dev/stdout /var/log/nginx/access.log ;\
    ln -sf /dev/stderr /var/log/nginx/error.log

# Suppervisor configuration
COPY ./docker/supervisor/supervisord.prod.conf /etc/supervisord.conf
COPY ./docker/supervisor/supervisor.d /etc/supervisor.d

# Nginx configuration
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["supervisord", "-n", "-c", "/etc/supervisord.conf"]
