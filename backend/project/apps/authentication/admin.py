from django.contrib import admin
from django.contrib.auth import get_user_model
from apps.authentication.models.institute import Institute

admin.site.register(Institute)

admin.site.register(get_user_model())
