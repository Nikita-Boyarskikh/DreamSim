import pytest
from django.core.exceptions import ValidationError

from lib.test.utils import create_validation_message

pytestmark = pytest.mark.django_db


class TestUser:
    def test_vk_validation(self, simple_user):
        expected_errors = {'vk': ['Введите корректный URL.', 'Ссылка должна вести на профиль vk.com']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            simple_user.vk = 'wrong value'
            simple_user.full_clean()

        expected_errors = {'vk': ['Ссылка должна вести на профиль vk.com']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            simple_user.vk = 'https://wrong-url.ru'
            simple_user.full_clean()

        expected_errors = {'vk': ['Ссылка должна вести на профиль vk.com']}
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            simple_user.vk = 'https://vk.com'
            simple_user.full_clean()

        simple_user.vk = 'https://vk.com/profile'
        simple_user.full_clean()
