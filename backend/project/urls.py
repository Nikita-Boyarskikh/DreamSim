# Suppress warning 'Constant name doesn't conform to UPPER_CASE naming style'
# pylint: disable=invalid-name
import health_check.urls
from rest_framework import routers
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

from apps.core.views.scheme import SchemeViewSet
from apps.core.views.element import ElementViewSet
from apps.authentication.views import UserViewSet


router = routers.SimpleRouter()
router.register(r'scheme', SchemeViewSet, base_name='scheme')
router.register(r'element', ElementViewSet, base_name='element')
router.register(r'user', UserViewSet, base_name='user')

api_versions = [
    path('v1/', include((router.urls, 'v1'))),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((api_versions, 'api'))),
    path('status/', include((health_check.urls, 'health_check'))),
    path('api/docs/', include_docs_urls(title='My API title')),
]
