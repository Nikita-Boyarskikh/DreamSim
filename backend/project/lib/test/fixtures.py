import pytest


@pytest.fixture()
def client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture()
def admin_client(db, admin_user):
    from rest_framework.test import APIClient

    client = APIClient()
    client.login(username=admin_user.username, password='password')
    return client
