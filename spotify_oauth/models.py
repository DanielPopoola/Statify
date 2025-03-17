from django.db import models


class SpotifyToken(models.Model):
    """

    """
    spotify_user_id = models.CharField(max_length=150, unique=True)
    access_token = models.TextField()
    refresh_token = models.TextField()
    expires_at = models.IntegerField()
    token_type = models.CharField(max_length=50, default='Bearer')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.spotify_user_id}'s Spotify Token"
    
class UserTrack(models.Model):
    spotify_user_id = models.CharField(max_length=255)
    track_name = models.CharField(max_length=255)
    artist_name = models.CharField(max_length=255)
    album_name = models.CharField(max_length=255)
    track_popularity = models.IntegerField()
    track_url = models.URLField()
    time_range = models.CharField(max_length=50, choices=[('short_term', 'Short Term'), 
                                                           ('medium_term', 'Medium Term'), 
                                                           ('long_term', 'Long Term')])
    artist_genres = models.TextField(blank=True)
    retrieved_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.track_name} - {self.artist_name} ({self.time_range})"
