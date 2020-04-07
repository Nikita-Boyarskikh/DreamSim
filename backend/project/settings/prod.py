import os

# Suppress warnings about star import
from settings.base import *  # noqa: F403 pylint: disable=wildcard-import
# TODO: Add http handlers
# from app.urls import handler403csrfndler302csrf

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = ['*.' + DOMAIN_NAME, DOMAIN_NAME]
# TODO: WARNING!!! Temporary unsecure solution:
ALLOWED_HOSTS += ['*']
CORS_ORIGIN_WHITELIST = ALLOWED_HOSTS

SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_SECONDS = 1

CSRF_COOKIE_DOMAIN = '*.' + DOMAIN_NAME
CSRF_COOKIE_SECURE = True
CSRF_USE_SESSIONS = True
CSRF_TRUSTED_ORIGINS = ['.' + DOMAIN_NAME, DOMAIN_NAME]
# CSRF_FAILURE_VIEW = handler403csrf

SESSION_COOKIE_DOMAIN = DOMAIN_NAME
SESSION_COOKIE_SECURE = True

# We have ingress to serve traffic over https
SECURE_SSL_REDIRECT = False
X_FRAME_OPTIONS = 'DENY'

# TODO: Cache configuration
# TODO: Logging configuration
# TODO: Session configuration
# TODO: Email configuration
# TODO: Nginx + SSL configuration (SECURE_PROXY_SSL_HEADER, USE_X_FORWARDED_HOST, USE_X_FORWARDED_PORT)
