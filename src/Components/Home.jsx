// Home.jsx
import React, { useState, useEffect } from 'react';
import '../styles/pages/home.css';

export default function Home({ onLogout, onNavigate }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Load user profile on component mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem("userProfile");
      if (userData) {
        const userProfile = JSON.parse(userData);
        setUserProfile(userProfile);
      }
    } catch (error) {
      console.error('Error loading user profile in Home:', error);
      // Continue without user profile data
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleGetStarted = () => {
    try {
      // Navigate to AI Counselor instead of projects section
      if (onNavigate) {
        onNavigate('ai-counselor');
      }
    } catch (error) {
      console.error('Error in handleGetStarted:', error);
    }
  };

  const handleProfileClick = () => {
    try {
      if (onNavigate) {
        onNavigate('profile');
      }
    } catch (error) {
      console.error('Error in handleProfileClick:', error);
    }
  };

  const handleLogout = () => {
    try {
      // Only clear authentication status, NOT user profile data
      localStorage.removeItem("isAuthenticated");
      
      // Keep userProfile and surveyAnswers so user can sign back in
      // localStorage.removeItem("userProfile"); // DON'T remove this
      // localStorage.removeItem("surveyAnswers"); // DON'T remove this
      
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleThemeToggle = () => {
    setIsTransitioning(true);
    
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
      
      // Remove transition flag after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 50);
  };

  const handleAICounselorClick = () => {
    try {
      if (onNavigate) {
        onNavigate('ai-counselor');
      }
    } catch (error) {
      console.error('Error in handleAICounselorClick:', error);
    }
  };

  const handleProjectsClick = () => {
    try {
      if (onNavigate) {
        onNavigate('projects');
      }
    } catch (error) {
      console.error('Error in handleProjectsClick:', error);
    }
  };

  const handleServicesClick = () => {
    try {
      if (onNavigate) {
        onNavigate('services');
      }
    } catch (error) {
      console.error('Error in handleServicesClick:', error);
    }
  };

  const handleContactClick = () => {
    try {
      if (onNavigate) {
        onNavigate('contact');
      }
    } catch (error) {
      console.error('Error in handleContactClick:', error);
    }
  };

  return (
    <main className={`home-main ${isDarkMode ? 'dark' : 'light'} ${isTransitioning ? 'transitioning' : ''}`}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="nav-logo interactive-logo" onClick={() => scrollToSection('home')}>
          NextStep
          <div className="logo-glow"></div>
        </h1>
        
        <section className="nav-links">
          <span
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            Home
          </span>
          <span
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            About
          </span>
          <span
            className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
            onClick={() => scrollToSection('how-it-works')}
          >
            How It Works
          </span>
          <span
            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </span>
          <span
            className="nav-link"
            onClick={handleAICounselorClick}
          >
            AI Counselor
          </span>
        </section>

        <section className="nav-auth-buttons">
          <button className="sign-in-button" onClick={handleProfileClick}>
            {userProfile ? `Hi, ${userProfile.fullName?.split(' ')[0] || 'User'} | Profile` : 'My Profile'}
          </button>
          <button className="sign-in-button" onClick={handleLogout}>
            Sign Out
          </button>
          <button 
            className="theme-toggle-button" 
            onClick={handleThemeToggle}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </section>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <h1 className="hero-title">NextStep</h1>
        <p className="hero-subtitle">
          Bridge the Gap Between Student Growth and Future Readiness
        </p>
        <button className="cta-button" onClick={handleGetStarted}>
          GET STARTED
        </button>
      </section>

      {/* About NextStep Section - Student-focused content */}
      <section id="about" className="features-section">
        <h2 className="section-title hero-title">About NextStep</h2>
        <div className="about-intro">
          <p className="about-description">
            NextStep is more than just a career resource, we're your guide for discovering confidence, purpose, and direction as you prepare for life beyond the classroom. Our mission is to help high school seniors turn their skills, experiences, and passions into meaningful opportunities for the future.
          </p>
        </div>

        <article className="about-highlights">
          <section className="highlight-card">
            <header className="highlight-icon">🎯</header>
            <h3 className="highlight-title">Our Mission</h3>
            <p className="highlight-description">
              To bridge the critical gap between what students can do and what employers are looking for, 
              providing personalized, data-driven career guidance.
            </p>
          </section>

          <section className="highlight-card">
            <header className="highlight-icon">💡</header>
            <h3 className="highlight-title">Our Vision</h3>
            <p className="highlight-description">
              A world where every student transitions seamlessly from education to meaningful careers 
              with confidence and clarity about their professional path.
            </p>
          </section>

          <section className="highlight-card">
            <header className="highlight-icon">🤝</header>
            <h3 className="highlight-title">Our Values</h3>
            <p className="highlight-description">
              We believe in self-discovery, hands-on learning, and meaningful growth. NextStep empowers students through personalized guidance, real-world insight, and practical tools that make the path forward feel achievable.
            </p>
          </section>
        </article>

        {/* Our Goals Statistics */}
        <section className="goals-section">
          <h3 className="goals-title hero-title">Our Vision Someday & Future Goals</h3>
          <article className="stats-grid">
            <section className="stat-card">
              <header className="stat-number">10,000+</header>
              <p className="stat-label">Students (Goal by 2027)</p>
            </section>
            <section className="stat-card">
              <header className="stat-number">7,500+</header>
              <p className="stat-label">Job Placements (Target)</p>
            </section>
            <section className="stat-card">
              <header className="stat-number">250+</header>
              <p className="stat-label">Partner Companies (Vision)</p>
            </section>
            <section className="stat-card">
              <header className="stat-number">89%</header>
              <p className="stat-label">Success Rate (Objective)</p>
            </section>
          </article>
        </section>
      </section>

      {/* How It Works Section - Student-focused workflow */}
      <section id="how-it-works" className="how-it-works-section">
        <h2 className="section-title hero-title">How NextStep Works</h2>
        
        <article className="steps-grid">
          <section className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Self-Discovery Assessment</h3>
            <p className="step-description">
              Start by completing our guided skills and interests assessment to uncover your strengths, passions, and areas for growth.
            </p>
          </section>

          <section className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Real-World Insights</h3>
            <p className="step-description">
              Our platform connects your results with current opportunities, emerging industries, and skill trends — giving you a clear picture of where you can grow next.
            </p>
          </section>

          <section className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Personalized Growth Plan</h3>
            <p className="step-description">
              Receive a customized roadmap with actionable steps designed to help you strengthen your abilities, explore new pathways, and build future-ready confidence.
            </p>
          </section>

          <section className="step-card">
            <div className="step-number">4</div>
            <h3 className="step-title">Track Progress</h3>
            <p className="step-description">
              Monitor your journey over time with feedback, milestones, and updated goals that grow with you.
            </p>
          </section>
        </article>
      </section>

      {/* Projects Section - Update text to reflect new flow */}
      <section id="projects" className="features-section">
        <h2 className="section-title hero-title">Ready to Build Your Portfolio?</h2>
        <section className="project-cta-section">
          <p className="project-cta-description">
            After chatting with Eos, create and manage your project portfolio. Add your completed projects, 
            track your progress, and showcase your skills to potential employers.
          </p>
          <button className="cta-button" onClick={handleProjectsClick}>
            Manage My Projects
          </button>
        </section>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <section className="footer-content">
          <header className="footer-brand-centered">
            <h3 className="footer-logo">NextStep</h3>
            <p className="footer-tagline">Your journey doesn't end at graduation—it begins with your NextStep.</p>
          </header>
          
          <section className="footer-links">
            <article className="footer-column">
              <h4>Our Services</h4>
              <p className="footer-description">
                Discover our comprehensive career guidance solutions designed to help you succeed.
              </p>
              <button className="footer-link-button" onClick={handleServicesClick}>
                View All Services &rarr;
              </button>
            </article>
            
            <article className="footer-column">
              <h4>Quick Contact</h4>
              <p className="footer-description">
                Get in touch with our team for support, questions, or partnership opportunities.
              </p>
              <button className="footer-link-button" onClick={handleContactClick}>
                Contact Us &rarr;
              </button>
            </article>
          </section>
        </section>
        
        <section className="footer-bottom">
          <p>&copy; © 2025 NextStep. All rights reserved. Created by Nakerra Lewis.</p>
        </section>
      </footer>
    </main>
  );
}