from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.vk.views import VKOAuth2Adapter
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from rest_auth.registration.views import SocialLoginView, SocialConnectView
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from lib.api.exceptions import Redirect
from lib.api.viewsets import MultiSerializerMixin
from .models.user import User

from apps.authentication.serializers import UserSerializer, LoginSerializer, CreateUserSerializer


@method_decorator(sensitive_post_parameters(), 'dispatch')
@method_decorator(csrf_protect, 'dispatch')
@method_decorator(never_cache, 'dispatch')
class UserViewSet(MultiSerializerMixin, ModelViewSet):
    """
    A simple ViewSet for viewing and editing schemes
    """
    queryset = User.objects
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )

    serializers = {
        'login': LoginSerializer,
        'create': CreateUserSerializer
    }

    def get_object(self):
        pk = self.kwargs.get('pk')
        if pk != 'current':
            raise Redirect('/api/v1/user/current/')

        return self.request.user

    def list(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class VKLogin(SocialLoginView):
    adapter_class = VKOAuth2Adapter
    client_class = OAuth2Client


class VKConnect(SocialConnectView):
    adapter_class = VKOAuth2Adapter
    client_class = OAuth2Client
