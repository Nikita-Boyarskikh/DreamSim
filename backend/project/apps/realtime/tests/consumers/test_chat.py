import pytest

pytestmark = pytest.mark.django_db


class TestChatConsumer:
    chat_id = 123
    url = f'/ws/chat/{chat_id}/'

    @pytest.mark.asyncio
    async def test_echo(self, connect_communicator, simple_user):
        assert simple_user
        async with connect_communicator(self.url, user=simple_user) as communicator:
            data = {'message': 'Hello!'}
            await communicator.send_json_to(data)
            data['author_id'] = simple_user.id
            assert await communicator.receive_json_from() == data
