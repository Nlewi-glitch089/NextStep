import React, { useState, useEffect } from 'react';
import SkillFormPage from './SkillFormPage.jsx';
import '../styles/components/auth.css';

export default function Welcome({ onLogin }) {
  const [activeTab, setActiveTab] = useState(0); // 0 for Sign In, 1 for Sign Up
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
    const userData = localStorage.getItem("userProfile");
    const authState = localStorage.getItem("isAuthenticated");
    const surveyData = localStorage.getItem("surveyAnswers");
    
    if (userData && authState === "true") {
      setIsReturningUser(true);
      setActiveTab(0); // Default to sign in tab for returning users
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
    if (signUpData.password !== signUpData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // Check if user already has survey data
    const existingSurveyData = localStorage.getItem("surveyAnswers");
    
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
      hasCompletedSurvey: !!existingSurveyData
    };
    
    localStorage.setItem("userProfile", JSON.stringify(newUserProfile));
    localStorage.setItem("isAuthenticated", "true");
    
    console.log('Signup successful:', signUpData);
    setIsNewUser(true);
    
    // Skip survey if they already have survey data
    if (existingSurveyData) {
      console.log('Found existing survey data, skipping assessment');
      if (onLogin) {
        onLogin();
      }
    } else {
      setShowSkillAssessment(true);
    }
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    
    // Check if user exists in localStorage
    const userData = localStorage.getItem("userProfile");
    
    if (userData) {
      const userProfile = JSON.parse(userData);
      // Simple validation - in real app, you'd validate against backend
      if (userProfile.email === signInData.email) {
        localStorage.setItem("isAuthenticated", "true");
        
        // Update user profile to mark as returning user (but don't overwrite data)
        const updatedProfile = {
          ...userProfile,
          lastLoginAt: Date.now(),
          isNewUser: false
        };
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        
        console.log('Signin successful for returning user:', userProfile.fullName);
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
    // Save survey answers to localStorage
    if (surveyAnswers) {
      localStorage.setItem("surveyAnswers", JSON.stringify({
        ...surveyAnswers,
        completedAt: Date.now()
      }));
      
      // Update user profile to mark survey as completed
      const userData = localStorage.getItem("userProfile");
      if (userData) {
        const userProfile = JSON.parse(userData);
        const updatedProfile = {
          ...userProfile,
          hasCompletedSurvey: true,
          // Update profile with survey data if available
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
    setShowSkillAssessment(false);
    setIsNewUser(false);
  };

  // If showing skill assessment, render your actual SkillFormPage
  if (showSkillAssessment) {
    return (
      <div className="skill-assessment-wrapper">
        <SkillFormPage 
          onComplete={handleSkillAssessmentComplete} 
          onBack={handleBackFromSurvey}
        />
      </div>
    );
  }

  // Default auth forms (removed redundant helper paragraphs)
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
          <p className="hero-tagline">Your next step starts here. Explore careers, build skills, and plan for what’s ahead.</p>
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