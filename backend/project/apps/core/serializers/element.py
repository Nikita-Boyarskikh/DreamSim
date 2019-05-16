from rest_framework import serializers

from apps.core.models import Element


class ElementSerializer(serializers.ModelSerializer):
    element_type = Element.element_type

    class Meta:
        model = Element
        fields = ('id', 'name', 'element_type', 'array_of_inputs', 'array_of_outputs', 'time', 'delay', 'image', 'truth_table')
