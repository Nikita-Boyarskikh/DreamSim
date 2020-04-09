from channels.generic.websocket import AsyncJsonWebsocketConsumer

from lib.util import omit_keys

CHAT_MESSAGE_TYPE = 'chat.message'


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if not self.user.is_authenticated:
            return await self.close()

        self.chat_id = self.scope['url_route']['kwargs']['chat_pk']
        self.group_name = f'chat_for_scheme_{self.chat_id}'

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, message):
        if self.user.is_authenticated:
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        message = content.get('message')
        if not message:
            return

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': CHAT_MESSAGE_TYPE,
                'message': message,
                'author_id': self.user.id
            }
        )

    async def chat_message(self, event):
        await self.send_json(
            omit_keys(event, {'type'})
        )
