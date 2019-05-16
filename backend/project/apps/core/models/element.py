from enum import Enum
from django.db import models
from django.contrib.postgres.fields import ArrayField
from apps.authentication.models import User


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

    name = models.CharField('Название ЛЭ', max_length=255)
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, verbose_name='Создатель ЛЭ', blank=True, null=True)
    element_type = models.CharField(
        'Тип элемента', max_length=30, choices=[(tag.name, tag.value) for tag in ElementType]
    )
    array_of_inputs = ArrayField(models.CharField('Массив имён входов', max_length=255))
    array_of_outputs = ArrayField(models.CharField(max_length=255), verbose_name='Массив имён выходов')
    time = models.IntegerField('Время работы', default=0)
    delay = models.IntegerField('Время задержки', default=0)
    image = models.ImageField('Изображение ЛЭ', blank=True, null=True)
    truth_table = ArrayField(
        ArrayField(
            ArrayField(
                models.IntegerField('Ложь/Истина', choices=[(0, 'Ложь'), (1, 'Истина')])
            ),
            verbose_name='Таблица истинности'
        ),
        verbose_name='Ось времени'
    )

    class Meta:
        verbose_name = 'Элемент'
        verbose_name_plural = 'Элементы'
