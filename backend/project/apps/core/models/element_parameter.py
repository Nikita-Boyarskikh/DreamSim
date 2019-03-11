from django.db import models
from .unit import Unit


class ElementParameter(models.Model):
    """Параметр Элемента"""

    # element_id = models.AutoField('ИД Элемента', primary_key=True, max_length=255)
    name = models.CharField('Название параметра', max_length=255)
    unit_id = models.ForeignKey(Unit, on_delete=models.CASCADE, name='ИД единиц измерения')
    dimension_id = models.CharField('Размерность', max_length=30)
    value = models.IntegerField('Значение')

    class Meta:
        verbose_name = 'Параметр Элемента'
        verbose_name_plural = 'Параметры Элемента'
