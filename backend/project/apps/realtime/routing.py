# Suppress warning 'Constant name doesn't conform to UPPER_CASE naming style'
# pylint: disable=invalid-name
from django.conf.urls import url

from apps.realtime.consumers.chat import ChatConsumer
from apps.realtime.consumers.pointertracker import PointerTrackerConsumer

routes = [
    url(r'^ws/chat/(?P<chat_pk>\d+)/$', ChatConsumer),
    url(r'^ws/pointer-tracker/(?P<scheme_pk>\d+)/$', PointerTrackerConsumer),
]
