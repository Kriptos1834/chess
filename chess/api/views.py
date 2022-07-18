from urllib import request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, status
from chessgame.models import GameRoom, Match
from chessgame.serializers import MatchSerializer, GameRoomSerializer
from .utils.game_room import generate_room_id
from django.core.exceptions import FieldError


@api_view(['GET'])
def get_routes(request):

    routes = []
    return Response(routes)


@api_view(['GET'])
def new_game_room(request):
    data = {'room_code': generate_room_id(10)}
    GameRoom.objects.create(**data)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_session_var(request, *args, **kwargs):
    if 'key' in request.query_params:
        if not request.query_params['key'] in request.session:
            return Response(
                {
                    'error':
                    f'KeyError: key <{request.query_params["key"]} does not exist in your session.>'
                },
                status=status.HTTP_400_BAD_REQUEST)
        data = {
            request.query_params['key']: request.session[request.query_params['key']]
        }
        return Response(data, status=status.HTTP_200_OK)
    return Response({'error': '<key> parameter is required.'},
                    status=status.HTTP_400_BAD_REQUEST)


class CustomListAPIView(generics.ListAPIView):

    def get_queryset(self):
        queryset = self.model.objects.all()

        if self.request.query_params:
            query_params = {
                key: int(value) if value.isnumeric() else value
                for key, value in self.request.query_params.items()
            }

            queryset = queryset.filter(**query_params)
        return queryset

    def get(self, request):
        try:
            data = self.serializer_class(self.get_queryset(), many=True).data
        except FieldError as e:
            return Response({'error': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response(data, status=status.HTTP_200_OK)


# class MatchList(generics.ListAPIView):
#     serializer_class = MatchSerializer

#     def get_queryset(self):
#         queryset = Match.objects.all()

#         if self.request.query_params:
#             query_params = {
#                 key: int(value) if value.isnumeric() else value
#                 for key, value in self.request.query_params.items()
#             }

#             queryset = queryset.filter(**query_params)
#         return queryset

#     def get(self, request):
#         try:
#             data = self.serializer_class(self.get_queryset(), many=True).data
#         except FieldError as e:
#             return Response({'error': str(e)},
#                             status=status.HTTP_400_BAD_REQUEST)

#         return Response(data, status=status.HTTP_200_OK)


class GameRoomList(CustomListAPIView):
    serializer_class = GameRoomSerializer
    model = GameRoom


class MatchList(CustomListAPIView):
    serializer_class = MatchSerializer
    model = Match


# class GameRoomList(generics.ListAPIView):
#     serializer_class = GameRoomSerializer

#     def get_queryset(self):
#         queryset = GameRoom.objects.all()

#         if self.request.query_params:
#             query_params = {
#                 key: int(value) if value.isnumeric() else value
#                 for key, value in self.request.query_params.items()
#             }

#             queryset = queryset.filter(**query_params)
#         return queryset

#     def get(self, request):
#         try:
#             data = self.serializer_class(self.get_queryset(), many=True).data
#         except FieldError as e:
#             return Response({'error': str(e)},
#                             status=status.HTTP_400_BAD_REQUEST)

#         return Response(data, status=status.HTTP_200_OK)