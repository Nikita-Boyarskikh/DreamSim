from contextlib import asynccontextmanager

import pytest

from apps.core.tests.factories import SchemeFactory
from apps.realtime.tests.factories import ChatFactory


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


@pytest.fixture
def simple_chat(simple_user):
    scheme = SchemeFactory(creator=simple_user)
    return ChatFactory(scheme=scheme)
