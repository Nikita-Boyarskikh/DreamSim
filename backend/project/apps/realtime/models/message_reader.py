from django.db import models
from django_extensions.db.models import TimeStampedModel

from apps.authentication.models import User


class MessageReader(TimeStampedModel):
    """Читатели сообщений"""

    reader = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Читатель')
    message = models.ForeignKey('Message', on_delete=models.CASCADE, verbose_name='Сообщение')
    read = models.BooleanField('Read', default=False)

    def __str__(self):
        read = 'read' if self.read else 'unread'
        return f'User({self.reader_id}) {read} Message({self.message_id})'

    class Meta:
        verbose_name = 'Читатель сообщения'
        verbose_name_plural = 'Читатели сообщений'
