import pytest
from channels.db import database_sync_to_async

from apps.realtime.models.message import Message

pytestmark = pytest.mark.django_db


class TestChatConsumer:
    @pytest.mark.asyncio
    async def test_echo(self, connect_communicator, simple_user, simple_chat):
        assert simple_user
        assert await database_sync_to_async(Message.objects.count)() == 0

        url = f'/ws/chat/{simple_chat.pk}/'
        async with connect_communicator(url, user=simple_user) as communicator:
            data = {'message': 'Hello!'}
            await communicator.send_json_to(data)
            data['author_id'] = simple_user.id
            assert await communicator.receive_json_from() == data
            message = await database_sync_to_async(Message.objects.first)()
            assert message.text == data['message']
            assert message.author_id == simple_user.id
            assert message.chat_id == simple_chat.pk
