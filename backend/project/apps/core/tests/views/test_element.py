import pytest
from django.forms import model_to_dict

from apps.core.models import Element
from apps.core.tests.factories import ElementFactory
from lib.test.utils import assert_response
from lib.util import clean_dict, only_keys

pytestmark = pytest.mark.django_db


class TestElementViewSet:
    base_url = '/api/v1/element/'

    def get_url(self, element_id=None):
        if element_id is None:
            return self.base_url
        else:
            return self.base_url + f'{element_id}/'

    @staticmethod
    def to_json(element):
        model_dict = clean_dict(model_to_dict(element))
        json = only_keys(
            model_dict,
            {'id', 'name', 'element_type', 'array_of_inputs', 'array_of_outputs', 'time', 'delay', 'image', 'truth_table'}
        )
        return json

    def test_list(self, client):
        response = client.get(self.get_url())
        assert response.status_code == 200
        assert len(response.data) == Element.objects.count() == 0

        element = ElementFactory()
        response = client.get(self.get_url())
        assert_response(response, 200)
        assert len(response.data) == Element.objects.count() == 1
        assert response.data[0]['id'] == element.id

    def test_retrieve(self, client):
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
            'image': element.image,
            'truth_table': element.truth_table
        }
        assert_response(response, 200, data)

    def test_retrieve_not_found(self, client):
        id_not_found = 404
        assert not Element.objects.filter(id=id_not_found).exists()
        response = client.get(self.get_url(id_not_found))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_create(self, client):
        element = ElementFactory.build()
        json = clean_dict(model_to_dict(element))
        response = client.post(self.get_url(), data=json)

        element = Element.objects.get_by_natural_key(element.name)
        assert_response(response, 201, self.to_json(element))

    def test_update(self, client):
        prev_time = '0'
        new_time = '5'

        element = ElementFactory(time=prev_time)
        json = self.to_json(element)
        json['time'] = new_time

        response = client.put(self.get_url(element.id), data=json)
        assert_response(response, 200, json)

    def test_noop_update(self, client):
        element = ElementFactory()
        json = self.to_json(element)

        response = client.put(self.get_url(element.id), data=json)
        assert_response(response, 200, json)

    def test_update_not_found(self, client):
        id_not_found = 404
        assert not Element.objects.filter(id=id_not_found).exists()

        element = ElementFactory.build()
        response = client.put(self.get_url(id_not_found), data=self.to_json(element))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_partial_update(self, client):
        prev_time = '0'
        new_time = '5'

        element = ElementFactory(time=prev_time)
        response = client.patch(self.get_url(element.id), data={'time': new_time})
        element.refresh_from_db()
        assert_response(response, 200, self.to_json(element))

    def test_noop_partial_update(self, client):
        element = ElementFactory()
        json = self.to_json(element)

        response = client.patch(self.get_url(element.id), data={})
        assert_response(response, 200, json)

    def test_partial_update_not_found(self, client):
        id_not_found = 404
        assert not Element.objects.filter(id=id_not_found).exists()

        response = client.patch(self.get_url(id_not_found), data={})

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_destroy(self, client):
        element = ElementFactory()
        assert Element.objects.count() == 1

        response = client.delete(self.get_url(element.id))
        assert_response(response, 204)
        assert Element.objects.count() == 0

    def test_destroy_not_found(self, client):
        id_not_found = 404
        assert not Element.objects.filter(id=id_not_found).exists()

        response = client.delete(self.get_url(id_not_found))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)
