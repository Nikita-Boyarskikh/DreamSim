from rest_framework import serializers

from apps.core.models import SchemeElement


class SchemeElementSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='element.id')

    class Meta:
        model = SchemeElement
        fields = ('id', 'coordinates', 'name')
