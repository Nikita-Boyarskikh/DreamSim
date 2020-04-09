# Suppress warnings about star import
from settings.base import *  # noqa: F403 pylint: disable=wildcard-import
from settings.dev import *  # noqa: F403 pylint: disable=wildcard-import

DEBUG_PROPAGATE_EXCEPTIONS = False

ALLOWED_HOSTS = ['*']

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer'
    }
}
