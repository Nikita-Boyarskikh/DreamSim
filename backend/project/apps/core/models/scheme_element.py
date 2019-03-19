from django.db import models
from django.contrib.postgres.fields import ArrayField
from .scheme import Scheme
from .element import Element


class SchemeElement(models.Model):
    """Элемент Схемы"""

    id_scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE, name='ИД схемы')
    id_element = models.ForeignKey(Element, on_delete=models.CASCADE, name='ИД элемента')
    coordinates = ArrayField(models.IntegerField('Координаты'))
    name = models.CharField('Название ЛЭ', max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'Элементы Схемы'
        verbose_name_plural = 'Элементы Схемы'
