import React, { useState, useEffect } from 'react';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import Welcome from './Components/Welcome.jsx';
import Home from './Components/Home.jsx';
import Profile from './Components/Profile.jsx';
import EosCounselor from './Components/EosCounselor.jsx';
import Contact from './Components/Contact.jsx';
import Services from './Components/Services.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const authState = localStorage.getItem("isAuthenticated");
      
      console.log('Auth state on load:', authState); // Debug log
      
      // ONLY authenticate if explicitly set to "true"
      if (authState === "true") {
        console.log('User is authenticated, going to home'); // Debug log
        setIsAuthenticated(true);
        setCurrentPage('home');
      } else {
        console.log('User not authenticated, showing welcome'); // Debug log
        // Clear any stale auth data
        localStorage.removeItem("isAuthenticated");
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
    console.log('Login triggered'); // Debug log
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    console.log('Logout triggered'); // Debug log
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setCurrentPage('welcome');
  };

  const handleNavigate = (page) => {
    console.log('Navigate to:', page); // Debug log
    setCurrentPage(page);
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
    console.log('Rendering page. Authenticated:', isAuthenticated, 'Current page:', currentPage); // Debug log
    
    // Force show Welcome if not authenticated
    if (!isAuthenticated) {
      return <Welcome onLogin={handleLogin} />;
    }

    // Only show other pages if authenticated
    switch (currentPage) {
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
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1e1b3a 0%, #2d2654 50%, #3a2d6b 100%)',
            minHeight: '100vh',
            color: '#ffffff'
          }}>
            <h1>Projects Coming Soon</h1>
            <button 
              onClick={() => handleNavigate('home')}
              style={{
                background: 'linear-gradient(135deg, #ff0080, #b954b9)',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Back to Home
            </button>
          </div>
        );
      default:
        return (
          <ErrorBoundary onNavigate={handleNavigate}>
            <Home onLogout={handleLogout} onNavigate={handleNavigate} />
          </ErrorBoundary>
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
