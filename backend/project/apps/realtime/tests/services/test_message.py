import pytest

from apps.realtime.models.message import Message
from apps.realtime.models.message_reader import MessageReader
from apps.realtime.services.message import read_message, read_messages_query
from apps.realtime.tests.factories import MessageFactory

pytestmark = pytest.mark.django_db


def test_read_message(simple_user):
    message = MessageFactory()
    assert not message.is_read(simple_user.id)

    read_message(message, simple_user)
    assert message.is_read(simple_user.id)

    message = MessageFactory(author=simple_user)
    assert message.is_read(simple_user.id)


def test_read_messages_query(simple_user):
    MessageFactory()
    message_to_read = MessageFactory()
    read_message(message_to_read, simple_user)
    MessageFactory(author=simple_user)

    query = read_messages_query(simple_user)
    assert Message.objects.count() == 3
    assert Message.objects.filter(~query).count() == 1, MessageReader.objects.all()
