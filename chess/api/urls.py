from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('session/get', views.get_session_var),

    path('room/create', views.new_game_room, name='new-room'),
    path('rooms', views.GameRoomList.as_view(), name='get-room'),
    
    path('matches', views.MatchList.as_view()),
]