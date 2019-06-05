from django.core.management import BaseCommand
from django.db import transaction


class Transactional(BaseCommand):
    def before_transaction(self, *args, **kwargs):
        pass

    def transaction(self, *args, **kwargs):
        raise NotImplementedError()

    def after_transaction(self, *args, **kwargs):
        pass

    def handle(self, *args, **kwargs):
        try:
            self.before_transaction(*args, **kwargs)
            with transaction.atomic():
                self.transaction(*args, **kwargs)
        finally:
            self.after_transaction(*args, **kwargs)
