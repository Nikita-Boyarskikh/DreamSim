from collections import Iterable

from django.contrib.postgres.fields import ArrayField as _ArrayField, JSONField as _JSONField
from rest_framework.exceptions import ValidationError

ARRAY_FIELD_ERROR = 'Поле должно быть масссивом'


class ArrayField(_ArrayField):
    def validate(self, value, model_instance):
        if not isinstance(value, Iterable):
            raise ValidationError(ARRAY_FIELD_ERROR)
        return super().validate(value, model_instance)


JSONField = _JSONField
