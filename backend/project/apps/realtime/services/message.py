from django.db import transaction
from django.db.models import Q

from apps.realtime.models.message_reader import MessageReader


@transaction.atomic
def read_message(message, reader):
    MessageReader.objects.create(message=message, reader=reader, read=True)


def read_messages_query(user):
    return Q(messagereader__read=True) & Q(messagereader__reader=user) | Q(author=user)
