FROM postgres:11.2-alpine

MAINTAINER Nikita Boyarskikh <N02@yandex.ru>

RUN apk update && \
    apk add --no-cache py3-pip && \
    pip3 install jinja2-cli

RUN mkdir -p /usr/src/app

COPY ./docker/postgres/templates /usr/src/app/
COPY ./docker/postgres/init/* /docker-entrypoint-initdb.d/
