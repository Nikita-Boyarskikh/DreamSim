from enum import Enum
from django.db import models
from .unit import Unit
from .element import Element


class DimensionChoice(Enum):
    m = 'м'
    u = 'мк'
    n = 'н'
    p = 'п'
    K = 'К'
    M = 'М'
    G = 'Г'
    T = 'Т'


class ElementParameter(models.Model):
    """Параметр Элемента"""

    element = models.ForeignKey(Element, on_delete=models.CASCADE, verbose_name='ИД Элемента')
    name = models.CharField('Название параметра', max_length=255)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, verbose_name='ИД единиц измерения')
    dimension = models.CharField('Размерность', max_length=30, choices=[(tag, tag.value) for tag in DimensionChoice])
    value = models.FloatField('Значение')

    class Meta:
        verbose_name = 'Параметр Элемента'
        verbose_name_plural = 'Параметры Элемента'
