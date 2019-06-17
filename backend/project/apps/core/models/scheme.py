from django.db import models
from django_extensions.db.models import TimeStampedModel

from apps.authentication.models import User
from .element import Element


class Scheme(TimeStampedModel):
    """Схема"""

    name = models.CharField('Название', max_length=255)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Создатель')
    formula = models.CharField('Формула', max_length=255, blank=True, null=True)
    elements = models.ManyToManyField(Element, 'schemes', through='SchemeElement')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Схема'
        verbose_name_plural = 'Схемы'
