def clean_dict(obj: dict) -> dict:
    return {k: v for k, v in obj.items() if v is not None}


def omit_keys(obj: dict, keys_to_omit) -> dict:
    return {k: v for k, v in obj.items() if k not in keys_to_omit}


def only_keys(obj: dict, keys) -> dict:
    return {k: v for k, v in obj.items() if k in keys}
