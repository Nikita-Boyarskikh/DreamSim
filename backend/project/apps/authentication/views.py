from django.contrib.auth import login as django_login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import viewsets

from lib.api.viewsets import MultiSerializerMixin
from .models.user import User

from apps.authentication.serializers import UserSerializer, LoginSerializer


@method_decorator(csrf_exempt, 'dispatch')
class UserViewSet(MultiSerializerMixin, viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing schemes
    """
    queryset = User.objects
    serializer_class = UserSerializer

    serializers = {
        'login': LoginSerializer
    }

    @action(detail=False, methods=['POST'])
    def login(self, request):
        django_login(request, request.user)
        if not request.user.is_authenticated:
            raise AuthenticationFailed()

        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
