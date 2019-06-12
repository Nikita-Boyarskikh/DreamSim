import pytest
from django.core.exceptions import ValidationError

from apps.core.tests.factories import SchemeLinkFactory
from apps.core.validators import PIN_INDEX_ERROR
from lib.test.utils import create_validation_message

pytestmark = pytest.mark.django_db


class TestSchemeLink:
    def test_wrong_input_pin(self, fs):
        scheme_link = SchemeLinkFactory(input_pin=999)
        expected_errors = {'__all__': [PIN_INDEX_ERROR]}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            scheme_link.full_clean()

    def test_wrong_output_pin(self, fs):
        scheme_link = SchemeLinkFactory(output_pin=999)
        expected_errors = {'__all__': [PIN_INDEX_ERROR]}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            scheme_link.full_clean()

    def test_valid(self, fs):
        scheme_link = SchemeLinkFactory()
        scheme_link.full_clean()
