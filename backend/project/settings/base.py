import os

# Suppress warnings about import from package and about star import
from locales.default.formats import *  # noqa: F401,F403 pylint: disable=wildcard-import

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TMP_DIR = os.path.join(os.path.dirname(BASE_DIR), 'tmp')
REDIS_HOST = os.environ.get('REDISHOST') or '127.0.0.1'
REDIS_PORT = os.environ.get('REDISPORT') or 6379
REDIS_URL = f'redis://{REDIS_HOST}:{REDIS_PORT}'
DOMAIN_NAME = 'drsim.ru'
PG_CONN_MAX_AGE = 10

SITE_ID = 1

APPEND_SLASH = True
PREPEND_WWW = False

TIME_ZONE = 'UTC'
USE_TZ = True

SECRET_KEY = 'ou$!!y5#x=9q4i8%$=srd8s04lkf&69pk!f2_6qev+_ywief)0'

ABSOLUTE_URL_OVERRIDES = {}

INSTALLED_APPS = [
    # Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.sites',

    # Third party
    'rest_framework',
    'channels',

    # authentication
    'rest_framework.authtoken',
    'rest_auth',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.vk',

    'django_filters',
    'corsheaders',

    # health checks
    'health_check',
    'health_check.db',
    'health_check.cache',
    'health_check.storage',
    'health_check.contrib.celery',

    # Project
    'apps.core',
    'apps.authentication',
    'apps.realtime',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware', 'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware', 'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware', 'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware', 'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'lib.middlewares.request_exception.RequestExceptionHandler'
]

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_HTTPONLY = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('PGDATABASE') or 'dreamsim',
        'USER': os.environ.get('PGUSER') or 'dreamsim',
        'PASSWORD': os.environ.get('PGPASSWORD') or 'dreamsim',
        'HOST': os.environ.get('PGHOST') or 'localhost',
        'PORT': os.environ.get('PGPORT') or 5432,
        'CONN_MAX_AGE': PG_CONN_MAX_AGE,
        'ATOMIC_REQUESTS': True,
    },
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [(REDIS_HOST, REDIS_PORT)],
        },
    },
}

CACHES = {
    'default': {
        'BACKEND': 'redis_cache.RedisCache',
        'LOCATION': REDIS_URL,
    },
}

# Celery application definition
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE

AUTH_USER_MODEL = 'authentication.User'

PASSWORD_MIN_LENGTH = 4
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': PASSWORD_MIN_LENGTH or 0,
        },
    },
]

SERIALIZATION_MODULES = {}

ADMINS = MANAGERS = [
    ('Nikita', 'N02@yandex.ru'),
]

USE_X_FORWARDED_PORT = True
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ROOT_URLCONF = 'urls'
WSGI_APPLICATION = 'wsgi.application'
ASGI_APPLICATION = 'routing.application'

DEFAULT_FROM_EMAIL = 'noreply@' + DOMAIN_NAME
SERVER_EMAIL = 'root@' + DOMAIN_NAME
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_SUBJECT_PREFIX = '[DreamSim] '
EMAIL_USE_LOCALTIME = True
EMAIL_TIMEOUT = 1000  # ms

ACCOUNT_EMAIL_REQUIRED = True
# TODO!
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_LOGOUT_ON_PASSWORD_CHANGE = True
ACCOUNT_ADAPTER = 'lib.account.adapter.AccountAdapter'

FORMAT_MODULE_PATH = 'locales.formats'
USE_THOUSAND_SEPARATOR = True

LANGUAGE_CODE = 'ru-RU'
LANGUAGE_COOKIE_DOMAIN = DOMAIN_NAME
LANGUAGE_COOKIE_NAME = 'lang'
USE_I18N = True
USE_L10N = True

LOCALE_PATHS = [os.path.join(BASE_DIR, 'locales', 'translations')]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/storage/'
STATIC_URL = '/static/'

LOGIN_URL = '/login'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

# TODO: Load from file
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        },
    },
    'formatters': {
        'standard': {
            'format': '%(levelname)-8s [%(asctime)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'null': {
            'class': 'logging.NullHandler',
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'filters': ['require_debug_false'],
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'filters': [],
            'formatter': 'standard',
        },
    },
    'loggers': {
        '': {
            'handlers': ['console'],
            'level': 'INFO'
        },
        'django.security.DisallowedHost': {
            'handlers': ['null'],
            'propagate': False,
        },
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'lib.pagination.Pagination',
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
}

# TODO: TEST_RUNNER
# TODO: MIDDLEWARE, INSTALLED_APPS, TEMPLATES
