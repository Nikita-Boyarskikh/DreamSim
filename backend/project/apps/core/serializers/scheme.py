from django.db import transaction
from rest_framework.serializers import PrimaryKeyRelatedField, CurrentUserDefault

from apps.core.models import Scheme
from apps.core.serializers.scheme_element import SchemeElementSerializer
from apps.core.service.scheme import create_scheme_elements_for_scheme
from apps.realtime.models.chat import Chat
from lib.api.serializers import ModelSerializer


class SchemeSerializer(ModelSerializer):
    creator = PrimaryKeyRelatedField(read_only=True, default=CurrentUserDefault())
    elements = SchemeElementSerializer(source='schemeelement_set', many=True)

    @transaction.atomic
    def create(self, validated_data):
        scheme = Scheme.objects.create(
            name=validated_data['name'],
            creator=validated_data['creator'],
            formula=validated_data.get('formula')
        )
        create_scheme_elements_for_scheme(scheme, validated_data['schemeelement_set'])
        Chat.objects.get_or_create(scheme=scheme)
        scheme.refresh_from_db(fields={'elements', 'chat'})
        return scheme

    @transaction.atomic
    def update(self, scheme, validated_data):
        scheme.name = self.partial_optional(scheme, validated_data, 'name')
        scheme.formula = self.partial_optional(scheme, validated_data, 'formula')

        if 'schemeelement_set' in validated_data:
            scheme.schemeelement_set.all().delete()
            create_scheme_elements_for_scheme(scheme, validated_data['schemeelement_set'])
            scheme.refresh_from_db(fields={'elements'})

        scheme.save()
        return scheme

    class Meta:
        model = Scheme
        fields = ('id', 'name', 'formula', 'creator', 'elements')
