import React, { useState, useEffect } from 'react';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import Welcome from './Components/Welcome.jsx';
import Home from './Components/Home.jsx';
import Profile from './Components/Profile.jsx';
import EosCounselor from './Components/EosCounselor.jsx';
import Contact from './Components/Contact.jsx';
import Services from './Components/Services.jsx';
import Projects from './Components/Projects.jsx';
import './styles/pages/theme.css'; // <-- add site-wide theme overrides

/* --- Immediately apply persisted theme to avoid white flash on load --- */
(function applyPersistedTheme() {
	// run as early as possible in this module
	try {
		const saved = localStorage.getItem('site_theme');
		if (saved === 'light') {
			document.documentElement.classList.add('site-light');
			// set a sensible background fallback to avoid white flash before CSS loads
			document.documentElement.style.setProperty('--background-base', '#fff5fb');
			document.documentElement.style.setProperty('--app-font-color', '#111827');
			document.documentElement.style.setProperty('--response-font-size', localStorage.getItem('site_font_size') || '18px');
		} else {
			// dark fallback (default)
			document.documentElement.classList.remove('site-light');
			document.documentElement.style.setProperty('--background-base', '#0b0b18');
			document.documentElement.style.setProperty('--app-font-color', '#eaeef6');
			document.documentElement.style.setProperty('--response-font-size', localStorage.getItem('site_font_size') || '18px');
		}
	} catch (e) {
		// fail silently if localStorage is unavailable
	}
})();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const authState = localStorage.getItem("isAuthenticated");
      const userData = localStorage.getItem("userProfile");
      
      if (authState === "true" && userData) {
        setIsAuthenticated(true);
        setCurrentPage('home');
      } else {
        setIsAuthenticated(false);
        setCurrentPage('welcome');
      }
    } catch (error) {
      console.error('Error loading authentication state:', error);
      setIsAuthenticated(false);
      setCurrentPage('welcome');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = () => {
    try {
      setIsAuthenticated(true);
      setCurrentPage('home');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    try {
      // Only clear authentication state, preserve user account data
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      setCurrentPage('welcome');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleNavigate = (page) => {
    try {
      setCurrentPage(page);
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #1e1b3a 0%, #2d2654 50%, #3a2d6b 100%)',
        color: '#ffffff',
        fontSize: '1.2rem'
      }}>
        Loading NextStep...
      </div>
    );
  }

  const renderCurrentPage = () => {
    try {
      if (!isAuthenticated && currentPage !== 'welcome') {
        return <Welcome onLogin={handleLogin} />;
      }

      switch (currentPage) {
        case 'welcome':
          return <Welcome onLogin={handleLogin} />;
        case 'home':
          return (
            <ErrorBoundary onNavigate={handleNavigate}>
              <Home onLogout={handleLogout} onNavigate={handleNavigate} />
            </ErrorBoundary>
          );
        case 'profile':
          return (
            <ErrorBoundary onNavigate={handleNavigate}>
              <Profile onNavigate={handleNavigate} />
            </ErrorBoundary>
          );
        case 'ai-counselor':
          return (
            <ErrorBoundary onNavigate={handleNavigate}>
              <EosCounselor onNavigate={handleNavigate} />
            </ErrorBoundary>
          );
        case 'contact':
          return (
            <ErrorBoundary onNavigate={handleNavigate}>
              <Contact onNavigate={handleNavigate} />
            </ErrorBoundary>
          );
        case 'services':
          return (
            <ErrorBoundary onNavigate={handleNavigate}>
              <Services onNavigate={handleNavigate} />
            </ErrorBoundary>
          );
        case 'projects':
          return (
            <ErrorBoundary onNavigate={handleNavigate}>
              <Projects onNavigate={handleNavigate} />
            </ErrorBoundary>
          );
        default:
          return (
            <ErrorBoundary onNavigate={handleNavigate}>
              <Home onLogout={handleLogout} onNavigate={handleNavigate} />
            </ErrorBoundary>
          );
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1e1b3a 0%, #2d2654 50%, #3a2d6b 100%)',
          minHeight: '100vh',
          color: '#ffffff'
        }}>
          <h1>Something went wrong</h1>
          <button 
            onClick={() => handleNavigate('welcome')}
            style={{
              background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Go to Welcome Page
          </button>
        </div>
      );
    }
  };

  return (
    <ErrorBoundary onNavigate={handleNavigate}>
      <div className="App">
        {renderCurrentPage()}
      </div>
    </ErrorBoundary>
  );
}

export default App;
