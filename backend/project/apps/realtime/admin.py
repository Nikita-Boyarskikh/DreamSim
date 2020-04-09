from django.contrib import admin

from apps.realtime.models.chat import Chat
from apps.realtime.models.message import Message
from apps.realtime.models.message_reader import MessageReader

admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(MessageReader)
