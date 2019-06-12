import pytest
from django.db import models
from rest_framework.exceptions import ValidationError

from lib.postgres.fields import ArrayField, ARRAY_FIELD_ERROR


class TestArrayField:
    def test_field_is_array(self):
        field = ArrayField(models.CharField(max_length=255))
        assert field.clean('["simple value"]', None) == ['simple value']

    def test_field_is_not_array(self):
        with pytest.raises(ValidationError, match=ARRAY_FIELD_ERROR):
            field = ArrayField(models.CharField(max_length=255))
            assert field.clean('1', None)
