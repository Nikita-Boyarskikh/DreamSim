import pytest
from rest_framework.generics import get_object_or_404

from apps.authentication.tests.factories import UserFactory
from apps.core.models import Element
from apps.core.tests.factories import ElementFactory
from lib.test.serialization import element_to_json
from lib.test.utils import assert_response
from lib.test.viewtestcase import ViewTestCase

pytestmark = pytest.mark.django_db


class TestElementViewSet(ViewTestCase):
    base_url = '/api/v1/element/'
    allowed_keys = {
        'id', 'name', 'element_type', 'array_of_inputs', 'array_of_outputs', 'time', 'delay', 'image', 'truth_table'
    }
    serialization_method = element_to_json

    def to_json(self, element):
        json = self.serialize(element)
        json.pop('image')
        return json

    def test_list(self, client, fs):
        response = client.get(self.get_url())
        assert response.status_code == 200
        assert response.data['count'] == Element.objects.count() == 0

        element = ElementFactory()
        response = client.get(self.get_url())
        assert_response(response, 200)
        assert response.data['count'] == Element.objects.count() == 1
        assert response.data['results'][0]['id'] == element.id

    def test_retrieve(self, client, fs):
        element = ElementFactory()
        response = client.get(self.get_url(element.id))

        data = {
            'id': element.id,
            'name': element.name,
            'element_type': element.element_type,
            'array_of_inputs': element.array_of_inputs,
            'array_of_outputs': element.array_of_outputs,
            'time': element.time,
            'delay': element.delay,
            'image': 'http://testserver/storage/example.jpg',
            'truth_table': element.truth_table
        }
        assert_response(response, 200, data)

    def test_retrieve_not_found(self, client):
        id_not_found = 404
        assert not Element.objects.filter(id=id_not_found).exists()
        response = client.get(self.get_url(id_not_found))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_create(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        element = ElementFactory.build()

        json = self.serialize(element)
        response = client.post(self.get_url(), data=json, content_type='application/json')

        data = response.json()
        # Image name generates random
        image = data.pop('image')
        assert image.startswith('http://') and image.endswith('.jpg')

        element = Element.objects.get(id=data['id'])
        assert_response(response, 201, self.to_json(element))

    def test_update(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        prev_time = '0'
        new_time = '5'

        element = ElementFactory(time=prev_time)
        json = self.serialize(element)
        json['time'] = new_time

        response = client.put(self.get_url(element.id), data=json, content_type='application/json')

        data = response.json()
        # Image name generates random
        image = data.pop('image')
        assert image.startswith('http://') and image.endswith('.jpg')

        element.refresh_from_db(fields={'time'})
        assert_response(response, 200, self.to_json(element))

    def test_noop_update(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        element = ElementFactory()
        json = self.serialize(element)

        response = client.put(self.get_url(element.id), data=json, content_type='application/json')

        data = response.json()
        # Image name generates random
        image = data.pop('image')
        assert image.startswith('http://') and image.endswith('.jpg')

        assert_response(response, 200, self.to_json(element))

    def test_update_not_found(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        id_not_found = 404
        assert not Element.objects.filter(id=id_not_found).exists()

        element = ElementFactory.build()
        response = client.put(self.get_url(id_not_found), data=self.serialize(element), content_type='application/json')

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_partial_update(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        prev_time = '0'
        new_time = '5'

        element = ElementFactory(time=prev_time)
        response = client.patch(self.get_url(element.id), data={'time': new_time}, content_type='application/json')
        element.refresh_from_db(fields={'time'})

        assert response.json().pop('image') == 'http://testserver/storage/example.jpg'
        assert_response(response, 200, self.to_json(element))

    def test_noop_partial_update(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        element = ElementFactory()

        response = client.patch(self.get_url(element.id), data={}, content_type='application/json')

        assert response.json().pop('image') == 'http://testserver/storage/example.jpg'
        assert_response(response, 200, self.to_json(element))

    def test_partial_update_not_found(self, client):
        user = UserFactory()
        client.force_login(user)
        id_not_found = 404
        assert not Element.objects.filter(id=id_not_found).exists()

        response = client.patch(self.get_url(id_not_found), data={}, content_type='application/json')

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_destroy(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        element = ElementFactory()
        assert Element.objects.count() == 1

        response = client.delete(self.get_url(element.id))
        assert_response(response, 204)
        assert Element.objects.count() == 0

    def test_destroy_not_found(self, client):
        user = UserFactory()
        client.force_login(user)
        id_not_found = 404
        assert not Element.objects.filter(id=id_not_found).exists()

        response = client.delete(self.get_url(id_not_found))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)
