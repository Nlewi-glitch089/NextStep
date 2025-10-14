import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/services.css';

export default function Services() {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <main className="home-main dark">
      <section className="page-container">
        <header className="page-header">
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">Comprehensive Career Guidance Solutions</p>
        </header>

        <section className="page-content">
          <section className="features-grid">
            {[
              {
                icon: '🎯',
                title: 'Career Path Analysis',
                description:
                  'Personalized career recommendations based on your skills, interests, and market trends.',
              },
              {
                icon: '📄',
                title: 'Resume Builder',
                description:
                  'Professional resume templates optimized for your target industry and role.',
              },
              {
                icon: '🎤',
                title: 'Interview Preparation',
                description:
                  'Mock interviews and practice sessions to boost your confidence and performance.',
              },
              {
                icon: '💼',
                title: 'Job Matching',
                description:
                  'AI-powered job recommendations that align with your skills and career goals.',
              },
              {
                icon: '📚',
                title: 'Skill Development',
                description:
                  'Customized learning paths to develop in-demand skills for your chosen career.',
              },
              {
                icon: '🌐',
                title: 'Industry Networking',
                description:
                  'Connect with professionals and mentors in your field of interest.',
              },
            ].map((feature, index) => (
              <article key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </article>
            ))}
          </section>
        </section>

        <footer className="page-actions">
          <button className="cta-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </footer>
      </section>
    </main>
  );
}
