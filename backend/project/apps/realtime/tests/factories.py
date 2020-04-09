from factory import DjangoModelFactory, Faker, SubFactory

from apps.authentication.tests.factories import UserFactory
from apps.core.tests.factories import SchemeFactory


class ChatFactory(DjangoModelFactory):
    class Meta:
        model = 'realtime.Chat'

    scheme = SubFactory(SchemeFactory)


class MessageFactory(DjangoModelFactory):
    class Meta:
        model = 'realtime.Message'

    text = Faker('sentence')
    author = SubFactory(UserFactory)
    chat = SubFactory(ChatFactory)
