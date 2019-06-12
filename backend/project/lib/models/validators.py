from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible

ARRAY_FIELD_SIZE_ERROR = 'Поле должно быть массивом с размерностью {}'
BIN_ERROR = 'Поле должно иметь значение 0 или 1'


def json_array_validator(field, dimensions=1):
    if not isinstance(field, list):
        raise ValidationError(ARRAY_FIELD_SIZE_ERROR.format(dimensions))


@deconstructible
class JSONArrayFieldValidator:
    code = 'json_array'
    message = ARRAY_FIELD_SIZE_ERROR

    def __init__(self, field_validator=None, dimension=1):
        self.field_validator = field_validator
        self.total_dimension = dimension

    def __call__(self, field, dim=None):
        dim = dim or self.total_dimension
        json_array_validator(field, self.total_dimension)
        for _ in range(dim - 1):
            for f in field:
                self.__call__(f, dim - 1)
        if dim == 1:
            for f in field:
                self.field_validator(f)

    def __eq__(self, other):
        return (
            isinstance(other, self.__class__) and self.field_validator == other.field_validator and
            self.total_dimension == other.total_dimension
        )


def bin_validator(field):
    if not field == 0 and not field == 1:
        raise ValidationError(BIN_ERROR)
