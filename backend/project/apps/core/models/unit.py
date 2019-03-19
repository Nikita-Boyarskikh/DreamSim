from django.db import models


class Unit(models.Model):
    """Единица измерения"""

    name = models.CharField('Название единицы измерения', max_length=255)

    class Meta:
        verbose_name = 'Единица измерения'
        verbose_name_plural = 'Единицы измерения'
