from django.db import models
from apps.authentication.validators import validate_group_name
from .institute import Institute


class Group(models.Model):
    """Учебная группа"""

    name = models.CharField('Название', max_length=255)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, verbose_name='ВУЗ')

    def clean(self):
        validate_group_name(self)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Учебная группа'
        verbose_name_plural = 'Учебные группы'
