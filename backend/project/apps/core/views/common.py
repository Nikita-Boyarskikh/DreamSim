from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet


class CommonApiViews(ViewSet):
    permission_classes = (AllowAny, )

    # pylint: disable=no-self-use
    @action(methods=['get'], detail=False)
    def healthz(self, request):
        """Проверка жизнеспособности сервиса"""
        return Response()
