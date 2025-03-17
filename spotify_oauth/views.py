from django.shortcuts import render, redirect
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
import time
from dotenv import load_dotenv
from django.http import HttpResponse
from .models import SpotifyToken # model for storing tokens

load_dotenv()

client_id = os.environ.get("SPOTIPY_CLIENT_ID")
client_secret = os.environ.get("SPOTIPY_CLIENT_SECRET")
redirect_uri = os.environ.get("SPOTIPY_REDIRECT_URI")

def spotify_login(request):
    """
    Initiates the Spotify OAuth flow
    """
    sp_oauth = SpotifyOAuth(
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=redirect_uri,
        scope="user-top-read",
    )
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

def spotify_callback(request):
    """
    Handles the callback from Spotify OAuth and stores the access token
    """
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
        refresh_token = token_info['refresh_token']
        expires_at = token_info['expires_at']

        sp = spotipy.Spotify(auth=access_token)
        user_profile = sp.me()
        spotify_user_id = user_profile['id']

        spotify_token, _ = SpotifyToken.objects.update_or_create(
            spotify_user_id=spotify_user_id,
            defaults={
                'access_token': access_token,
                'refresh_token': refresh_token,
                'expires_at': expires_at,
                'token_type':token_info.get('token_type', 'Bearer')
            }
        )

        # Store the spotify user id in session to identify the user
        request.session['spotify_user_id'] = spotify_user_id

        return redirect('home')
    except Exception as e:
        print(f"Error during token exchange: {e}")
        return HttpResponse(f"Authentication failed: {str(e)}")
    
def get_user_token(spotify_user_id):
    """
    Helper function to recieve a user's token
    """
    user_tokens = SpotifyToken.objects.filter(spotify_user_id=spotify_user_id)
    if user_tokens.exists():
        return user_tokens.first()
    return None

def refresh_spotify_token(token_model):
    """
    Refreshes an expired Spotify token
    """
    sp_oauth = SpotifyOAuth(
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=redirect_uri
    )
    refreshed_token = sp_oauth.refresh_access_token(token_model.refresh_token)

    token_model.access_token  = refreshed_token['access_token']
    token_model.expires_at = refreshed_token['expires_at']
    token_model.save()

def home(request):
    """
    Home page view that uses the stored token
    """
    spotify_user_id = request.session.get('spotify_user_id')

    if not spotify_user_id:
        return redirect('spotify_login')
    
    token = get_user_token(spotify_user_id)

    if not token:
        return redirect('spotify_login')
    
    if token.expires_at < int(time.time()):
        token = refresh_spotify_token(token)

    sp = spotipy.Spotify(auth=token.access_token, requests_timeout=10)

    top_tracks  = sp.current_user_top_tracks(limit=10, time_range='medium_term')
    user_profile = sp.me()

    context = {
        'user':user_profile,
        'top_tracks': top_tracks['items']
    }
    return render(request,'home.html', context)

def spotify_logout(request):
    """
    Clears the user's session and Spotify tokens
    """
    spotify_user_id = request.session.get('spotify_user_id')

    if spotify_user_id:
        SpotifyToken.objects.filter(spotify_user_id=spotify_user_id).delete()
    
    # Clear session
    if 'spotify_user_id' in request.session:
        del request.session['spotify_user_id']
        request.session.flush()
    
    return render(request, 'logout.html')