// ArtistCard.js
const ArtistCard = ({ artist, index }) => {
  return (
    <div className="card">
      <div className="card-img">
        {artist.image ? (
          <img src={artist.image} alt={artist.name} />
        ) : (
          <span>👤</span>
        )}
        <div className="rank">{index + 1}</div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{artist.name}</h3>
        <div className="card-meta">
          <span className="card-badge">Followers: {artist.followers.toLocaleString()}</span>
          <span className="card-badge">Popularity: {artist.popularity}</span>
        </div>
        <div className="genres">
          {artist.genres.map((genre, i) => (
            <span key={i} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
        <div className="card-meta" style={{ marginTop: '10px' }}>
          <a href={artist.spotify_url} target="_blank" className="spotify-link">
            View on Spotify
          </a>
        </div>
      </div>
    </div>
  );
};