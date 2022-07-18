from chessgame.models import Match, GameRoom
from rest_framework import serializers


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'


class GameRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameRoom
        fields = '__all__'

        
# class MatchSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     room_id = serializers.IntegerField()
#     black_player_id = serializers.IntegerField()
#     white_player_id = serializers.IntegerField()
#     is_started = serializers.BooleanField(required=False)
#     is_ended = serializers.BooleanField(required=False)

#     def create(self, validated_data):
#         return Match.objects.create(**validated_data)
    
#     def update(self, instance, validated_data):
#         instance.room = GameRoom.objects.get(validated_data.get('room_id', instance.room.id))
#         instance.black_player = User.objects.get(validated_data.get('balck_player_id', instance.black_player.id))
#         instance.white_player = User.objects.get(validated_data.get('white_player_id', instance.white_player.id))
        
#         if validated_data.get('is_started', False):
#             instance.start()

#         instance.is_ended = validated_data.get('is_started', instance.is_ended)
#         instance.save()
#         return instance