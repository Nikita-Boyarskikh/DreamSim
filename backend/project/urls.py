# Suppress warning 'Constant name doesn't conform to UPPER_CASE naming style'
# pylint: disable=invalid-name
import health_check.urls
from rest_auth.registration.views import SocialAccountListView, SocialAccountDisconnectView
from rest_auth.views import LoginView, LogoutView, PasswordChangeView, PasswordResetView, PasswordResetConfirmView

from rest_framework import routers
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.documentation import include_docs_urls

from apps.core.views.tools import ToolNamesApiView
from apps.core.views.scheme import SchemeViewSet
from apps.core.views.element import ElementViewSet
from apps.authentication.views import UserViewSet, VKLogin

enums_urls = [
    path('tools/', ToolNamesApiView.as_view())
]

api_v1_router = routers.SimpleRouter()
api_v1_router.register(r'scheme', SchemeViewSet, basename='scheme')
api_v1_router.register(r'element', ElementViewSet, basename='element')
api_v1_router.register(r'user', UserViewSet, basename='user')

# rest_auth.urls
auth_urls = [
    re_path(r'^password/reset/$', PasswordResetView.as_view(), name='password_reset'),
    re_path(r'^password/reset/confirm/$', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    re_path(r'^login/$', LoginView.as_view(), name='login'),
    re_path(r'^logout/$', LogoutView.as_view(), name='logout'),
    re_path(r'^password/change/$', PasswordChangeView.as_view(), name='password_change'),
    path('registration/', include('rest_auth.registration.urls')),
    path('vk/', VKLogin.as_view(), name='vk_login'),
    path('social-accounts/', SocialAccountListView.as_view(), name='social_account_list'),
    re_path(
        r'social-accounts/(?P<pk>\d+)/disconnect/$',
        SocialAccountDisconnectView.as_view(),
        name='social_account_disconnect'
    ),
]

v1_api_urls = \
    api_v1_router.urls + [
        path('auth/', include((auth_urls, 'auth'))),
        path('enums/', include((enums_urls, 'enums'))),
        path('status/', include((health_check.urls, 'health_check'))),
    ]

api_versions = [
    path('v1/', include((v1_api_urls, 'v1'))),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((api_versions, 'api'))),
    path('docs/', include_docs_urls(title='DreamSim API docs')),
]
