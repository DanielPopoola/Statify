// ArtistsGrid.js
const ArtistsGrid = ({ artists }) => {
    if (!artists || artists.length === 0) {
      return (
        <div className="no-data">
          No artists found for this time range.
        </div>
      );
    }
  
    return (
      <div className="items-grid">
        {artists.map((artist, index) => (
          <ArtistCard key={index} artist={artist} index={index} />
        ))}
      </div>
    );
  };