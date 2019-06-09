import pytest

from apps.core.models import Element, SchemeLink, SchemeElement, Scheme
from apps.authentication.tests.fixtures import *


@pytest.fixture
def simple_element():
    return Element.objects.create(
        name='simple',
        element_type='USER',
        array_of_inputs=['A', 'B'],
        array_of_outputs=['F'],
        truth_table=[[[1, 0, 1, 0]]]
    )


@pytest.fixture
def simple_scheme(simple_element, simple_user):
    return Scheme.objects.create(
        name='simple',
        creator=simple_user
    )


@pytest.fixture
def simple_scheme_element(simple_scheme, simple_element):
    return SchemeElement.objects.create(
        name='simple',
        scheme=simple_scheme,
        element=simple_element,
        coordinates=[2, 2]
    )


@pytest.fixture
def simple_scheme_link(simple_scheme_element):
    return SchemeLink.objects.create(
        input_scheme_element=simple_scheme_element,
        output_scheme_element=simple_scheme_element,
        coordinate_array=[[0, 1], [2, 3]],
        input_pin=1,
        output_pin=1,
        name='simple'
    )



