from django.db import models

from apps.core.models import Scheme


class Chat(models.Model):
    """Чат"""

    scheme = models.OneToOneField(Scheme, related_name='chat', primary_key=True, on_delete=models.CASCADE,
                                  verbose_name='Схема')

    def __str__(self):
        return self.scheme

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'
