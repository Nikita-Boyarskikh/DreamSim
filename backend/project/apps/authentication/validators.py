from urllib.parse import urlparse
from django.db import models
from django.core.exceptions import ValidationError


def validate_vk_link(link):
    url = urlparse(link)
    if url.netloc != 'vk.com' or len(url.path) <= 1:
        raise ValidationError('Ссылка должна вести на профиль vk.com')


class GroupValidator(models.Model):
    pass
