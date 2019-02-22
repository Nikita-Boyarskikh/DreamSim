from django.conf.global_settings import DATETIME_INPUT_FORMATS, DATE_INPUT_FORMATS

# Suppress warnings about star import
from locales.default.formats import *  # noqa: F401,F403 pylint: disable=wildcard-import

FIRST_DAY_OF_WEEK = 1  # Monday

MONTH_DAY_FORMAT = 'D, j F'  # Mon, 25 October
DATE_FORMAT = 'j F Y'  # '25 October 2006'
TIME_FORMAT = '%H:%M:%S'  # '14:30:59'
DATETIME_FORMAT = 'D, j F Y H:i:s'  # Mon, 25 October 2006 14:30:59

SHORT_DATE_FORMAT = '%d.%m.%y'  # '25.10.06'
SHORT_DATETIME_FORMAT = '%d.%m.%y %H:%M:%S'  # '25.10.06 14:30:59'

DATE_INPUT_FORMATS += (
    '%d.%m.%Y',  # '25.10.2006'
    '%d.%m.%y'  # '25.10.06'
)
DATETIME_INPUT_FORMATS += (
    '%d.%m.%Y %H:%M:%S',  # '25.10.2006 14:30:59'
    '%d.%m.%Y %H:%M:%S.%f',  # '25.10.2006 14:30:59.000200'
    '%d.%m.%Y %H:%M',  # '25.10.2006 14:30'
    '%d.%m.%Y',  # '25.10.2006'
    '%d.%m.%y %H:%M:%S',  # '25.10.06 14:30:59'
    '%d.%m.%y %H:%M:%S.%f',  # '25.10.06 14:30:59.000200'
    '%d.%m.%y %H:%M',  # '25.10.06 14:30'
    '%d.%m.%y',  # '25.10.06'
)
