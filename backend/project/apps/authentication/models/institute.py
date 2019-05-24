from django.db import models


class Institute(models.Model):
    """ВУЗ"""

    name = models.CharField('Название', max_length=255)
    format_group = models.CharField('Формат названия учебной группы', max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'ВУЗ'
        verbose_name_plural = 'ВУЗы'
