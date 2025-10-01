import React from 'react';

export default function WhyUs() {
  return (
    <main className="home-main dark">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Why Choose NextStep</h1>
          <p className="page-subtitle">What Sets Us Apart in Career Guidance</p>
        </div>

        <div className="page-content">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI-Powered Career Recommendations</h3>
              <p className="feature-description">
                Our advanced AI analyzes your skills, interests, and market trends to provide personalized 
                career recommendations that adapt in real-time to industry changes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Real-Time Job Market Insights</h3>
              <p className="feature-description">
                Access live data on job demand, salary trends, and skill requirements across industries. 
                Stay ahead of the curve with market intelligence that updates daily.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Industry Professional Network</h3>
              <p className="feature-description">
                Connect directly with professionals, mentors, and hiring managers across various industries. 
                Build relationships that can accelerate your career growth.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Ambitious Goals & Vision</h3>
              <p className="feature-description">
                We're building towards helping 10,000+ students by 2027, with plans to secure 7,500+ job placements 
                and establish partnerships with 250+ companies. Our goal is to achieve an 89% success rate through data-driven guidance.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Personalized Learning Paths</h3>
              <p className="feature-description">
                Get customized skill development recommendations based on your career goals and current 
                market demands. Learn exactly what you need to succeed.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Immediate Impact</h3>
              <p className="feature-description">
                Start seeing results from day one with actionable insights, immediate skill gap analysis, 
                and ready-to-use career tools and templates.
              </p>
            </div>
          </div>

          <section className="testimonials-section">
            <h2>What Our Students Say</h2>
            <div className="testimonials-grid">
              <blockquote className="testimonial">
                <p>"NextStep helped me identify skills I didn't even know I had and connected me with my dream job in tech."</p>
                <cite>- Sarah M., Software Developer</cite>
              </blockquote>
              <blockquote className="testimonial">
                <p>"The real-time market insights gave me the confidence to negotiate a higher salary."</p>
                <cite>- Marcus J., Marketing Specialist</cite>
              </blockquote>
              <blockquote className="testimonial">
                <p>"I went from uncertain graduate to hired professional in just 3 months."</p>
                <cite>- Emma L., Data Analyst</cite>
              </blockquote>
            </div>
          </section>
        </div>

        <div className="page-actions">
          <button className="cta-button" onClick={() => window.history.back()}>
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
