from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.authentication.validators import validate_vk_link
from .group import Group


class User(AbstractUser):
    """Пользователь"""

    patronymic = models.CharField('Отчество', max_length=255, blank=True, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name='Учебная группа', blank=True, null=True)
    vk = models.URLField('Ссылка ВК', unique=True, blank=True, null=True, validators=[validate_vk_link])
    birthday = models.DateField('Дата рождения', blank=True, null=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
