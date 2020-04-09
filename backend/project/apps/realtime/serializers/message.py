from rest_framework import serializers
from rest_framework.serializers import PrimaryKeyRelatedField, CurrentUserDefault

from apps.realtime.models.message import Message
from lib.api.serializers import ModelSerializer


class MessageSerializer(ModelSerializer):
    author = PrimaryKeyRelatedField(read_only=True, default=CurrentUserDefault())
    read = serializers.SerializerMethodField()

    def get_read(self, obj):
        user = self.context['request'].user
        return obj.is_read(user.id)

    class Meta:
        model = Message
        fields = ('id', 'chat_id', 'author', 'read', 'text')
