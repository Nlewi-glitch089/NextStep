import React, { useState, useEffect } from 'react';
import SkillFormPage from './SkillFormPage.jsx';
import '../styles/components/auth.css';

export default function Welcome({ onLogin }) {
  const [activeTab, setActiveTab] = useState(1); // Start with Sign Up tab
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
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

  // Check for existing user data on component mount
  useEffect(() => {
    console.log('Welcome component mounted'); // Debug log
    const userData = localStorage.getItem("userProfile");
    
    if (userData) {
      console.log('Found existing user data, showing sign in tab'); // Debug log
      setIsReturningUser(true);
      setActiveTab(0); // Show sign in tab
    } else {
      console.log('No user data found, showing sign up tab'); // Debug log
      setIsReturningUser(false);
      setActiveTab(1); // Show sign up tab
    }
  }, []);

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
    console.log('Sign up submitted:', signUpData); // Debug log
    
    if (signUpData.password !== signUpData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // Save new user data to localStorage
    const newUserProfile = {
      fullName: signUpData.fullname,
      email: signUpData.email,
      currentRole: '',
      careerGoal: '',
      skills: [],
      experience: 'Entry Level',
      createdAt: Date.now(),
      isNewUser: true,
      hasCompletedSurvey: false
    };
    
    localStorage.setItem("userProfile", JSON.stringify(newUserProfile));
    localStorage.setItem("isAuthenticated", "true");
    
    console.log('User profile created, showing assessment'); // Debug log
    setIsNewUser(true);
    setShowSkillAssessment(true);
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in submitted:', signInData); // Debug log
    
    const userData = localStorage.getItem("userProfile");
    
    if (userData) {
      const userProfile = JSON.parse(userData);
      if (userProfile.email === signInData.email) {
        localStorage.setItem("isAuthenticated", "true");
        
        const updatedProfile = {
          ...userProfile,
          lastLoginAt: Date.now(),
          isNewUser: false
        };
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        
        console.log('Sign in successful, going to home'); // Debug log
        if (onLogin) {
          onLogin();
        }
      } else {
        alert("Email doesn't match your account. Please check your email or sign up for a new account.");
      }
    } else {
      alert("No account found. Please sign up first.");
    }
  };

  const handleSkillAssessmentComplete = (surveyAnswers) => {
    console.log('Assessment completed:', surveyAnswers); // Debug log
    
    if (surveyAnswers) {
      localStorage.setItem("surveyAnswers", JSON.stringify({
        ...surveyAnswers,
        completedAt: Date.now()
      }));
      
      const userData = localStorage.getItem("userProfile");
      if (userData) {
        const userProfile = JSON.parse(userData);
        const updatedProfile = {
          ...userProfile,
          hasCompletedSurvey: true,
          ...(surveyAnswers.skills && { skills: surveyAnswers.skills }),
          ...(surveyAnswers.experience && { experience: surveyAnswers.experience }),
          ...(surveyAnswers.careerGoal && { careerGoal: surveyAnswers.careerGoal }),
          ...(surveyAnswers.currentRole && { currentRole: surveyAnswers.currentRole })
        };
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      }
    }
    
    setShowSkillAssessment(false);
    if (onLogin) {
      onLogin();
    }
  };

  const handleBackFromSurvey = () => {
    console.log('Back from survey clicked'); // Debug log
    setShowSkillAssessment(false);
    setIsNewUser(false);
  };

  // If showing skill assessment, render the SkillFormPage
  if (showSkillAssessment) {
    console.log('Rendering skill assessment'); // Debug log
    return (
      <div className="skill-assessment-wrapper">
        <SkillFormPage 
          onComplete={handleSkillAssessmentComplete} 
          onBack={handleBackFromSurvey}
        />
      </div>
    );
  }

  console.log('Rendering welcome forms, active tab:', activeTab); // Debug log

  // Default auth forms
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
          <p className="hero-tagline">Plan your path, explore your options, and take the next step</p>
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
                        <h2 className="hero-title">{isReturningUser ? "Welcome Back!" : "Welcome Back"}</h2>
                        <p>{isReturningUser ? "Continue your career journey" : "Sign in to continue your career journey"}</p>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="signin-email">Email</label>
                        <input
                          type="email"
                          id="signin-email"
                          name="email"
                          value={signInData.email}
                          onChange={(e) => setSignInData(prev => ({...prev, email: e.target.value}))}
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
                          onChange={(e) => setSignInData(prev => ({...prev, password: e.target.value}))}
                          required
                          placeholder="Enter your password"
                        />
                      </div>

                      <button type="submit" className="cta-button">
                        {isReturningUser ? "Continue Journey" : "Sign In"}
                      </button>
                    </form>
                  </div>
                ) : (
                  // Sign Up Form
                  <div className="auth-form-wrapper">
                    <form className="auth-form" onSubmit={handleSignupSubmit}>
                      <div className="auth-form-header">
                        <h2 className="hero-title">Create Account</h2>
                        <p>Let's Get Started</p>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="signup-fullname">Full Name</label>
                        <input
                          type="text"
                          id="signup-fullname"
                          name="fullname"
                          value={signUpData.fullname}
                          onChange={(e) => setSignUpData(prev => ({...prev, fullname: e.target.value}))}
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
                          onChange={(e) => setSignUpData(prev => ({...prev, email: e.target.value}))}
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
                          onChange={(e) => setSignUpData(prev => ({...prev, password: e.target.value}))}
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
                          onChange={(e) => setSignUpData(prev => ({...prev, confirmPassword: e.target.value}))}
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
                        Create Account & Continue
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