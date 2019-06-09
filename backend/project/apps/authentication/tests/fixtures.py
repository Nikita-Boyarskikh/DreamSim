import pytest

from apps.authentication.models import User, Institute
from apps.authentication.models import Group


@pytest.fixture
def simple_user():
    return User.objects.create(username='simple', password='123455678')


@pytest.fixture
def bmstu():
    return Institute.objects.create(name='МГТУ', format_group=r'[А-Я]{1,3}\d{1,2}-\d{1,3}[АБМ]?')


@pytest.fixture
def iu6_61b(bmstu):
    return Group.objects.create(name='ИУ6-61Б', institute=bmstu)
