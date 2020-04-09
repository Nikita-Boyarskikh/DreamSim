import pytest

pytestmark = pytest.mark.django_db


class TestPointerTrackerConsumer:
    scheme_id = 123
    url = f'/ws/pointer-tracker/{scheme_id}/'

    @pytest.mark.asyncio
    async def test_track(self, connect_communicator, simple_user):
        assert simple_user
        async with connect_communicator(self.url, user=simple_user) as communicator:
            data = {'x': 1, 'y': 2, 'sender_id': simple_user.id}
            await communicator.send_json_to(data)
            assert await communicator.receive_json_from() == data
