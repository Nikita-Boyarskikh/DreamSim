import pytest


class TestChatConsumer:
    chat_id = 123
    url = f'/ws/chat/{chat_id}/'

    @pytest.mark.asyncio
    @pytest.mark.django_db
    async def test_echo(self, connect_communicator, simple_user):
        assert simple_user
        async with connect_communicator(self.url) as communicator:
            data = {'message': 'Hello!'}
            await communicator.send_json_to(data)
            assert await communicator.receive_json_from() == data
