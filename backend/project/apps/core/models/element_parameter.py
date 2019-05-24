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

    element = models.ForeignKey(Element, on_delete=models.CASCADE, verbose_name='Элемент')
    name = models.CharField('Название', max_length=255)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, verbose_name='Единица измерения')
    dimension = models.CharField('Размерность', max_length=30, choices=[(tag, tag.value) for tag in DimensionChoice])
    value = models.FloatField('Значение')

    def __str__(self):
        return f'{self.element.name}({self.name})'

    class Meta:
        verbose_name = 'Параметр Элемента'
        verbose_name_plural = 'Параметры Элемента'
