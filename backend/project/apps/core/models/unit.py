from django.db import models


class Unit(models.Model):
    """Единица измерения"""

    name = models.CharField('Название', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Единица измерения'
        verbose_name_plural = 'Единицы измерения'
