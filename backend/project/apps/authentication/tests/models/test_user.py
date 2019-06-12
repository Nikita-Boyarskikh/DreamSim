import pytest
from django.core.exceptions import ValidationError

from apps.authentication.tests.factories import UserFactory
from lib.test.utils import create_validation_message

pytestmark = pytest.mark.django_db


class TestUser:
    def test_vk_validation(self):
        user = UserFactory.build(vk='wrong value')
        expected_errors = {'vk': ['Введите корректный URL.', 'Ссылка должна вести на профиль vk.com']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            user.full_clean()

        user = UserFactory.build(vk='https://wrong-url.ru')
        expected_errors = {'vk': ['Ссылка должна вести на профиль vk.com']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            user.full_clean()

        user = UserFactory.build(vk='https://vk.com')
        expected_errors = {'vk': ['Ссылка должна вести на профиль vk.com']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            user.full_clean()

        user = UserFactory.build(vk='https://vk.com/profile')
        user.full_clean()
