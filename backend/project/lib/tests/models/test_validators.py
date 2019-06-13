import pytest
from django.core.exceptions import ValidationError

from lib.models.validators import bin_validator, BIN_ERROR


def test_bin_validator():
    bin_validator(0)
    bin_validator(1)
    with pytest.raises(ValidationError, match=BIN_ERROR):
        bin_validator(2)
