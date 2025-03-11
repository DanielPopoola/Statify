from django.urls import path
from . import views

urlpatterns = [
    path('logout/', views.logout, name='logout'),
    path('', views.spotify_login, name='spotify_login'),
    path('home/', views.home, name='home'),
    path('callback/', views.spotify_callback, name='spotify_oauth/callback/')
]