from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from apps.core.models import Scheme
from apps.core.serializers.scheme import SchemeSerializer


class SchemeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing schemes
    """
    queryset = Scheme.objects.select_related('creator').prefetch_related('elements')
    serializer_class = SchemeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
