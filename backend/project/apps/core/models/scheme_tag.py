from django.db import models
from .tag import Tag
from .scheme import Scheme


class SchemeTag(models.Model):
    """Тег схемы"""

    tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE, name='ИД тега')
    scheme_id = models.ForeignKey(Scheme, on_delete=models.CASCADE, name='ИД схемы')

    class Meta:
        verbose_name = 'Тег схемы'
        verbose_name_plural = 'Теги схемы'
