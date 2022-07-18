from django.db import models
from django.contrib.auth.models import User
from .exceptions import MissingValue


class GameRoom(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    room_code = models.CharField(max_length=10, unique=True)
    is_open = models.BooleanField(default=True)

class Match(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey(GameRoom, on_delete=models.SET_NULL, null=True)
    # black_player = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='matches_as_black')
    black_player = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='matches_as_black')
    # white_player = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='matches_as_white')
    white_player_user_id = models.CharField(max_length=50, null=True)
    black_player_user_id = models.CharField(max_length=50, null=True)
    is_started = models.BooleanField(default=False)
    is_ended = models.BooleanField(default=False)

    def start(self):
        if self.black_player_user_id and self.white_player_user_id:
            self.is_started = True
            self.save()
        else:
            raise MissingValue('Can not start match unless both players are connected.')