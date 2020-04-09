from contextlib import asynccontextmanager

import pytest


@pytest.fixture
def connect_communicator():
    from lib.test.channels import connect_communicator

    @asynccontextmanager
    async def communicator_manager(url, timeout=1, user=None):
        communicator = await connect_communicator(url, timeout, user)
        try:
            yield communicator
        finally:
            await communicator.disconnect(timeout)

    return communicator_manager
