from django.db import models


class Tag(models.Model):
    """Тег"""

    name = models.CharField('Имя тега', max_length=255)

    class Meta:
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'
