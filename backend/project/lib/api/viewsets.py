class MultiSerializerMixin:
    serializers = {}

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializer_class)
