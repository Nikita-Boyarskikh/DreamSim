from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.viewsets import mixins, GenericViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from apps.realtime.models.chat import Chat
from apps.realtime.models.message import Message
from apps.realtime.serializers.message import MessageSerializer
from apps.realtime.services.message import read_message, read_messages_query


class MessageViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, GenericViewSet):
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        queryset = Message.objects.select_related('author').order_by('-created')
        chat_id = self.kwargs.get('scheme_pk')
        return queryset.filter(chat_id=chat_id)

    def perform_create(self, serializer):
        scheme_id = self.kwargs.get('scheme_pk')
        chat = get_object_or_404(Chat.objects, scheme_id=scheme_id)
        serializer.save(author=self.request.user, chat_id=chat.pk)

    @action(detail=False)
    def unread(self, request, scheme_pk):
        queryset = self.get_queryset().filter(~read_messages_query(request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def read(self, request, scheme_pk, pk):
        message = get_object_or_404(Message.objects, id=pk, chat__scheme_id=scheme_pk)
        read_message(message=message, reader=request.user)
        return Response({'status': 'ok'})
