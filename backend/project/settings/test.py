# Suppress warnings about star import
from settings.base import *  # noqa: F403 pylint: disable=wildcard-import
from settings.dev import *  # noqa: F403 pylint: disable=wildcard-import

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]
