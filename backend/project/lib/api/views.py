from rest_framework.response import Response
from rest_framework.views import APIView


class EnumApiView(APIView):
    enum_class = None

    def get(self, request):
        return Response(
            {
                'id': item_id,
                'name': item.name,
                'value': item.value
            } for item_id, item in enumerate(self.enum_class)
        )
