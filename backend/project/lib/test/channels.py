from channels.testing import WebsocketCommunicator

from routing import application


async def connect_communicator(url, timeout=1):
    communicator = WebsocketCommunicator(application, url)
    connected, subprotocol = await communicator.connect(timeout)
    assert connected, f'Channels connection failed: {url}'
    return communicator
