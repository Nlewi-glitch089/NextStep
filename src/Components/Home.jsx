// HomePage.jsx
import React, { useState } from 'react';

export default function HomePage({ onNavigate }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleGetStarted = () => {
    // Navigate to projects section on the same page
    scrollToSection('projects');
  };

  const handleSignIn = () => {
    // For now, just show alert since we're already in the app
    alert('You are already signed in!');
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

  const handleProjectsClick = () => {
    if (onNavigate) {
      onNavigate('projects');
    }
  };

  const handleServicesClick = () => {
    if (onNavigate) {
      onNavigate('services');
    }
  };

  const handleContactClick = () => {
    if (onNavigate) {
      onNavigate('contact');
    }
  };

  const handleAboutClick = () => {
    // Scroll to the About section instead of navigating to a different page
    scrollToSection('about');
  };

  const handleAboutPageClick = () => {
    // Navigate to the separate About page
    if (onNavigate) {
      onNavigate('about');
    }
  };

  return (
    <main className={`home-main ${isDarkMode ? 'dark' : 'light'} ${isTransitioning ? 'transitioning' : ''}`}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="nav-logo" onClick={() => scrollToSection('home')}>
          NextStep
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
        </section>

        <section className="nav-auth-buttons">
          <button className="sign-in-button" onClick={handleSignIn}>
            Sign In
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
          Bridge the Gap Between Student Skills and Employer Needs
        </p>
        <button className="cta-button" onClick={handleGetStarted}>
          GET STARTED
        </button>
      </section>

      {/* About NextStep Section */}
      <section id="about" className="features-section">
        <h2 className="section-title">About NextStep</h2>
        <div className="about-intro">
          <p className="about-description">
            NextStep is more than just a career platform - we're your partners in bridging the gap between 
            education and meaningful employment. Our mission is to empower students with the tools, insights, 
            and confidence they need to succeed in today's competitive job market.
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
              We believe in personalized guidance, real-time market insights, and empowering students 
              with practical tools for career success.
            </p>
          </section>
        </article>

        {/* Our Goals Statistics */}
        <section className="goals-section">
          <h3 className="goals-title">Our Vision Someday & Future Goals</h3>
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

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <h2 className="section-title">How NextStep Works</h2>
        
        <article className="steps-grid">
          <section className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Profile Assessment</h3>
            <p className="step-description">
              Complete our comprehensive skills and interests assessment to create your personalized profile.
            </p>
          </section>

          <section className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Market Analysis</h3>
            <p className="step-description">
              Our AI analyzes current job market trends and matches them with your profile and career goals.
            </p>
          </section>

          <section className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Personalized Action Plan</h3>
            <p className="step-description">
              Receive a customized roadmap with specific steps to achieve your career objectives.
            </p>
          </section>

          <section className="step-card">
            <div className="step-number">4</div>
            <h3 className="step-title">Track Progress</h3>
            <p className="step-description">
              Monitor your development and adjust your path based on real-time feedback and market changes.
            </p>
          </section>
        </article>

        {/* Demo Features */}
        <section className="demo-section">
          <h3 className="demo-title">Try Our Demo Features</h3>
          <article className="demo-buttons">
            <button className="demo-button" onClick={() => setActiveDemo('career')}>
              Analyze My Career Path
            </button>
            <button className="demo-button" onClick={() => setActiveDemo('skills')}>
              Check Skill Gaps
            </button>
            <button className="demo-button" onClick={() => setActiveDemo('jobs')}>
              Find Job Matches
            </button>
          </article>
          
          {/* Demo Results */}
          {activeDemo && (
            <section className="demo-results">
              <button 
                className="demo-close"
                onClick={() => setActiveDemo(null)}
              >
                ×
              </button>
              
              {activeDemo === 'career' && (
                <article className="demo-content">
                  <h4>Your Career Analysis</h4>
                  <section className="analysis-grid">
                    <article className="analysis-card">
                      <span className="analysis-icon">📊</span>
                      <h5>Current Level</h5>
                      <p className="level-badge">Entry-Level Professional</p>
                      <p>Based on your student status and skills</p>
                    </article>
                    <article className="analysis-card">
                      <span className="analysis-icon">🎯</span>
                      <h5>Next Step</h5>
                      <p className="level-badge">Junior Developer</p>
                      <p>Ready to transition within 3-6 months</p>
                    </article>
                    <article className="analysis-card">
                      <span className="analysis-icon">💰</span>
                      <h5>Salary Potential</h5>
                      <p className="level-badge">$45K - $65K</p>
                      <p>Starting salary range in your area</p>
                    </article>
                  </section>
                </article>
              )}
              
              {activeDemo === 'skills' && (
                <article className="demo-content">
                  <h4>Skill Gap Analysis</h4>
                  <section className="skills-list">
                    <article className="skill-item">
                      <header className="skill-header">
                        <span className="skill-name">JavaScript</span>
                        <span className="skill-status complete">✓ Strong</span>
                      </header>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{width: '80%'}}></div>
                      </div>
                    </article>
                    <article className="skill-item">
                      <header className="skill-header">
                        <span className="skill-name">React</span>
                        <span className="skill-status learning">📚 Developing</span>
                      </header>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{width: '65%'}}></div>
                      </div>
                    </article>
                    <article className="skill-item">
                      <header className="skill-header">
                        <span className="skill-name">Version Control (Git)</span>
                        <span className="skill-status recommended">⭐ Recommended</span>
                      </header>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{width: '30%'}}></div>
                      </div>
                    </article>
                  </section>
                </article>
              )}
              
              {activeDemo === 'jobs' && (
                <article className="demo-content">
                  <h4>Top Job Matches</h4>
                  <section className="jobs-list">
                    <article className="job-card">
                      <header className="job-header">
                        <h5>Junior Web Developer</h5>
                        <span className="match-badge">92% Match</span>
                      </header>
                      <p className="company">StartupCo • Remote</p>
                      <p className="salary">$50K - $65K</p>
                      <div className="job-tags">
                        <span className="tag">Remote</span>
                        <span className="tag">Full-time</span>
                        <span className="tag">Entry-level</span>
                      </div>
                    </article>
                    <article className="job-card">
                      <header className="job-header">
                        <h5>Frontend Developer Intern</h5>
                        <span className="match-badge">85% Match</span>
                      </header>
                      <p className="company">Tech Solutions • Austin, TX</p>
                      <p className="salary">$20/hour</p>
                      <div className="job-tags">
                        <span className="tag">Internship</span>
                        <span className="tag">On-site</span>
                      </div>
                    </article>
                  </section>
                </article>
              )}
            </section>
          )}
        </section>
      </section>

      {/* Projects Section */}
      <section id="projects" className="features-section">
        <h2 className="section-title">Ready to Showcase Your Work?</h2>
        <section className="project-cta-section">
          <p className="project-cta-description">
            Create and manage your project portfolio. Add your completed projects, 
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