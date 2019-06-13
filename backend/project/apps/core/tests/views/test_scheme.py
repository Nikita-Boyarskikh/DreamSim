import pytest

from apps.authentication.tests.factories import UserFactory
from apps.core.models import Scheme, SchemeElement
from apps.core.tests.factories import SchemeFactory, SchemeElementFactory, ElementFactory
from lib.test.serialization import scheme_to_json
from lib.test.utils import assert_response
from lib.test.viewtestcase import ViewTestCase

pytestmark = pytest.mark.django_db


class TestSchemeViewSet(ViewTestCase):
    base_url = '/api/v1/scheme/'
    allowed_keys = {'id', 'name', 'formula', 'creator', 'elements'}
    element_allowed_keys = {'id', 'name', 'coordinates'}
    serialization_method = scheme_to_json

    def test_list(self, client, fs):
        response = client.get(self.get_url())
        assert response.status_code == 200
        assert len(response.data) == Scheme.objects.count() == 0

        scheme = SchemeFactory()
        SchemeElementFactory(scheme=scheme)
        response = client.get(self.get_url())
        assert_response(response, 200)

        assert len(response.data) == Scheme.objects.count() == 1
        assert response.data[0]['id'] == scheme.id

    def test_retrieve(self, client, fs):
        scheme = SchemeFactory()
        elements = []
        for i in range(2):
            element = SchemeElementFactory(scheme=scheme)
            elements.append(element)
        response = client.get(self.get_url(scheme.id))

        data = {
            'id': scheme.id,
            'name': scheme.name,
            'formula': scheme.formula,
            'creator': scheme.creator.id,
            'elements': [{
                'id': el.element.id,
                'name': el.name,
                'coordinates': el.coordinates
            } for el in reversed(elements)]
        }
        assert_response(response, 200, data)

    def test_retrieve_not_found(self, client):
        id_not_found = 404
        assert not Scheme.objects.filter(id=id_not_found).exists()
        response = client.get(self.get_url(id_not_found))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_create(self, client, fs):
        user = UserFactory()
        client.force_login(user)

        element1 = ElementFactory()
        element2 = ElementFactory()
        scheme = SchemeFactory.build()
        elements = [
            SchemeElementFactory.build(scheme=scheme, element=element1),
            SchemeElementFactory.build(scheme=scheme, element=element2),
            SchemeElementFactory.build(scheme=scheme, element=element2),
        ]

        json = self.serialize(scheme, elements)
        response = client.post(self.get_url(), data=json, content_type='application/json')
        data = response.json()

        scheme = Scheme.objects.get(id=data['id'])
        assert_response(response, 201, self.serialize(scheme))

    def test_update(self, client, fs):
        user = UserFactory()
        client.force_login(user)

        prev_name = 'prev'
        new_name = 'new'

        scheme = SchemeFactory(name=prev_name)
        SchemeElementFactory(scheme=scheme)
        json = self.serialize(scheme)
        json['name'] = new_name

        response = client.put(self.get_url(scheme.id), data=json, content_type='application/json')
        scheme.refresh_from_db(fields={'name'})
        json = self.serialize(scheme)
        assert_response(response, 200, json)

    def test_noop_update(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        scheme = SchemeFactory()
        SchemeElementFactory(scheme=scheme)
        json = self.serialize(scheme)

        response = client.put(self.get_url(scheme.id), data=json, content_type='application/json')
        json = self.serialize(scheme)
        assert_response(response, 200, json)

    def test_update_not_found_elements(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        scheme = SchemeFactory()
        SchemeElementFactory(scheme=scheme)
        json = self.serialize(scheme)
        json['elements'][0]['id'] = 404

        assert SchemeElement.objects.filter(element_id=404).count() == 0

        response = client.put(self.get_url(scheme.id), data=json, content_type='application/json')
        error = {'detail': f'Элементы {404} не найдены'}
        assert_response(response, 404, error)

    def test_update_not_found(self, client):
        user = UserFactory()
        client.force_login(user)
        id_not_found = 404
        assert not Scheme.objects.filter(id=id_not_found).exists()

        scheme = SchemeFactory.build()
        response = client.put(self.get_url(id_not_found), data=self.serialize(scheme), content_type='application/json')

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_partial_update(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        prev_name = 'prev'
        new_name = 'new'

        scheme = SchemeFactory(name=prev_name)
        SchemeElementFactory(scheme=scheme)
        response = client.patch(self.get_url(scheme.id), data={'name': new_name}, content_type='application/json')
        scheme.refresh_from_db(fields={'name'})
        assert_response(response, 200, self.serialize(scheme))

    def test_noop_partial_update(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        scheme = SchemeFactory()
        SchemeElementFactory(scheme=scheme)

        response = client.patch(self.get_url(scheme.id), data={}, content_type='application/json')
        json = self.serialize(scheme)
        assert_response(response, 200, json)

    def test_partial_update_not_found_elements(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        scheme = SchemeFactory()
        SchemeElementFactory(scheme=scheme)
        json = self.serialize(scheme)
        json['elements'][0]['id'] = 404

        assert SchemeElement.objects.filter(element_id=404).count() == 0

        response = client.patch(self.get_url(scheme.id), data=json, content_type='application/json')
        error = {'detail': f'Элементы {404} не найдены'}
        assert_response(response, 404, error)

    def test_partial_update_not_found(self, client):
        user = UserFactory()
        client.force_login(user)
        id_not_found = 404
        assert not Scheme.objects.filter(id=id_not_found).exists()

        response = client.patch(self.get_url(id_not_found), data={}, content_type='application/json')

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)

    def test_destroy(self, client, fs):
        user = UserFactory()
        client.force_login(user)
        scheme = SchemeFactory()
        for i in range(2):
            SchemeElementFactory(scheme=scheme)
        assert Scheme.objects.count() == 1
        assert SchemeElement.objects.count() == 2

        response = client.delete(self.get_url(scheme.id))
        assert_response(response, 204)
        assert Scheme.objects.count() == 0
        assert SchemeElement.objects.count() == 0

    def test_destroy_not_found(self, client):
        user = UserFactory()
        client.force_login(user)
        id_not_found = 404
        assert not Scheme.objects.filter(id=id_not_found).exists()

        response = client.delete(self.get_url(id_not_found))

        error = {'detail': 'Не найдено.'}
        assert_response(response, 404, error)
