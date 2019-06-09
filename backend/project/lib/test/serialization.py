import datetime, json

from lib.util import clean_dict, only_keys
from django.forms import model_to_dict


def model_to_json(model):
    return clean_dict(model_to_dict(model))

def user_to_json(user):
    model_json = model_to_json(user)
    birthday = model_json['birthday']
    if isinstance(birthday, datetime.date):
        model_json['birthday'] = birthday.isoformat()
    json = only_keys(
        model_json,
        {'id', 'username', 'email', 'birthday', 'first_name', 'last_name', 'vk', 'patronymic'}
    )
    return json
