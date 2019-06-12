import base64
import datetime

from lib.util import clean_dict, only_keys
from django.forms import model_to_dict


def model_to_json(test, model):
    return clean_dict(model_to_dict(model))


def user_to_json(test, user):
    json = model_to_json(test, user)
    birthday = json['birthday']
    if isinstance(birthday, datetime.date):
        json['birthday'] = birthday.isoformat()
    return json


def element_to_json(test, element):
    json = model_to_json(test, element)
    json['image'] = str(base64.b64encode(json['image'].read()))[2:-1]
    return json


def scheme_to_json(test, scheme, elements=()):
    json = model_to_json(test, scheme)
    json['elements'] = [{
        'id': scheme_element.element.id,
        'coordinates': scheme_element.coordinates,
        'name': scheme_element.name,
    } for scheme_element in tuple(scheme.schemeelement_set.all()) + tuple(elements)]
    return json
