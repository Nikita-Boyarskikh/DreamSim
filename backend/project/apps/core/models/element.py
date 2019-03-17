from django.db import models
from django.contrib.postgres.fields import ArrayField
from apps.authentication.models import User
from enum import Enum


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
    """Логический Элемент"""

    name = models.CharField('Название ЛЭ', max_length=255)
    creator_id = models.ForeignKey(User, on_delete=models.SET_NULL, name='Создатель ЛЭ', blank=True, null=True)
    element_type = models.CharField(
        'Тип элемента', max_length=30, choices=[(tag, tag.value) for tag in TypeChoice]
    )  #источник, земля, генератор, анализатор, И, ИЛИ, НЕ, др.
    array_of_inputs = ArrayField(models.CharField('Массив имён входов', max_length=255))
    array_of_outputs = ArrayField(models.CharField('Массив имён выходов', max_length=255))
    time = models.IntegerField('Время работы', default=0)
    delay = models.IntegerField('Время задержки', default=0)
    image = models.ImageField('Изображение ЛЭ', blank=True, null=True)

    class Meta:
        verbose_name = 'Логический Элемент'
        verbose_name_plural = 'Логические Элементы'
