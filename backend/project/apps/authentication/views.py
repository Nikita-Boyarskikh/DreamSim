from django.contrib.auth import login as django_login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.authentication.serializers import AppUserSerializer


@method_decorator(csrf_exempt, 'dispatch')
class LoginView(GenericViewSet):
    serializer_class = AppUserSerializer
    permission_classes = (IsAuthenticated, )

    def create(self, request):
        django_login(request, request.user)
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
