from rest_framework import serializers

from apps.core.models import SchemeElement


class SchemeElementSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='element.id')
    scheme_id = serializers.IntegerField(source='scheme.id', read_only=True)

    class Meta:
        model = SchemeElement
        fields = ('scheme_id', 'id', 'coordinates', 'name')


