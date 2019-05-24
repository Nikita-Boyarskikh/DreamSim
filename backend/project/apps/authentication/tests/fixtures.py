import pytest

from apps.authentication.models import User


@pytest.fixture
def simple_user():
    return User.objects.create(username='simple', password='123455678')
