from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.core.models import Scheme
from apps.core.serializers.scheme import SchemeSerializer, SchemeCreateSerializer
from lib.api.viewsets import MultiSerializerMixin


class SchemeViewSet(MultiSerializerMixin, viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing schemes
    """
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer
    permission_classes = (IsAuthenticated,)

    serializers = {
        'create': SchemeCreateSerializer,
        'update': SchemeCreateSerializer,
    }

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
