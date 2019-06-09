import random

from django.contrib.auth.hashers import make_password
from factory import DjangoModelFactory, LazyAttribute, LazyFunction
from mimesis import Person
from mimesis.builtins.ru import RussiaSpecProvider
from mimesis_factory import MimesisField


class UserFactory(DjangoModelFactory):
    class Meta:
        model = 'authentication.User'
        django_get_or_create = ('username', )

    username = MimesisField('username')
    password = make_password(Person().password())
    first_name = MimesisField('name')
    last_name = MimesisField('surname')
    patronymic = LazyFunction(lambda: RussiaSpecProvider().patronymic())
    birthday = MimesisField('formatted_date', fmt='%Y-%m-%d')
    date_joined = MimesisField('formatted_datetime', fmt='%Y-%m-%d %H:%M:%S.%f%z', timezone='UTC')
    last_login = MimesisField('formatted_datetime', fmt='%Y-%m-%d %H:%M:%S.%f%z', timezone='UTC')
    vk = LazyAttribute(
        lambda user: 'https://vk.com/{}'.format(random.choice((user.username, f'id{random.randint(1, 10**10)}')))
    )
    email = MimesisField('email')
