from enum import Enum

from django.core.validators import MinValueValidator
from django.db import models
from lib.postgres.fields import JSONField, ArrayField
from apps.authentication.models import User
from apps.core.validators import validate_truth_table
from lib.models.validators import bin_validator, JSONArrayFieldValidator


class ElementType(Enum):
    SOURCE = 'Источник'
    GROUND = 'Земля'
    GENERATOR = 'Генератор'
    ANALYZER = 'Анализатор'
    AND = 'И'
    OR = 'ИЛИ'
    NOT = 'НЕ'
    XOR = 'Исключающее ИЛИ'
    NOR = 'ИЛИ-НЕ'
    NAND = 'И-НЕ'
    USER = 'Пользовательский'


class Element(models.Model):
    """Элемент"""

    name = models.CharField('Название', max_length=255)
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name='Создатель', blank=True, null=True)
    element_type = models.CharField('Тип', max_length=30, choices=[(tag.name, tag.value) for tag in ElementType])
    array_of_inputs = ArrayField(models.CharField(max_length=255), blank=True, verbose_name='Массив имён входов')
    array_of_outputs = ArrayField(models.CharField(max_length=255), verbose_name='Массив имён выходов')
    time = models.IntegerField('Время работы', default=0, validators=[MinValueValidator(0)])
    delay = models.IntegerField('Время задержки', default=0, validators=[MinValueValidator(0)])
    image = models.ImageField('Изображение', blank=True, null=True)
    truth_table = JSONField(
        'Временная дискретизация таблицы истинности',
        validators=[JSONArrayFieldValidator(field_validator=bin_validator, dimension=3)]
    )

    def clean(self):
        validate_truth_table(self)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Элемент'
        verbose_name_plural = 'Элементы'
