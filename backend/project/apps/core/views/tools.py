from apps.core.models.tools import ToolNames
from lib.api.views import EnumApiView


class ToolNamesApiView(EnumApiView):
    enum_class = ToolNames
