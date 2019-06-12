from lib.util import only_keys


class ViewTestCase:
    base_url = None
    allowed_keys = {}
    serialization_method = None

    def get_url(self, model_id=None):
        if model_id is None:
            return self.base_url
        else:
            return self.base_url + f'{model_id}/'

    def serialize(self, *args, **kwargs):
        json = self.serialization_method(*args, **kwargs)
        json = only_keys(
            json,
            self.allowed_keys
        )
        return json
