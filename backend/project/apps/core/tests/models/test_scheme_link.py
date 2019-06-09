import pytest
from django.core.exceptions import ValidationError

from lib.test.utils import create_validation_message

pytestmark = pytest.mark.django_db


class TestSchemeLink:
    def test_scheme_link_validation(self, simple_scheme_link):
        expected_errors = {'__all__': ['Индекс пина должен быть меньше количества пинов на элементе']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            simple_scheme_link.input_pin = 999
            simple_scheme_link.full_clean()

        expected_errors = {'__all__': ['Индекс пина должен быть меньше количества пинов на элементе']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            simple_scheme_link.output_pin = 999
            simple_scheme_link.full_clean()

        simple_scheme_link.input_pin = 0
        simple_scheme_link.output_pin = 0
        simple_scheme_link.full_clean()
