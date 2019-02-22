# Suppress warning 'Constant name doesn't conform to UPPER_CASE naming style'
# pylint: disable=invalid-name
from rest_framework import routers
from django.contrib import admin
from django.urls import path, include

from apps.authentication import views as auth_views
from apps.core import views as core_views

router = routers.SimpleRouter()
router.register(r'', core_views.CommonApiViews, base_name='common')
router.register(r'login', auth_views.LoginView, base_name='login')

api_versions = [
    path('v1/', include((router.urls, 'v1'))),
]

urlpatterns = [path('admin/', admin.site.urls), path('api/', include((api_versions, 'api')))]
