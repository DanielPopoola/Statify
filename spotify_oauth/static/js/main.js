// main.js
const App = () => {
  const [contentType, setContentType] = React.useState('tracks');
  const [timeRange, setTimeRange] = React.useState('short_term');
  const [darkMode, setDarkMode] = React.useState(true);
  
  // Initialize theme based on localStorage or default to dark mode
  React.useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      const isDarkMode = savedDarkMode === 'true';
      setDarkMode(isDarkMode);
      
      if (!isDarkMode) {
        document.body.classList.add('light-theme');
      }
    }
  }, []);
  
  const currentData = userData[contentType][timeRange];

  return (
    <div className="container">
      <header>
        <div className="logo">Spotify Insights</div>
        <nav>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <a href="{% url 'spotify_logout' %}" className="btn">Logout</a>
        </nav>
      </header>
      
      <TopItemsFilter 
        contentType={contentType}
        setContentType={setContentType}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />

      {contentType === 'tracks' ? (
        <TracksGrid tracks={currentData} />
      ) : (
        <ArtistsGrid artists={currentData} />
      )}
      
      <DataVisualizer 
        data={currentData}
        contentType={contentType}
        timeRange={timeRange}
      />
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('spotify-dashboard-root'));