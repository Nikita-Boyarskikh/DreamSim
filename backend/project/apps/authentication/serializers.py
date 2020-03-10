from rest_framework import serializers

from apps.authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    group = serializers.IntegerField(source='group.id', required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'birthday', 'first_name', 'last_name', 'patronymic', 'vk', 'group')
        read_only_fields = ('id',)


class CreateUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ('password',)
        extra_kwargs = {'password': {'write_only': True}}
