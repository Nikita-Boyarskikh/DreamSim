import random
import string

from factory import LazyFunction, DjangoModelFactory, LazyAttribute, Faker, fuzzy, django, SubFactory

from apps.authentication.tests.factories import UserFactory
from apps.core.models.element import ElementType


class ElementFactory(DjangoModelFactory):
    class Meta:
        model = 'core.Element'

    name = Faker('sentence', nb_words=2)
    element_type = fuzzy.FuzzyChoice([_el.name for _el in ElementType])
    array_of_inputs = LazyFunction(lambda: [random.choice(string.ascii_uppercase) for _ in range(random.randint(0, 10))])
    array_of_outputs = LazyFunction(lambda: [random.choice(string.ascii_uppercase) for _ in range(random.randint(1, 10))])
    time = LazyFunction(lambda: random.randint(0, 1000))
    delay = LazyFunction(lambda: random.randint(0, 1000))
    image = django.ImageField()
    truth_table = LazyAttribute(lambda element: [[[random.randint(0, 1) for _ in range(2**len(element.array_of_inputs))] for _ in range(len(element.array_of_outputs))] for _ in range(random.randint(0, 10))])


class SchemeFactory(DjangoModelFactory):
    class Meta:
        model = 'core.Scheme'

    name = Faker('sentence', nb_words=2)
    formula = Faker('sentence', nb_words=2)
    creator = SubFactory(UserFactory)


class SchemeElementFactory(DjangoModelFactory):
    class Meta:
        model = 'core.SchemeElement'

    name = Faker('sentence', nb_words=2)
    coordinates = LazyFunction(lambda: [random.randint(0, 100), random.randint(0, 100)])
    scheme = SubFactory(SchemeFactory)
    element = SubFactory(ElementFactory)
