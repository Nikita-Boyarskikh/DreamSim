from django.contrib.postgres.validators import ArrayMinLengthValidator, ArrayMaxLengthValidator
from django.core.validators import MinValueValidator
from django.db import models
from lib.postgres.fields import ArrayField
from .scheme import Scheme
from .element import Element


class SchemeElement(models.Model):
    """Элемент Схемы"""

    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE, verbose_name='Схема')
    element = models.ForeignKey(Element, on_delete=models.CASCADE, verbose_name='Элемент')
    coordinates = ArrayField(
        models.IntegerField(validators=[MinValueValidator(0)]),
        validators=[ArrayMaxLengthValidator(2), ArrayMinLengthValidator(2)],
        verbose_name='Координаты'
    )
    name = models.CharField('Название', max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.name} (scheme={self.scheme.id} element={self.element.id})'

    class Meta:
        verbose_name = 'Элементы Схемы'
        verbose_name_plural = 'Элементы Схемы'
