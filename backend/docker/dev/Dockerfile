FROM dreamsim-base

MAINTAINER Nikita Boyarskikh <N02@yandex.ru>

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y enchant && \
    rm -rf /var/lib/apt/lists/* /var/cache/debconf && \
    apt-get clean

COPY requirements_dev.txt /usr/src/app/requirements_dev.txt
RUN pip3 install -r requirements_dev.txt

EXPOSE 8000

CMD python3 project/manage.py collectstatic --noinput && \
    python3 project/manage.py makemessages && \
    python3 project/manage.py compilemessages && \
    python3 project/manage.py makemigrations --noinput && \
    python3 project/manage.py migrate --noinput && \
    python3 project/manage.py runserver 0.0.0.0:8000

