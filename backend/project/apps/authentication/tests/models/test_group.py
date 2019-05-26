import pytest
from django.core.exceptions import ValidationError

from lib.test.utils import create_validation_message

pytestmark = pytest.mark.django_db


class TestGroup:
    def test_group_validation(self, iu6_61b):
        expected_errors = {'__all__': ['Неверный формат имени группы']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            iu6_61b.name = 'wrong value'
            iu6_61b.full_clean()

        iu6_61b.name = 'ИУ6-61Б'
        iu6_61b.full_clean()
