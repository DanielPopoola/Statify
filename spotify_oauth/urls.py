from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.spotify_login, name='spotify_login'),
    path('', views.home, name='home'),
    path('callback', views.spotify_callback, name='spotify_callback')
]