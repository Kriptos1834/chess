import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.exceptions import ObjectDoesNotExist
from asgiref.sync import sync_to_async
from .utils.database_async import update_database_object
from .models import GameRoom, Match


class MatchConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_code = self.scope['url_route']['kwargs']['room_code']
        self.room_group_name = f'game_{self.room_code}'

        try:
            room = await database_sync_to_async(GameRoom.objects.get)(room_code=self.room_code)
        except ObjectDoesNotExist:
            self.close(4004)
            return
        match, created = await database_sync_to_async(Match.objects.get_or_create)(room=room)
        
        if match.is_started:
            await self.close(4004)
            return
        else:
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()

        if created:
            await update_database_object(match, {
                'white_player_user_id': self.scope['session']['userid']
            })
        else:
            await update_database_object(match, {
                'black_player_user_id': self.scope['session']['userid']
            })
            await sync_to_async(match.start)()
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'start',
                    'black_player_user_id': match.black_player_user_id,
                    'white_player_user_id': match.white_player_user_id,
                }
            )

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)
        turn = text_data_json['turn']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'turn',
                'turn': turn,
            }
        )

    async def turn(self, event):
        turn = event['turn']

        await self.send(text_data=json.dumps({
            'turn': turn
        }))

    async def start(self, event):
        await self.send(text_data=json.dumps({
            'start': True,
            'white_player': event['white_player_user_id'],
            'black_player': event['black_player_user_id'],
        }))
    
    async def foo(self, event):
        await self.send(text_data=json.dumps({
            'foo': 'bar'
        }))

# class MatchConsumer(AsyncWebsocketConsumer):

#     async def connect(self):
#         print('HELLOO!!!')
#         await self.accept()

#     async def websocket_connect(self, event):
#         print('connected', event)
#         board_room = 'boardroom'

#         await self.channel_layer.group_add(
#             board_room,
#             self.channel_name
#         )

#         await self.send(
#             {"type": "websocket.accept"}
#         )

#     async def websocket_recieve(self, event):
#         drawing_data = event.get('text', None)
#         await self.channel_layer.group_send(
#             self.board_room,
#             {
#                 'type': 'board_message',
#                 'text': drawing_data
#             }
#         )

#     async def board_message(self, event):
#         await self.send({
#             'type': 'websocket_send',
#             'text': event['text']
#         })

#     async def websocket_disconnect(self, event):
#         print('disconnected', event)
