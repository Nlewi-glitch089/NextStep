import React from 'react';

export default function Services({ onNavigate }) {
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
          <p className="page-subtitle">Comprehensive Career Solutions for Your Success</p>
        </div>

        <div className="page-content">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3 className="service-title">Career Guidance</h3>
              <p className="service-description">
                Personalized career counseling sessions with industry experts to help you identify 
                your strengths, interests, and ideal career path.
              </p>
              <ul className="service-features">
                <li>One-on-one career counseling</li>
                <li>Skills assessment and analysis</li>
                <li>Industry insights and trends</li>
                <li>Career roadmap development</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">📄</div>
              <h3 className="service-title">Resume Building</h3>
              <p className="service-description">
                Professional resume creation and optimization services to help you stand out 
                to employers and pass through applicant tracking systems.
              </p>
              <ul className="service-features">
                <li>Professional resume templates</li>
                <li>ATS-optimized formatting</li>
                <li>Industry-specific customization</li>
                <li>Cover letter assistance</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🎤</div>
              <h3 className="service-title">Interview Preparation</h3>
              <p className="service-description">
                Comprehensive interview coaching including mock interviews, question practice, 
                and confidence-building techniques.
              </p>
              <ul className="service-features">
                <li>Mock interview sessions</li>
                <li>Common questions practice</li>
                <li>Body language coaching</li>
                <li>Industry-specific preparation</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3 className="service-title">Skill Assessment</h3>
              <p className="service-description">
                Detailed evaluation of your current skills and identification of areas for 
                improvement to meet industry demands.
              </p>
              <ul className="service-features">
                <li>Comprehensive skills testing</li>
                <li>Gap analysis reports</li>
                <li>Learning recommendations</li>
                <li>Progress tracking</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3 className="service-title">Job Matching</h3>
              <p className="service-description">
                AI-powered job matching service that connects you with opportunities that 
                align with your skills, interests, and career goals.
              </p>
              <ul className="service-features">
                <li>Personalized job recommendations</li>
                <li>Application tracking</li>
                <li>Employer introductions</li>
                <li>Salary negotiation guidance</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3 className="service-title">Professional Development</h3>
              <p className="service-description">
                Ongoing support for career advancement including skill development programs, 
                networking opportunities, and leadership training.
              </p>
              <ul className="service-features">
                <li>Skill development courses</li>
                <li>Networking events</li>
                <li>Mentorship programs</li>
                <li>Leadership workshops</li>
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
