# Suppress warning 'Constant name doesn't conform to UPPER_CASE naming style'
# pylint: disable=invalid-name
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.dev')

app = Celery('app')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
