from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.authentication.validators import GroupValidator, VkLinkValidator


class User(AbstractUser):
    """Пользователь"""

    patronymic = models.CharField('Отчество', max_length=255, blank=True, null=True)
    group = models.CharField(
        'Учебная группа', max_length=30, blank=True, null=True, db_index=True, validators=[GroupValidator]
    )
    vk = models.URLField('Ссылка ВК', unique=True, blank=True, null=True, validators=[VkLinkValidator])
    birthday = models.DateField('Дата рождения', null=True, blank=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
