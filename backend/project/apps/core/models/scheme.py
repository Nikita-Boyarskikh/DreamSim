from django.db import models
from apps.authentication.models import User


class Scheme(models.Model):
    """Схема"""

    name = models.CharField('Название схемы', max_length=255)
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE, name='Создатель схемы')
    formula = models.CharField('Формула', max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'Схема'
        verbose_name_plural = 'Схемы'
