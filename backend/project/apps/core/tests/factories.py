import random
import string

import factory
from factory import LazyFunction, DjangoModelFactory, LazyAttribute
from mimesis_factory import MimesisField

from apps.core.models.element import ElementType


class ElementFactory(DjangoModelFactory):
    class Meta:
        model = 'core.Element'

    name = factory.Faker('sentence', nb_words=2)
    element_type = factory.fuzzy.FuzzyChoice([_el.name for _el in ElementType])
    array_of_inputs = LazyFunction(lambda: [random.choice(string.ascii_uppercase) for _ in range(random.randint(0, 100))])
    array_of_outputs = LazyFunction(lambda: [random.choice(string.ascii_uppercase) for _ in range(random.randint(0, 100))])
    time = LazyFunction(lambda: random.randint(0, 1000))
    delay = LazyFunction(lambda: random.randint(0, 1000))
    image = factory.django.ImageField()
    truth_table = LazyAttribute(lambda element: [[[random.randint(1) for _ in range(2**len(element.array_of_inputs))] for _ in range(len(element.array_of_outputs))] for _ in range(random.randint(1000))])


class SchemeFactory(DjangoModelFactory):
    class Meta:
        model = 'core.Scheme'

    name = factory.Faker('sentence', nb_words=2)
    formula = factory.Faker('sentence', nb_words=2)
    creator = username = MimesisField('username')
    elements = LazyFunction(lambda: [random.randint(100) for _ in range(random.randint(0, 10))])
