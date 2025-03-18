// DataVisualizer.js
const DataVisualizer = ({ data, contentType, timeRange }) => {
    const chartRef = React.useRef(null);
    const [chart, setChart] = React.useState(null);
  
    React.useEffect(() => {
      if (!data || data.length === 0) return;
      
      // Clean up previous chart if it exists
      if (chart) {
        chart.destroy();
      }
      
      // Prepare data for visualization
      let chartData;
      let chartTitle;
      
      if (contentType === 'tracks') {
        chartTitle = 'Top Tracks by Popularity';
        chartData = {
          labels: data.slice(0, 10).map(track => track.track_name),
          datasets: [{
            label: 'Popularity',
            data: data.slice(0, 10).map(track => track.popularity),
            backgroundColor: 'rgba(29, 185, 84, 0.7)',
            borderColor: 'rgba(29, 185, 84, 1)',
            borderWidth: 1
          }]
        };
      } else {
        chartTitle = 'Top Artists by Popularity';
        chartData = {
          labels: data.slice(0, 10).map(artist => artist.name),
          datasets: [{
            label: 'Popularity',
            data: data.slice(0, 10).map(artist => artist.popularity),
            backgroundColor: 'rgba(29, 185, 84, 0.7)',
            borderColor: 'rgba(29, 185, 84, 1)',
            borderWidth: 1
          }]
        };
      }
      
      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: chartTitle,
              color: '#ffffff',
              font: {
                size: 16
              }
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#B3B3B3'
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#B3B3B3',
                callback: function(value, index) {
                  const label = this.getLabelForValue(value);
                  return label.length > 10 ? label.substring(0, 10) + '...' : label;
                }
              }
            }
          }
        }
      });
      
      setChart(newChart);
      
      // Clean up function
      return () => {
        if (newChart) {
          newChart.destroy();
        }
      };
    }, [data, contentType, timeRange]);
  
    // Additional visualization: Genre distribution
    const genreDistribution = React.useMemo(() => {
      if (!data || data.length === 0) return [];
      
      const genreCounts = {};
      
      if (contentType === 'tracks') {
        data.forEach(track => {
          track.genres.forEach(genre => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          });
        });
      } else {
        data.forEach(artist => {
          artist.genres.forEach(genre => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          });
        });
      }
      
      // Sort genres by count and get top 5
      return Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([genre, count]) => ({ genre, count }));
    }, [data, contentType]);
  
    return (
      <div className="data-vis-container">
        <h2>Data Visualization</h2>
        <div className="chart-container" style={{ height: '300px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
        
        {genreDistribution.length > 0 && (
          <div className="genre-distribution">
            <h3>Top Genres</h3>
            <div className="genre-bars">
              {genreDistribution.map((item, index) => (
                <div key={index} className="genre-bar-container">
                  <div className="genre-name">{item.genre}</div>
                  <div className="genre-bar-wrapper">
                    <div 
                      className="genre-bar" 
                      style={{ 
                        width: `${(item.count / data.length) * 100}%`,
                        backgroundColor: `hsl(${141 + index * 30}, 63%, 42%)`
                      }}
                    ></div>
                    <span className="genre-count">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };