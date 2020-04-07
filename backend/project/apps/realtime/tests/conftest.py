# Suppress warnings about import from package and about star import
from apps.authentication.tests.fixtures import *  # noqa: F401,F403 pylint: disable=wildcard-import
from apps.realtime.tests.fixtures import *  # noqa: F401,F403 pylint: disable=wildcard-import
