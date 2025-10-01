import React from 'react';

export default function About({ onNavigate }) {
  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <main className="home-main dark">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">About NextStep</h1>
          <p className="page-subtitle">Empowering Students to Bridge the Career Gap</p>
        </div>

        <section className="page-content">
          <article className="content-section">
            <h2>Our Mission</h2>
            <p>
              NextStep is dedicated to helping students transition successfully from education to meaningful careers 
              through personalized guidance and industry insights. We believe every student deserves the opportunity 
              to reach their full potential in their chosen career path, regardless of their background or current experience level.
            </p>
          </article>

          <article className="content-section">
            <h2>The Problem We Solve</h2>
            <section className="problem-grid">
              <article className="problem-card">
                <h3>Skills Gap</h3>
                <p>Students often don't know which skills employers actually need in today's rapidly evolving market.</p>
              </article>
              <article className="problem-card">
                <h3>Limited Resources</h3>
                <p>Many schools lack dedicated career counseling and access to modern job market insights.</p>
              </article>
              <article className="problem-card">
                <h3>Outdated Guidance</h3>
                <p>Traditional career advice doesn't reflect rapidly changing industry demands and emerging roles.</p>
              </article>
              <article className="problem-card">
                <h3>Preparation Gap</h3>
                <p>Students need practical tools for resumes, interviews, networking, and job searching strategies.</p>
              </article>
            </section>
          </article>

          <article className="content-section">
            <h2>Our Vision Someday &amp; Future Goals</h2>
            <section className="impact-stats">
              <article className="impact-item">
                <header className="impact-number">10,000+</header>
                <p>Students to Guide by 2027</p>
              </article>
              <article className="impact-item">
                <header className="impact-number">7,500+</header>
                <p>Planned Job Placements</p>
              </article>
              <article className="impact-item">
                <header className="impact-number">250+</header>
                <p>Target Partner Companies</p>
              </article>
              <article className="impact-item">
                <header className="impact-number">89%</header>
                <p>Target Success Rate</p>
              </article>
            </section>
          </article>
        </section>

        <div className="page-actions">
          <button className="cta-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
