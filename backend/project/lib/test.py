import json


def create_validation_message(error):
    return json.dumps(error, ensure_ascii=False).replace('\"', '\'').replace('[', '\\[').replace('{', '\\{')
