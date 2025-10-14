import React, { useState } from 'react';
import SkillFormPage from './SkillFormPage.jsx';
import '../styles/components/Auth.css';

export default function Welcome({ onLogin }) {
  const [activeTab, setActiveTab] = useState(0); // 0 for Sign In, 1 for Sign Up
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [signUpData, setSignUpData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
    if (name === "confirmPassword" || name === "password") {
      setPasswordError("");
    }
  };

  const handleSigninChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    console.log('Signup successful:', signUpData);
    // After successful signup, show the skills assessment form
    setIsNewUser(true);
    setShowSkillAssessment(true);
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    
    console.log('Signin successful:', signInData);
    // Existing users go directly to home
    if (onLogin) {
      onLogin();
    }
  };

  const handleSkillAssessmentComplete = () => {
    // After completing the skills assessment, log them in
    setShowSkillAssessment(false);
    if (onLogin) {
      onLogin();
    }
  };

  // If showing skill assessment, render your actual SkillFormPage
  if (showSkillAssessment) {
    return <SkillFormPage onComplete={handleSkillAssessmentComplete} />;
  }

  // Default auth forms (unchanged)
  return (
    <main className="home-main dark welcome-page">
      {/* Enhanced Hero Section with animated background */}
      <section className="hero-section welcome-hero">
        <div className="animated-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title interactive-logo">
            NextStep
            <div className="logo-glow"></div>
          </h1>
          <p className="hero-tagline">Your career journey begins here</p>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="auth-section enhanced-auth">
        <div className="page-container">
          <div className="auth-wrapper">
            <div className="auth-container glass-morphism">
              <div className="auth-tabs">
                <button 
                  className={`auth-tab ${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => setActiveTab(0)}
                >
                  Sign In
                </button>
                <button 
                  className={`auth-tab ${activeTab === 1 ? 'active' : ''}`}
                  onClick={() => setActiveTab(1)}
                >
                  Sign Up
                </button>
              </div>

              <div className="auth-content">
                {activeTab === 0 ? (
                  // Sign In Form
                  <div className="auth-form-wrapper">
                    <form className="auth-form" onSubmit={handleSigninSubmit}>
                      <div className="auth-form-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to continue your career journey</p>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="signin-email">Email</label>
                        <input
                          type="email"
                          id="signin-email"
                          name="email"
                          value={signInData.email}
                          onChange={handleSigninChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="signin-password">Password</label>
                        <input
                          type="password"
                          id="signin-password"
                          name="password"
                          value={signInData.password}
                          onChange={handleSigninChange}
                          required
                          placeholder="Enter your password"
                        />
                      </div>

                      <button type="submit" className="cta-button">
                        Sign In
                      </button>
                    </form>
                  </div>
                ) : (
                  // Sign Up Form
                  <div className="auth-form-wrapper">
                    <form className="auth-form" onSubmit={handleSignupSubmit}>
                      <div className="auth-form-header">
                        <h2>Create Account</h2>
                        <p>Start your career guidance journey today</p>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="signup-fullname">Full Name</label>
                        <input
                          type="text"
                          id="signup-fullname"
                          name="fullname"
                          value={signUpData.fullname}
                          onChange={handleSignupChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="signup-email">Email</label>
                        <input
                          type="email"
                          id="signup-email"
                          name="email"
                          value={signUpData.email}
                          onChange={handleSignupChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="signup-password">Password</label>
                        <input
                          type="password"
                          id="signup-password"
                          name="password"
                          value={signUpData.password}
                          onChange={handleSignupChange}
                          required
                          placeholder="Create a password"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="signup-confirm-password">Confirm Password</label>
                        <input
                          type="password"
                          id="signup-confirm-password"
                          name="confirmPassword"
                          value={signUpData.confirmPassword}
                          onChange={handleSignupChange}
                          required
                          placeholder="Confirm your password"
                        />
                      </div>

                      {passwordError && (
                        <div className="error-message">
                          {passwordError}
                        </div>
                      )}

                      <button type="submit" className="cta-button">
                        Create Account
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}