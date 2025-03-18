// ThemeToggle.js
const ThemeToggle = ({ darkMode, setDarkMode }) => {
    const toggleTheme = () => {
      const newMode = !darkMode;
      setDarkMode(newMode);
      
      if (newMode) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
      
      // Save preference to localStorage
      localStorage.setItem('darkMode', newMode.toString());
    };
  
    return (
      <div className="theme-toggle">
        <span className="theme-toggle-icon">☀️</span>
        <label className="theme-toggle-switch">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={toggleTheme}
          />
          <span className="theme-toggle-slider"></span>
        </label>
        <span className="theme-toggle-icon">🌙</span>
      </div>
    );
  };