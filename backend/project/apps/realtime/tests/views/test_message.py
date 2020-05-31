import pytest

from apps.core.tests.factories import SchemeFactory
from apps.realtime.models.message import Message
from apps.realtime.services.message import read_message
from apps.realtime.tests.factories import ChatFactory, MessageFactory
from lib.test.serialization import message_to_json
from lib.test.utils import assert_response
from lib.test.viewtestcase import ViewTestCase

pytestmark = pytest.mark.django_db


class TestMessageViewSet(ViewTestCase):
    scheme_id = 123
    base_url = f'/api/v1/scheme/{scheme_id}/chat/'
    allowed_keys = {'id', 'author', 'text', 'chat_id', 'read'}
    serialization_method = message_to_json

    def get_chat(self, user):
        scheme = SchemeFactory(id=self.scheme_id, creator=user)
        return ChatFactory(scheme=scheme)

    def test_list(self, client, fs, simple_user):
        assert simple_user

        chat = self.get_chat(simple_user)
        response = client.get(self.get_url())
        assert_response(response, 200)
        assert response.data['count'] == Message.objects.count() == 0

        my_message = MessageFactory(chat=chat, author=simple_user)
        other_message = MessageFactory(chat=chat)

        response = client.get(self.get_url())
        assert_response(response, 200)
        assert response.data['count'] == Message.objects.count() == 2
        # ordered by created desc
        assert response.data['results'][0]['id'] == other_message.id
        assert response.data['results'][1]['id'] == my_message.id

    def test_get_unread_messages(self, client, fs, simple_user):
        assert simple_user

        chat = self.get_chat(simple_user)
        MessageFactory(chat=chat, author=simple_user)
        other_message = MessageFactory(chat=chat)
        message_to_read = MessageFactory(chat=chat)
        read_message(message_to_read, simple_user)

        response = client.get(self.get_url() + 'unread/')
        assert_response(response, 200)
        assert Message.objects.count() == 3
        assert response.data['count'] == 1
        assert response.data['results'][0]['id'] == other_message.id

    def test_read(self, client, simple_user):
        assert simple_user

        chat = self.get_chat(simple_user)
        message = MessageFactory(chat=chat)
        assert not message.is_read(simple_user.id)

        response = client.post(self.get_url() + f'{message.id}/read/')
        assert_response(response, 200)
        assert message.is_read(simple_user.id)

    # def test_read_404(self, client, simple_user):
    #     assert simple_user
    #     not_exists_id = 404
    #
    #     self.get_chat(simple_user)
    #     assert not Message.objects.filter(id=not_exists_id).exists()
    #     response = client.post(self.get_url() + f'{not_exists_id}/read/')
    #     assert_response(response, 404)
