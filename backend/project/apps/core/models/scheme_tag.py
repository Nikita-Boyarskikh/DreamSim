from django.db import models
from .tag import Tag
from .scheme import Scheme


class SchemeTag(models.Model):
    """Тег схемы"""

    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, verbose_name='Тег')
    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE, verbose_name='Схема')

    def __str__(self):
        return f'{self.tag}(scheme={self.scheme.id})'

    class Meta:
        verbose_name = 'Тег схемы'
        verbose_name_plural = 'Теги схемы'
