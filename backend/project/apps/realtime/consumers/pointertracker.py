from channels.generic.websocket import AsyncJsonWebsocketConsumer

from lib.util import omit_keys

POINTER_MOVED_TYPE = 'pointer.moved'


class PointerTrackerConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.scheme_id = self.scope['url_route']['kwargs']['scheme_pk']
        self.group_name = f'pointer_tracker_for_scheme_{self.scheme_id}'

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, message):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        x, y = content.get('x'), content.get('y')
        if not x or not y:
            return

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': POINTER_MOVED_TYPE,
                'sender_id': self.scope['user'].id,
                'x': x,
                'y': y
            }
        )

    async def pointer_moved(self, event):
        await self.send_json(
            omit_keys(event, {'type'})
        )
