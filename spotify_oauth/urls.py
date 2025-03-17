from django.urls import path
from . import views

urlpatterns =[
    path('spotify/login/', views.spotify_login, name='spotify_login'),
    path('', views.spotify_login, name='spotify_login'),
    path('callback/', views.spotify_callback, name='spotify_callback'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('logout/', views.spotify_logout, name='spotify_logout'),
]