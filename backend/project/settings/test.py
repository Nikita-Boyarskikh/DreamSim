# Suppress warnings about star import
from settings.base import *  # noqa: F403 pylint: disable=wildcard-import
from settings.dev import *  # noqa: F403 pylint: disable=wildcard-import

ALLOWED_HOSTS = ['*']

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

CACHES = {}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer'
    }
}
