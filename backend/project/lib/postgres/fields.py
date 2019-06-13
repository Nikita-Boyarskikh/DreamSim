import json
from collections import Iterable

from django.contrib.postgres.fields import ArrayField as _ArrayField, JSONField as _JSONField
from rest_framework.exceptions import ValidationError

ARRAY_FIELD_ERROR = 'Поле должно быть масссивом'


class ArrayField(_ArrayField):
    def to_python(self, value):
        if isinstance(value, str):
            vals = json.loads(value)
            if not isinstance(vals, Iterable):
                raise ValidationError(ARRAY_FIELD_ERROR)
            value = [self.base_field.to_python(val) for val in vals]
        return value


JSONField = _JSONField
