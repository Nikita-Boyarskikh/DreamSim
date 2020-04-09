from channels.testing import WebsocketCommunicator

from routing import application


async def connect_communicator(url, timeout=1, user=None):
    communicator = WebsocketCommunicator(application, url)
    if user:
        communicator.scope['user'] = user
    connected, subprotocol = await communicator.connect(timeout)
    assert connected, f'Channels connection failed: {url}'
    return communicator
