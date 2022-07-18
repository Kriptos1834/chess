import string
import random

from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from chessgame.models import GameRoom


def generate_room_id(length: int) -> str:
    char_pool = string.ascii_lowercase + string.ascii_uppercase + string.digits
    return ''.join([random.choice(char_pool) for i in range(length)])


def get_room(**kwargs) -> dict:
    room = get_object_or_404(GameRoom, **kwargs)
    return model_to_dict(room, [field.name for field in room._meta.fields])