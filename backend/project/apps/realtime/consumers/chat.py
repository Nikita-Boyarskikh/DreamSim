from channels.generic.websocket import AsyncJsonWebsocketConsumer

CHAT_MESSAGE_TYPE = 'chat.message'


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.group_name = f'chat_for_scheme_{self.chat_id}'

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, message):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        message = content['message']

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': CHAT_MESSAGE_TYPE,
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send_json({
            'message': message
        })
