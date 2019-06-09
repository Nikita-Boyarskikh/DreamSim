import pytest
from django.core.exceptions import ValidationError

from lib.test.utils import create_validation_message

pytestmark = pytest.mark.django_db


class TestElement:
    def test_element_validation(self, simple_element):
        expected_errors = {
            'truth_table': ['Поле должно быть массивом с размерностью 3'],
            '__all__': ['Количество возможных комбинаций вх. сигналов д.б. = 2^(количество входных сигналов)']
        }
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            simple_element.truth_table = 'wrong value'
            simple_element.full_clean()

        simple_element.truth_table = [[[1, 0, 1, 0]]]
        simple_element.full_clean()
