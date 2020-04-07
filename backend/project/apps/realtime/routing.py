from django.conf.urls import url

from apps.realtime.consumers.chat import ChatConsumer

routes = [
    url(r'^ws/chat/(?P<chat_id>\d+)/$', ChatConsumer),
]
