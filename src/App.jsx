import React, { useState } from "react";
import Welcome from "./Components/Welcome.jsx";
import Home from "./Components/Home.jsx";
import Services from "./Components/Services.jsx";
import Contact from "./Components/Contact.jsx";
import Profile from "./Components/Profile.jsx";
import ProjectsPage from "./Components/ProjectsPage.jsx";
import { ProjectProvider } from "./context/ProjectContext.jsx";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signinData, setSigninData] = useState({
    email: '',
    password: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (name === 'confirmPassword' || name === 'password') {
      setPasswordError('');
    }
  };

  const handleSigninChange = (e) => {
    const { name, value } = e.target;
    setSigninData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Handle successful signup
    console.log('Signup successful:', signupData);
    setIsAuthenticated(true);
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    
    // Handle successful signin
    console.log('Signin successful:', signinData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    setActiveTab('signin');
    // Clear any stored auth data
    setSignupData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setSigninData({
      email: '',
      password: ''
    });
    setPasswordError('');
  };

  const navigateToPage = (pageName) => {
    setCurrentPage(pageName);
  };

  // If authenticated, show the appropriate page
  if (isAuthenticated) {
    return (
      <ProjectProvider>
        {(() => {
          switch (currentPage) {
            case 'services':
              return <Services onNavigate={navigateToPage} />;
            case 'contact':
              return <Contact onNavigate={navigateToPage} />;
            case 'profile':
              return <Profile onNavigate={navigateToPage} />;
            case 'projects':
              return <ProjectsPage onNavigate={navigateToPage} />;
            default:
              return <Home onNavigate={navigateToPage} onLogout={handleLogout} />;
          }
        })()}
      </ProjectProvider>
    );
  }

  // Show auth forms
  return (
    <div className="auth-main">
      <div className="auth-container">
        <Welcome />
        
        <div className="auth-card">
          {/* Tabs */}
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
          
          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form className="auth-form" onSubmit={handleSigninSubmit}>
              <fieldset>
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  value={signinData.email}
                  onChange={handleSigninChange}
                  required 
                />
              </fieldset>
              <fieldset>
                <label>Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter your password" 
                  value={signinData.password}
                  onChange={handleSigninChange}
                  required 
                />
              </fieldset>
              <button type="submit" className="cta-button">
                Sign In
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <fieldset>
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Enter your full name" 
                  value={signupData.fullName}
                  onChange={handleSignupChange}
                  required 
                />
              </fieldset>
              <fieldset>
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required 
                />
              </fieldset>
              <fieldset>
                <label>Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Create a password" 
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required 
                />
              </fieldset>
              <fieldset>
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm your password" 
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  required 
                />
                {passwordError && (
                  <span style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {passwordError}
                  </span>
                )}
              </fieldset>
              <button type="submit" className="cta-button">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;