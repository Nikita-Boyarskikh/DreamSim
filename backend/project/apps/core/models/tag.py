from django.db import models


class Tag(models.Model):
    """Тег"""

    name = models.CharField('Название', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'
