# Suppress warnings about star import
from corsheaders.defaults import default_headers

from settings.base import *  # noqa: F403 pylint: disable=wildcard-import

DEBUG = True
DEBUG_PROPAGATE_EXCEPTIONS = True

SECRET_KEY = 'ou$!!y5#x=9q4i8%$=srd8s04lkf&69pk!f2_6qev+_ywief)0'

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '[::1]']
CORS_ORIGIN_WHITELIST = ALLOWED_HOSTS
CORS_EXPOSE_HEADERS = default_headers
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True

INSTALLED_APPS += [
    'django.contrib.staticfiles',
]

PASSWORD_MIN_LENGTH = None

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
MEDIA_PATH = os.path.join(TMP_DIR, 'media')

CELERY_TASK_ALWAYS_EAGER = True
