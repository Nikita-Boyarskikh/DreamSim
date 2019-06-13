from collections import defaultdict

from rest_framework.exceptions import NotFound

from apps.core.models import Element, SchemeElement


def create_scheme_elements_for_scheme(scheme, scheme_elements_data):
    scheme_element_data_by_id = defaultdict(list)
    for data in scheme_elements_data:
        scheme_element_data_by_id[data['element']['id']].append(data)

    element_ids = list(scheme_element_data_by_id.keys())
    elements = Element.objects.filter(id__in=element_ids).all()
    element_by_id = {element.id: element for element in elements}
    missing_element_ids = set(element_ids) - set(element_by_id.keys())

    if missing_element_ids:
        raise NotFound(f'Элементы {", ".join(map(str, missing_element_ids))} не найдены')

    scheme_elements = []
    for element_id in element_ids:
        element = element_by_id[element_id]
        scheme_element_data = scheme_element_data_by_id[element_id]

        for data in scheme_element_data:
            scheme_element = SchemeElement(
                element=element,
                scheme=scheme,
                name=data.get('name') or element.name,
                coordinates=data['coordinates']
            )
            scheme_elements.append(scheme_element)

    SchemeElement.objects.bulk_create(scheme_elements)
