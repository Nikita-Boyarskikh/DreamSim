from rest_framework import viewsets
from apps.core.models import Element
from apps.core.serializers.element import ElementSerializer


class ElementViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing schemes
    """
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
