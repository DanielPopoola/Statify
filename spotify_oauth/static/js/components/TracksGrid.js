// TracksGrid.js
const TracksGrid = ({ tracks }) => {
    if (!tracks || tracks.length === 0) {
      return (
        <div className="no-data">
          No tracks found for this time range.
        </div>
      );
    }
  
    return (
      <div className="items-grid">
        {tracks.map((track, index) => (
          <TrackCard key={index} track={track} index={index} />
        ))}
      </div>
    );
  };