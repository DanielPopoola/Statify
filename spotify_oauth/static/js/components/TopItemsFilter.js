// TopItemsFilter.js
const TopItemsFilter = ({ contentType, setContentType, timeRange, setTimeRange }) => {
    const handleContentTypeChange = (type) => {
      setContentType(type);
    };
  
    const handleTimeRangeChange = (range) => {
      setTimeRange(range);
    };
  
    const timeRangeLabels = {
      short_term: 'Last 4 Weeks',
      medium_term: 'Last 6 Months',
      long_term: 'All Time'
    };
  
    const timeRangeDescriptions = {
      short_term: 'Showing your top items from the last 4 weeks',
      medium_term: 'Showing your top items from the last 6 months',
      long_term: 'Showing your top items of all time'
    };
  
    return (
      <div className="filters">
        <div className="content-type">
          <button 
            className={contentType === 'tracks' ? 'active' : ''}
            onClick={() => handleContentTypeChange('tracks')}
          >
            Top Tracks
          </button>
          <button 
            className={contentType === 'artists' ? 'active' : ''}
            onClick={() => handleContentTypeChange('artists')}
          >
            Top Artists
          </button>
        </div>
        <div className="time-filter">
          {Object.keys(timeRangeLabels).map((range) => (
            <button
              key={range}
              className={timeRange === range ? 'active' : ''}
              onClick={() => handleTimeRangeChange(range)}
            >
              {timeRangeLabels[range]}
            </button>
          ))}
        </div>
        <div className="time-range-info">
          {timeRangeDescriptions[timeRange]}
        </div>
      </div>
    );
  };