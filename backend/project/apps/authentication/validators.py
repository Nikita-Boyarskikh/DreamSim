import re
from urllib.parse import urlparse
from django.core.exceptions import ValidationError


def validate_vk_link(link):
    url = urlparse(link)
    if url.netloc != 'vk.com' or len(url.path) <= 1:
        raise ValidationError('Ссылка должна вести на профиль vk.com')


def validate_group_name(model):
    if not re.match(model.institute.format_group, model.name):
        raise ValidationError('Неверный формат имени группы')
