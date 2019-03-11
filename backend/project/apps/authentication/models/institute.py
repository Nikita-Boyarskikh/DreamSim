from django.db import models


class Institute(models.Model):
    """ВУЗ"""

    name = models.CharField('Название ВУЗа', max_length=255)
    format_group = models.CharField('Формат названия группы', max_length=30, null=True)

    class Meta:
        verbose_name = 'ВУЗ'
        verbose_name_plural = 'ВУЗы'
