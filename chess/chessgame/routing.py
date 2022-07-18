from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/game/<slug:room_code>', consumers.MatchConsumer.as_asgi()),
]