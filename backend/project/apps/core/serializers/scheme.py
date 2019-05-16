from rest_framework import serializers

from apps.authentication.serializers import UserSerializer
from apps.core.models import Scheme, Element, SchemeElement
from apps.core.serializers.scheme_element import SchemeElementSerializer


class SchemeCommonSerializer(serializers.ModelSerializer):
    elements = SchemeElementSerializer(many=True)

    class Meta:
        model = Scheme
        fields = ('id', 'name', 'formula', 'creator', 'elements')


class SchemeSerializer(SchemeCommonSerializer):
    creator = UserSerializer()


class SchemeCreateSerializer(SchemeCommonSerializer):
    creator = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    def create(self, validated_data):
        scheme = Scheme.objects.create(
            name=validated_data['name'],
            creator=validated_data['creator'],
            formula=validated_data.get('formula')
        )

        elements_data = validated_data['elements']
        element_ids = (data['element']['id'] for data in elements_data)

        elements = Element.objects.filter(id__in=element_ids).all()
        for element, data in zip(elements, elements_data):
            SchemeElement.objects.create(
                element=element,
                scheme=scheme,
                name=data.get('name') or element.name,
                coordinates=data['coordinates']
            )

        return scheme
