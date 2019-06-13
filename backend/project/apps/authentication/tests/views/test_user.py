import pytest
from django.conf import settings
from django.contrib.auth.hashers import make_password

from apps.authentication.models import User
from apps.authentication.tests.factories import UserFactory
from lib.test.utils import assert_response
from lib.test.serialization import user_to_json
from lib.test.viewtestcase import ViewTestCase

pytestmark = pytest.mark.django_db


class TestUserViewSet(ViewTestCase):
    base_url = '/api/v1/user/'
    allowed_keys = {'id', 'username', 'email', 'birthday', 'first_name', 'last_name', 'vk', 'patronymic'}
    serialization_method = user_to_json

    @staticmethod
    def is_logged_in(response):
        session_cookie = response.cookies.get(settings.SESSION_COOKIE_NAME)
        return session_cookie and session_cookie.value

    def test_list(self, client):
        response = client.get(self.get_url())
        assert response.status_code == 200
        assert len(response.data) == User.objects.count() == 0

        user = UserFactory()
        response = client.get(self.get_url())
        assert_response(response, 200)
        assert len(response.data) == User.objects.count() == 1
        assert response.data[0]['id'] == user.id

    def test_retrieve(self, client):
        user = UserFactory()
        response = client.get(self.get_url(user.id))

        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'birthday': user.birthday,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'vk': user.vk,
            'patronymic': user.patronymic
        }
        assert_response(response, 200, data)

    def test_retrieve_not_found(self, client):
        id_not_found = 404
        assert not User.objects.filter(id=id_not_found).exists()
        response = client.get(self.get_url(id_not_found))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_create(self, client):
        user = UserFactory.build()
        json = self.serialization_method(user)
        response = client.post(self.get_url(), data=json)

        user = User.objects.get_by_natural_key(user.username)
        assert_response(response, 201, self.serialize(user))

    def test_update(self, client):
        prev_last_name = 'Previous-Last-Name'
        new_last_name = 'New-Last-Name'

        user = UserFactory(last_name=prev_last_name)
        json = self.serialize(user)
        json['last_name'] = new_last_name

        response = client.put(self.get_url(user.id), data=json, content_type='application/json')
        assert_response(response, 200, json)

    def test_noop_update(self, client):
        user = UserFactory()
        json = self.serialize(user)

        response = client.put(self.get_url(user.id), data=json, content_type='application/json')
        assert_response(response, 200, json)

    def test_update_not_found(self, client):
        id_not_found = 404
        assert not User.objects.filter(id=id_not_found).exists()

        user = UserFactory.build()
        response = client.put(self.get_url(id_not_found), data=self.serialize(user), content_type='application/json')

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_partial_update(self, client):
        prev_last_name = 'Previous-Last-Name'
        new_last_name = 'New-Last-Name'

        user = UserFactory(last_name=prev_last_name)
        response = client.patch(self.get_url(user.id), data={'last_name': new_last_name},
                                content_type='application/json')
        user.refresh_from_db(fields={'last_name'})
        assert_response(response, 200, self.serialize(user))

    def test_noop_partial_update(self, client):
        user = UserFactory()
        json = self.serialize(user)

        response = client.patch(self.get_url(user.id), data={}, content_type='application/json')
        assert_response(response, 200, json)

    def test_partial_update_not_found(self, client):
        id_not_found = 404
        assert not User.objects.filter(id=id_not_found).exists()

        response = client.patch(self.get_url(id_not_found), data={}, content_type='application/json')

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_destroy(self, client):
        user = UserFactory()
        assert User.objects.count() == 1

        response = client.delete(self.get_url(user.id))
        assert_response(response, 204)
        assert User.objects.count() == 0

    def test_destroy_not_found(self, client):
        id_not_found = 404
        assert not User.objects.filter(id=id_not_found).exists()

        response = client.delete(self.get_url(id_not_found))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_login(self, client):
        username = 'simple_user'
        password = 'simple_password'
        data = {'username': username, 'password': password}

        user = UserFactory(username=username, password=make_password(password))

        client.logout()
        response = client.post(self.get_url() + 'login/', data=data)
        assert_response(response, 200, self.serialize(user))
        assert self.is_logged_in(response)

    def test_login_user_does_not_exists(self, client):
        username = 'does_not_exists'
        password = 'simple_password'
        data = {'username': username, 'password': password}

        assert not User.objects.filter(username=username).exists()

        client.logout()
        response = client.post(self.get_url() + 'login/', data=data)

        error = {'detail': 'Некорректные учетные данные.'}
        assert_response(response, 403, error)
        assert not self.is_logged_in(response)

    def test_login_wrong_credentials(self, client):
        username = 'simple_user'
        password = 'wrong_password'
        data = {'username': username, 'password': password}

        UserFactory(username=username)

        client.logout()
        response = client.post(self.get_url() + 'login/', data=data)

        error = {'detail': 'Некорректные учетные данные.'}
        assert_response(response, 403, error)
        assert not self.is_logged_in(response)

    def test_login_already_authorized(self, client):
        username = 'simple_user'
        password = 'simple_password'
        data = {'username': username, 'password': password}

        user = UserFactory(username=username, password=make_password(password))

        assert client.login(**data)
        response = client.post(self.get_url() + 'login/', data=data)
        assert_response(response, 200, self.serialize(user))
        assert self.is_logged_in(response)

    def test_login_user_does_not_exists_already_authorized(self, client):
        username = 'does_not_exists'
        password = 'simple_password'
        data = {'username': username, 'password': password}

        user = UserFactory(password=make_password(password))
        assert not User.objects.filter(username=username).exists()

        assert client.login(username=user.username, password=password)
        response = client.post(self.get_url() + 'login/', data=data)

        error = {'detail': 'Некорректные учетные данные.'}
        assert_response(response, 403, error)
        assert not self.is_logged_in(response)

    def test_login_wrong_credentials_already_authorized(self, client):
        username = 'simple_user'
        password = 'wrong_password'
        true_password = 'true_password'
        data = {'username': username, 'password': password}

        UserFactory(username=username, password=make_password(true_password))

        assert client.login(username=username, password=true_password)
        response = client.post(self.get_url() + 'login/', data=data)

        error = {'detail': 'Некорректные учетные данные.'}
        assert_response(response, 403, error)
        assert not self.is_logged_in(response)

    def test_logout(self, client):
        client.logout()
        response = client.post(self.get_url() + 'logout/')
        assert_response(response, 200)
        assert not self.is_logged_in(response)

    def test_logout_already_authorized(self, client):
        username = 'simple_user'
        password = 'simple_password'
        data = {'username': username, 'password': password}

        UserFactory(username=username, password=make_password(password))

        assert client.login(**data)
        response = client.post(self.get_url() + 'logout/')
        assert_response(response, 200)
        assert not self.is_logged_in(response)
