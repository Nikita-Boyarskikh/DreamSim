from django.db import models
from apps.authentication.models import Institute


class Group(models.Model):
    """Группа"""

    name = models.CharField('Название группы', max_length=255)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, name='ВУЗ')

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'
