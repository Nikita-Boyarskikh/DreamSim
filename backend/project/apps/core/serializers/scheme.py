from django.db import transaction
from rest_framework import serializers

from apps.core.models import Scheme, Element, SchemeElement
from apps.core.serializers.scheme_element import SchemeElementSerializer


class SchemeSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    elements = SchemeElementSerializer(source='schemeelement_set', many=True)

    @transaction.atomic
    def create(self, validated_data):
        scheme = Scheme.objects.create(
            name=validated_data['name'], creator=validated_data['creator'], formula=validated_data.get('formula')
        )

        scheme_elements_data = validated_data['schemeelement_set']
        element_ids = (data['id'] for data in scheme_elements_data)

        elements = Element.objects.filter(id__in=element_ids).all()
        for element, data in zip(elements, scheme_elements_data):
            SchemeElement.objects.create(
                element=element, scheme=scheme, name=data.get('name') or element.name, coordinates=data['coordinates']
            )

        return scheme

    class Meta:
        model = Scheme
        fields = ('id', 'name', 'formula', 'creator', 'elements')
