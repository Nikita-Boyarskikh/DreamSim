from django.db import models
from apps.authentication.models import User
from .element import Element


class Scheme(models.Model):
    """Схема"""

    name = models.CharField('Название схемы', max_length=255)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Создатель схемы')
    formula = models.CharField('Формула', max_length=255, blank=True, null=True)
    elements = models.ManyToManyField(Element, 'schemes', through='SchemeElement')

    class Meta:
        verbose_name = 'Схема'
        verbose_name_plural = 'Схемы'
