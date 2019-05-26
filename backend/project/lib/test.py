import json


def create_validation_message(error):
    message = json.dumps(error, ensure_ascii=False).replace('\"', '\'')
    chars_to_escape = '[{(?*+-|^$.&~'
    for char in chars_to_escape:
        message = message.replace(char, f'\\{char}')
    return message
