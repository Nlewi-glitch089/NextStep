// ServicesPage.jsx
import React from 'react';
import '../styles/pages/services.css';

export default function ServicesPage({ onNavigate }) {
  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <main className="home-main dark">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">Comprehensive Career Guidance Solutions Designed for Your Success</p>
        </div>

        <div className="page-content">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3 className="service-title">Career Assessment & Planning</h3>
              <p className="service-description">
                Comprehensive skills, interests, and personality evaluation to identify your ideal career path. Our advanced assessment tools help you understand your strengths and map them to in-demand career opportunities.
              </p>
              <ul className="service-features">
                <li>Skills & interests assessment</li>
                <li>Personality profiling</li>
                <li>Career path recommendations</li>
                <li>Industry trend analysis</li>
                <li>Goal setting & planning</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📄</div>
              <h3 className="service-title">Resume & Portfolio Building</h3>
              <p className="service-description">
                Professional resume templates and guidance to make you stand out to employers. We help you craft compelling narratives that showcase your unique value proposition and achievements.
              </p>
              <ul className="service-features">
                <li>ATS-optimized resume templates</li>
                <li>Professional portfolio creation</li>
                <li>Cover letter writing</li>
                <li>LinkedIn profile optimization</li>
                <li>Personal branding guidance</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎤</div>
              <h3 className="service-title">Interview Preparation</h3>
              <p className="service-description">
                Mock interviews and comprehensive feedback to help you ace your next job interview. Practice with industry-specific questions and receive personalized coaching to boost your confidence.
              </p>
              <ul className="service-features">
                <li>Mock interview sessions</li>
                <li>Industry-specific preparation</li>
                <li>Behavioral question coaching</li>
                <li>Video interview practice</li>
                <li>Salary negotiation guidance</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3 className="service-title">Skill Development</h3>
              <p className="service-description">
                Identify and bridge skill gaps with our curated learning resources and development programs. Stay competitive with the latest industry trends and technologies.
              </p>
              <ul className="service-features">
                <li>Skill gap analysis</li>
                <li>Learning path recommendations</li>
                <li>Industry certification guidance</li>
                <li>Online course curation</li>
                <li>Progress tracking</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3 className="service-title">Job Market Insights</h3>
              <p className="service-description">
                Access real-time job market data and trends to make informed career decisions. Understand salary expectations, growth opportunities, and industry demands.
              </p>
              <ul className="service-features">
                <li>Market trend analysis</li>
                <li>Salary benchmarking</li>
                <li>Growth opportunity mapping</li>
                <li>Location-based insights</li>
                <li>Industry reports</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3 className="service-title">Mentorship & Networking</h3>
              <p className="service-description">
                Connect with industry professionals and mentors who can guide your career journey. Build meaningful professional relationships and expand your network.
              </p>
              <ul className="service-features">
                <li>Mentor matching</li>
                <li>Networking event access</li>
                <li>Industry connections</li>
                <li>Professional community</li>
                <li>Career coaching sessions</li>
              </ul>
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