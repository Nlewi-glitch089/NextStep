import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Import your existing components
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import ProjectsPage from "./Components/ProjectsPage";
import About from "./Components/About";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import Welcome from "./Components/Welcome";
import EosCounselor from "./Components/EosCounselor";

// Import your context provider
import { ProjectProvider } from "./context/ProjectContext";

import "./App.css";

// Wrapper component to handle navigation
function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Start with false to show welcome
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleNavigate = (page) => {
    if (page === 'home') {
      navigate('/home');
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Home onLogout={handleLogout} onNavigate={handleNavigate} />
          ) : (
            <Welcome onLogin={handleLogin} />
          )
        } 
      />
      <Route 
        path="/home" 
        element={
          isAuthenticated ? (
            <Home onLogout={handleLogout} onNavigate={handleNavigate} />
          ) : (
            <Welcome onLogin={handleLogin} />
          )
        } 
      />
      <Route 
        path="/profile" 
        element={
          isAuthenticated ? (
            <Profile onNavigate={handleNavigate} />
          ) : (
            <Welcome onLogin={handleLogin} />
          )
        }
      />
      <Route 
        path="/projects" 
        element={
          isAuthenticated ? (
            <ProjectsPage onNavigate={handleNavigate} />
          ) : (
            <Welcome onLogin={handleLogin} />
          )
        }
      />
      <Route 
        path="/services" 
        element={<Services />} 
      />
      <Route 
        path="/about" 
        element={<About onNavigate={handleNavigate} />} 
      />
      <Route 
        path="/contact" 
        element={<Contact onNavigate={handleNavigate} />} 
      />
      <Route 
        path="/ai-counselor" 
        element={
          isAuthenticated ? (
            <EosCounselor onNavigate={handleNavigate} />
          ) : (
            <Welcome onLogin={handleLogin} />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ProjectProvider>
      <Router>
        <AppContent />
      </Router>
    </ProjectProvider>
  );
}

export default App;
