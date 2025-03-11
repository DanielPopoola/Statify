from django.db import models


class SpotifyToken(models.Model):
    spotify_user_id = models.CharField(max_length=150, unique=True)
    access_token = models.TextField()
    refresh_token = models.TextField()
    expires_at = models.IntegerField()
    token_type = models.CharField(max_length=50, default='Bearer')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.spotify_user_id}'s Spotify Token"