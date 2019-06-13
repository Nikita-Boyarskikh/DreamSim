from rest_framework import serializers


class ModelSerializer(serializers.ModelSerializer):
    def partial_optional(self, model, validated_data, field_name):
        data = validated_data.get(field_name)
        if self.partial:
            data = data or getattr(model, field_name, None)
        return data
