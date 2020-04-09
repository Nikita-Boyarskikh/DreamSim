from django.db import models
from django_extensions.db.models import TimeStampedModel

from apps.authentication.models import User
from apps.realtime.models.chat import Chat
from apps.realtime.models.message_reader import MessageReader


class Message(TimeStampedModel):
    """Сообщение"""

    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, verbose_name='Чат')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='my_messages', blank=True, null=True,
                               verbose_name='Автор')
    text = models.TextField('Текст', max_length=1023)
    readers = models.ManyToManyField(User, through='MessageReader')

    def __str__(self):
        return f'User({self.author_id}): {self.text}'

    def is_read(self, user_id):
        if self.author_id == user_id:
            return True
        message_reader = MessageReader.objects.filter(message_id=self.id, reader_id=user_id).first()
        return message_reader.read if message_reader else False

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
