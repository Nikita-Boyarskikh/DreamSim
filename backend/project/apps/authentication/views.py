from django.contrib.auth import login as django_login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import viewsets
from .models.user import User

from apps.authentication.serializers import UserSerializer


@method_decorator(csrf_exempt, 'dispatch')
class LoginView(GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )

    def create(self, request):
        django_login(request, request.user)
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing schemes
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
