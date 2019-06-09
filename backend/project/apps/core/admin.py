from django.contrib import admin
from apps.core.models.tag import Tag
from apps.core.models.element import Element
from apps.core.models.scheme import Scheme
from apps.core.models.scheme_element import SchemeElement
from apps.core.models.element_parameter import ElementParameter
from apps.authentication.models.group import Group
from apps.core.models.scheme_link import SchemeLink
from apps.core.models.scheme_tag import SchemeTag
from apps.core.models.unit import Unit

admin.site.register(Tag)
admin.site.register(Element)
admin.site.register(Scheme)
admin.site.register(SchemeElement)
admin.site.register(ElementParameter)
admin.site.register(Group)
admin.site.register(SchemeLink)
admin.site.register(SchemeTag)
admin.site.register(Unit)
