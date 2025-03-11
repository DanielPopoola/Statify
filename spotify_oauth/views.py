from django.shortcuts import render, redirect
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
import requests
from dotenv import load_dotenv

load_dotenv()

client_id = os.environ.get("SPOTIPY_CLIENT_ID")
client_secret = os.environ.get("SPOTIPY_CLIENT_SECRET")
redirect_uri = os.environ.get("SPOTIPY_REDIRECT_URI")

def spotify_callback(request):
    code = request.GET.get('code')

    sp_oauth = SpotifyOAuth(
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=redirect_uri,
        scope="user-top-read",
        state=request.GET.get('state')
    )

    try:
        token_info = sp_oauth.get_access_token(code)
        access_token = token_info['access_token']
        
        sp = spotipy.Spotify(auth=access_token)
        user_profile = sp.me()
        print(user_profile)
        
        return redirect('templates/home.html')
    except Exception as e:
        print(f"Error during token exchange: {e}")
        return redirect('templates/home.html')