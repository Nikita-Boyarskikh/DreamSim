# Suppress warning 'Constant name doesn't conform to UPPER_CASE naming style'
# pylint: disable=invalid-name
import health_check.urls
from rest_auth.registration.views import SocialAccountListView, SocialAccountDisconnectView
from rest_framework import routers
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.documentation import include_docs_urls

from apps.core.views.scheme import SchemeViewSet
from apps.core.views.element import ElementViewSet
from apps.authentication.views import UserViewSet, VKLogin

router = routers.SimpleRouter()
router.register(r'scheme', SchemeViewSet, basename='scheme')
router.register(r'element', ElementViewSet, basename='element')
router.register(r'user', UserViewSet, basename='user')

v1_api_urls = \
    router.urls + [
        path('status/', include((health_check.urls, 'health_check'))),
        path('docs/', include_docs_urls(title='My API title')),
    ]

api_versions = [
    path('v1/', include((v1_api_urls, 'v1'))),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((api_versions, 'api'))),

    path('rest-auth/', include('rest_auth.urls')),  # Without /user
    path('dj-auth/', include('django.contrib.auth.urls')),  # Reset password form
    path('rest-auth/vk/', VKLogin.as_view(), name='vk_login'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
    path('socialaccounts/', SocialAccountListView.as_view(), name='social_account_list'),
    re_path(
        r'^socialaccounts/(?P<pk>\d+)/disconnect/$',
        SocialAccountDisconnectView.as_view(),
        name='social_account_disconnect'
    )
]
