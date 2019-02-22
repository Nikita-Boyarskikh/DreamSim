FROM python:3.7

MAINTAINER Nikita Boyarskikh <N02@yandex.ru>

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        libpq-dev gettext supervisor && \
    service supervisor stop && \
    rm -rf /var/lib/apt/lists/* /var/cache/debconf && \
    apt-get clean

RUN pip3 install --upgrade \
    pip==19.0.2 \
    setuptools==40.8.0 \
	jinja2-cli==0.6.0

# Setting private PyPI repo
# COPY docker/base/pip.conf /etc/pip.conf

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/requirements.txt
RUN pip3 install -r requirements.txt

RUN mkdir /etc/app /var/log/app /var/run/app /usr/tmp

ENV LC_ALL=C.UTF-8 \
    LANG=C.UTF-8

