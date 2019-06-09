from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.vk.views import VKOAuth2Adapter
from django.contrib.auth import login as django_login, authenticate, logout
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from rest_auth.registration.views import SocialLoginView, SocialConnectView
from rest_framework.decorators import action
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import viewsets

from lib.api.viewsets import MultiSerializerMixin
from .models.user import User

from apps.authentication.serializers import UserSerializer, LoginSerializer, CreateUserSerializer


@method_decorator(sensitive_post_parameters(), 'dispatch')
@method_decorator(csrf_protect, 'dispatch')
@method_decorator(never_cache, 'dispatch')
class UserViewSet(MultiSerializerMixin, viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing schemes
    """
    queryset = User.objects
    serializer_class = UserSerializer

    serializers = {
        'login': LoginSerializer,
        'create': CreateUserSerializer
    }

    @action(detail=False, methods=['POST'])
    def login(self, request):
        username = request.data['username']
        password = request.data['password']

        if request.user.is_authenticated and request.user.get_username() != username:
            logout(request)

        user = authenticate(request, username=username, password=password)
        if not user:
            raise AuthenticationFailed()

        django_login(request, user)
        request.user = user

        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def logout(self, request):
        logout(request)
        return Response()


class VKLogin(SocialLoginView):
    adapter_class = VKOAuth2Adapter
    client_class = OAuth2Client


class VKConnect(SocialConnectView):
    adapter_class = VKOAuth2Adapter
    client_class = OAuth2Client
