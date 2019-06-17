FROM node:8.12.0-alpine as build

MAINTAINER Nikita Boyarskikh <N02@yandex.ru>

ARG API_URL

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install

COPY . ./

ENV API_URL=${API_URL}
RUN npm run build

COPY public dist/

#====================

FROM nginx:1.15.5-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf

