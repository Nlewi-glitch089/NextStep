// ServicesPage.jsx
import React from 'react';
import '../styles/components/services.css';
import TextSizeControls from './TextSizeControls.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Services({ onNavigate }) {
  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <main className="home-main dark">
      <nav className="navbar">
        <div className="nav-brand">
          <h1 className="nav-logo interactive-logo" onClick={handleBackToHome}>
            NextStep
            <div className="logo-glow"></div>
          </h1>
          <div className="nav-text-controls-inline">
            <TextSizeControls />
            <ThemeToggle />
          </div>
        </div>

        <section className="nav-auth-buttons">
          {/* intentionally empty */}
        </section>
      </nav>

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title hero-title">Our Services</h1>
          <p className="page-subtitle">Comprehensive career guidance solutions designed to help you succeed</p>
        </div>

        <div className="services-content">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3>Career Assessment</h3>
              <p>Discover your strengths, interests, and career preferences through our comprehensive assessment tool.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🤖</div>
              <h3>AI Career Counselor</h3>
              <p>Get personalized career advice and guidance from Eos, our AI-powered career counselor available 24/7.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Portfolio Management</h3>
              <p>Create and manage your professional portfolio to showcase your skills and projects to potential employers.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3>Learning Resources</h3>
              <p>Access curated learning materials and resources to develop your skills and advance your career.</p>
            </div>
          </div>
        </div>

        <div className="page-actions">
          <button className="cta-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}