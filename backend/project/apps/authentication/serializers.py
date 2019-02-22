from rest_framework import serializers

from apps.authentication.models import User


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'birthday', 'first_name', 'last_name')
