from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from apps.realtime.routing import routes as realtime_routes


application = AuthMiddlewareStack(
    ProtocolTypeRouter({
        'websocket': AllowedHostsOriginValidator(
            URLRouter(realtime_routes)
        )
    })
)
