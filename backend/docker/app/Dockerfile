FROM dreamsim-base

MAINTAINER Nikita Boyarskikh <N02@yandex.ru>

RUN apt-get update && \
    apt-get install -y nginx supervisor && \
    service supervisor stop && \
    rm -rf /var/lib/apt/lists/* /var/cache/debconf && \
    apt-get clean

RUN pip3 install gunicorn==19.9.0

COPY . /usr/src/app

RUN python3 project/manage.py collectstatic --noinput && \
    python3 project/manage.py makemessages && \
    python3 project/manage.py compilemessages

EXPOSE 80

ENTRYPOINT ["./docker/app/entrypoint.sh"]
CMD ["supervisord", "-c", "/etc/app/supervisord.conf"]
