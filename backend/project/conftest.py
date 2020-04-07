import pytest

# Suppress warnings about import from package and about star import
from lib.test.fixtures import *  # noqa: F401,F403 pylint: disable=wildcard-import

pytest.register_assert_rewrite('lib.test.utils')
pytest.register_assert_rewrite('lib.test.channelstestcase')
