import pytest
from django.contrib.auth.hashers import make_password

from apps.authentication.models import Institute, Group
from apps.authentication.tests.factories import UserFactory


@pytest.fixture
def bmstu():
    return Institute.objects.create(name='МГТУ', format_group=r'[А-Я]{1,3}\d{1,2}-\d{1,3}[АБМ]?')


@pytest.fixture
def iu6_61b(bmstu):
    return Group.objects.create(name='ИУ6-61Б', institute=bmstu)


@pytest.fixture
def simple_user_password():
    return 'simple_password'


@pytest.fixture
def simple_user(client, simple_user_password):
    username = 'simple_user'
    user = UserFactory(username=username, password=make_password(simple_user_password))
    if client.login(username=username, password=simple_user_password):
        return user
