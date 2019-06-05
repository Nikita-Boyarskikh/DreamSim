from django.core.management import call_command

from lib.management.commands.transactional import Transactional

FIXTURES = [
    'units',
    'tags',
    'instituts',
    'groups',
    'users',
    'elements',
    'element_parameters',
    'schemes',
    'scheme_tags',
    'scheme_elements',
    'scheme_links',
]


class Command(Transactional):
    def transaction(self, *args, **kwargs):
        for fixture in FIXTURES:
            print(f'Loading fixture: {fixture}')
            call_command('loaddata', fixture)
