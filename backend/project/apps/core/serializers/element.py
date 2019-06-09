from rest_framework import serializers
from rest_framework.fields import JSONField

from apps.core.models import Element
from drf_extra_fields.fields import Base64ImageField


class ElementSerializer(serializers.ModelSerializer):
    image = Base64ImageField()
    truth_table = JSONField()

    class Meta:
        model = Element
        fields = (
            'id', 'name', 'element_type', 'array_of_inputs', 'array_of_outputs', 'time', 'delay', 'image', 'truth_table'
        )
