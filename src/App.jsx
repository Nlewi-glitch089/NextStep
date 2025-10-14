import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Import your existing components
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import ProjectsPage from "./Components/ProjectsPage";
import About from "./Components/About";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import WhyUs from "./Components/WhyUs";
import Welcome from "./Components/Welcome";

// Import your context provider
import { ProjectProvider } from "./context/ProjectContext";

import "./App.css";

// Wrapper component to handle navigation
function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true to skip auth for now
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleNavigate = (page) => {
    navigate(`/${page}`);
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
        element={<Home onLogout={handleLogout} onNavigate={handleNavigate} />} 
      />
      <Route 
        path="/profile" 
        element={<Profile onNavigate={handleNavigate} />} 
      />
      <Route 
        path="/projects" 
        element={<ProjectsPage onNavigate={handleNavigate} />} 
      />
      <Route 
        path="/about" 
        element={<About onNavigate={handleNavigate} />} 
      />
      <Route 
        path="/services" 
        element={<Services onNavigate={handleNavigate} />} 
      />
      <Route 
        path="/contact" 
        element={<Contact onNavigate={handleNavigate} />} 
      />
      <Route 
        path="/why-us" 
        element={<WhyUs onNavigate={handleNavigate} />} 
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
