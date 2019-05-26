import pytest
from django.core.exceptions import ValidationError

from lib.test import create_validation_message

pytestmark = pytest.mark.django_db


class TestSchemeLink:
    def test_scheme_link_validation(self, simple_scheme_link):
        expected_errors = {'input_pin': ['Ensure this value is greater than or equal to %(limit_value)s.']}
        with pytest.raises(ValidationError, message=expected_errors):
            simple_scheme_link.input_pin = 'wrong value'
            simple_scheme_link.full_clean()

        expected_errors = {'output_pin': ['Ensure this value is greater than or equal to %(limit_value)s.']}
        with pytest.raises(ValidationError, message=expected_errors):
            simple_scheme_link.output_pin = 'wrong value'
            simple_scheme_link.full_clean()

        simple_scheme_link.input_pin = '0'
        simple_scheme_link.output_pin = '0'
        simple_scheme_link.full_clean()
