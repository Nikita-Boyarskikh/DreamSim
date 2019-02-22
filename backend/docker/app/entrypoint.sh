#!/bin/bash -e
SRC=/usr/src/app/docker
ETC=/etc/app
TEMPLATES=${SRC}/app/templates

mkdir -p /var/log/app/nginx
mkdir -p /var/log/app/supervisord
mkdir -p /var/run/app/supervisord
mkdir -p /var/log/app/gunicorn
mkdir -p /var/run/app/gunicorn

echo "Rendering ${ETC}/nginx.conf..."
jinja2 --strict ${TEMPLATES}/nginx.conf.j2 > ${ETC}/nginx.conf

echo "Rendering ${ETC}/supervisord.conf..."
jinja2 --strict ${TEMPLATES}/supervisord.conf.j2 > ${ETC}/supervisord.conf

echo "Rendering ${ETC}/gunicorn.conf.py..."
cp ${TEMPLATES}/gunicorn.conf.py ${ETC}/gunicorn.conf.py

echo "Rendering ${ETC}/logging.json..."
# jinja2 --strict ${SRC}/base/templates/logging.json.j2 > ${ETC}/logging.json

echo "Running migrations..."
python3 project/manage.py migrate --noinput

echo "Checking deploy ready..."
python3 project/manage.py check --deploy

echo "Running command: $@"
exec "$@"
