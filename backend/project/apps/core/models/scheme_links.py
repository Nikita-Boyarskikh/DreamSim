from django.db import models
from django.contrib.postgres.fields import ArrayField
from .scheme_element import SchemeElement


class SchemeLinks(models.Model):
    """Связи схемы"""

    input_scheme_element = models.ForeignKey(
        SchemeElement, on_delete=models.CASCADE, related_name='in_link', verbose_name='ИД ЛЭ схемы входа'
    )
    output_scheme_element = models.ForeignKey(
        SchemeElement, on_delete=models.CASCADE, related_name='out_link', verbose_name='ИД ЛЭ схемы выхода'
    )
    input_number = models.IntegerField('Номер входа на элементе')
    output_number = models.IntegerField('Номер выхода на элементе')
    coordinate_array = ArrayField(ArrayField(models.IntegerField('Массив координат')))
    name = models.CharField('Название', max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'Связи схемы'
        verbose_name_plural = 'Связи схемы'
