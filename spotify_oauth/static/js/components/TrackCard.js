// TrackCard.js
const TrackCard = ({ track, index }) => {
  return (
    <div className="card">
      <div className="card-img">
        {track.album_image ? (
          <img src={track.album_image} alt={track.album_name} />
        ) : (
          <span>🎵</span>
        )}
        <div className="rank">{index + 1}</div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{track.track_name}</h3>
        <p className="card-subtitle">{track.artist_name}</p>
        <p className="card-subtitle">Album: {track.album_name}</p>
        <div className="card-meta">
          <span className="card-badge">Popularity: {track.popularity}</span>
          <a href={track.spotify_url} target="_blank" className="spotify-link">
            Listen on Spotify
          </a>
        </div>
        <div className="genres">
          {track.genres.map((genre, i) => (
            <span key={i} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};