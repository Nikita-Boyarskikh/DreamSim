import pytest
from django.forms import model_to_dict

from apps.core.models import Scheme
from apps.core.tests.factories import SchemeFactory, ElementFactory
from lib.test.utils import assert_response
from lib.util import clean_dict, only_keys

pytestmark = pytest.mark.django_db


class TestSchemeViewSet:
    base_url = '/api/v1/scheme/'

    def get_url(self, scheme_id=None):
        if scheme_id is None:
            return self.base_url
        else:
            return self.base_url + f'{scheme_id}/'

    @staticmethod
    def to_json(scheme):
        model_dict = clean_dict(model_to_dict(scheme))
        json = only_keys(
            model_dict,
            {'id', 'name', 'formula', 'creator', 'elements'}
        )
        return json

    def test_list(self, client):
        response = client.get(self.get_url())
        assert response.status_code == 200
        assert len(response.data) == Scheme.objects.count() == 0

        scheme = SchemeFactory()
        for i in range(10):
            element = ElementFactory()
            scheme.elements.add(element)
        response = client.get(self.get_url())
        assert_response(response, 200)
        assert len(response.data) == Scheme.objects.count() == 1
        assert response.data[0]['id'] == scheme.id

    def test_retrieve(self, client):
        scheme = SchemeFactory()
        for i in range(10):
            element = ElementFactory()
            scheme.elements.add(element)
        response = client.get(self.get_url(scheme.id))

        data = {
            'id': scheme.id,
            'name': scheme.name,
            'formula': scheme.formula,
            'creator': scheme.creator,
            'elements': scheme.elements
        }
        assert_response(response, 200, data)

    def test_retrieve_not_found(self, client):
        id_not_found = 404
        assert not Scheme.objects.filter(id=id_not_found).exists()
        response = client.get(self.get_url(id_not_found))

        error = {'detail': 'Учетные данные не были предоставлены.'}
        assert_response(response, 404, error)

    def test_create(self, client):
        scheme = SchemeFactory.build()
        for i in range(10):
            element = ElementFactory()
            scheme.elements.add(element)
        json = clean_dict(model_to_dict(scheme))
        response = client.post(self.get_url(), data=json)

        scheme = Scheme.objects.get_by_natural_key(scheme.name)
        assert_response(response, 201, self.to_json(scheme))

    def test_update(self, client):
        prev_name = 'prev'
        new_name = 'new'

        scheme = SchemeFactory(name=prev_name)
        for i in range(10):
            element = ElementFactory()
            scheme.elements.add(element)
        json = self.to_json(scheme)
        json['name'] = new_name

        response = client.put(self.get_url(scheme.id), data=json)
        assert_response(response, 200, json)

    def test_noop_update(self, client):
        scheme = SchemeFactory()
        for i in range(10):
            element = ElementFactory()
            scheme.elements.add(element)
        json = self.to_json(scheme)

        response = client.put(self.get_url(scheme.id), data=json)
        assert_response(response, 200, json)

    def test_update_not_found(self, client):
        id_not_found = 404
        assert not Scheme.objects.filter(id=id_not_found).exists()

        scheme = SchemeFactory.build()
        response = client.put(self.get_url(id_not_found), data=self.to_json(scheme))

        error = {'detail': 'Учетные данные не были предоставлены.'}
        assert_response(response, 404, error)

    def test_partial_update(self, client):
        prev_name = 'prev'
        new_name = 'new'

        scheme = SchemeFactory(name=prev_name)
        for i in range(10):
            element = ElementFactory()
            scheme.elements.add(element)
        response = client.patch(self.get_url(scheme.id), data={'name': new_name})
        scheme.refresh_from_db()
        assert_response(response, 200, self.to_json(scheme))

    def test_noop_partial_update(self, client):
        scheme = SchemeFactory()
        for i in range(10):
            element = ElementFactory()
            scheme.elements.add(element)
        json = self.to_json(scheme)

        response = client.patch(self.get_url(scheme.id), data={})
        assert_response(response, 200, json)

    def test_partial_update_not_found(self, client):
        id_not_found = 404
        assert not Scheme.objects.filter(id=id_not_found).exists()

        response = client.patch(self.get_url(id_not_found), data={})

        error = {'detail': 'Учетные данные не были предоставлены.'}
        assert_response(response, 404, error)

    def test_destroy(self, client):
        scheme = SchemeFactory()
        for i in range(10):
            element = ElementFactory()
            scheme.elements.add(element)
        assert Scheme.objects.count() == 1

        response = client.delete(self.get_url(scheme.id))
        assert_response(response, 204)
        assert Scheme.objects.count() == 0

    def test_destroy_not_found(self, client):
        id_not_found = 404
        assert not Scheme.objects.filter(id=id_not_found).exists()

        response = client.delete(self.get_url(id_not_found))

        error = {'detail': 'Учетные данные не были предоставлены.'}
        assert_response(response, 404, error)
