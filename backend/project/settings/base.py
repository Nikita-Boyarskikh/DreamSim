import os

# Suppress warnings about import from package and about star import
from locales.default.formats import *  # noqa: F401,F403 pylint: disable=wildcard-import

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TMP_DIR = os.path.join(os.path.dirname(BASE_DIR), 'tmp')
DOMAIN_NAME = 'circuit-design.ru'
PG_CONN_MAX_AGE = 10

SECRET_KEY = 'ou$!!y5#x=9q4i8%$=srd8s04lkf&69pk!f2_6qev+_ywief)0'

ABSOLUTE_URL_OVERRIDES = {}

INSTALLED_APPS = [
    # Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',

    # Third party
    'rest_framework',
    'django_filters',
    'corsheaders',

    # Project
    'apps.core',
    'apps.authentication',
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
        'NAME': os.environ.get('PGDATABASE') or 'circuitdesign',
        'USER': os.environ.get('PGUSER') or 'circuitdesign',
        'PASSWORD': os.environ.get('PGPASSWORD') or 'circuitdesign',
        'HOST': os.environ.get('PGHOST') or 'localhost',
        'PORT': os.environ.get('PGPORT') or 5432,
        'CONN_MAX_AGE': PG_CONN_MAX_AGE,
        'ATOMIC_REQUESTS': True,
    },
}

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

ROOT_URLCONF = 'urls'
WSGI_APPLICATION = 'wsgi.application'

DEFAULT_FROM_EMAIL = 'noreply@' + DOMAIN_NAME
SERVER_EMAIL = 'root@' + DOMAIN_NAME
EMAIL_SUBJECT_PREFIX = '[CircuitDesign] '
EMAIL_USE_LOCALTIME = True
EMAIL_TIMEOUT = 1000  # ms

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

APPEND_SLASH = True
PREPEND_WWW = False

TIME_ZONE = 'UTC'
USE_TZ = True

LOGIN_URL = '/login'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

# TODO: Load from file
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
}

# TODO: TEST_RUNNER
# TODO: MIDDLEWARE, INSTALLED_APPS, TEMPLATES
