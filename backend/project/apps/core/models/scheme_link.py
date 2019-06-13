from django.core.validators import MinValueValidator
from django.db import models
from lib.postgres.fields import ArrayField

from apps.core.validators import validate_input_pin, validate_output_pin
from .scheme_element import SchemeElement


class SchemeLink(models.Model):
    """Связи схемы"""

    input_scheme_element = models.ForeignKey(
        SchemeElement, on_delete=models.CASCADE, related_name='in_link', verbose_name='Входной элемент схемы'
    )
    output_scheme_element = models.ForeignKey(
        SchemeElement, on_delete=models.CASCADE, related_name='out_link', verbose_name='Выходной элемент схемы'
    )
    input_pin = models.IntegerField('Индекс входа на элементе', validators=[MinValueValidator(0)])
    output_pin = models.IntegerField('Индекс выхода на элементе', validators=[MinValueValidator(0)])
    coordinate_array = ArrayField(
        ArrayField(
            models.IntegerField(validators=[MinValueValidator(0)]),
            size=2
        ),
        blank=True,
        verbose_name='Координаты'
    )
    name = models.CharField('Название', max_length=255, blank=True, null=True)

    def clean(self):
        validate_input_pin(self)
        validate_output_pin(self)

    def __str__(self):
        input_element_str = f'{self.input_scheme_element.id}: {self.input_pin}'
        output_element_str = f'{self.output_scheme_element.id}: {self.output_pin}'
        link_str = f'{input_element_str} -> {output_element_str}'
        if self.name:
            return f'{self.name}({link_str})'
        return link_str

    class Meta:
        verbose_name = 'Связи схемы'
        verbose_name_plural = 'Связи схемы'
