import React, { useState } from 'react';
import '../styles/components/contact.css';

export default function Contact({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <main className="home-main dark">
      <nav className="navbar">
        <h1 className="nav-logo interactive-logo" onClick={handleBackToHome}>
          NextStep
          <div className="logo-glow"></div>
        </h1>
        <section className="nav-links">
          {/* Empty nav links section for consistent spacing */}
        </section>
        <section className="nav-auth-buttons">
          <button className="cta-button back-home-btn" onClick={handleBackToHome}>
            ← Back to Home
          </button>
        </section>
      </nav>

      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title hero-title">Contact Us</h1>
          <p className="page-subtitle">Get in touch with our team</p>
        </header>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-section">
              <h2>Let's Connect</h2>
              <p>Have questions about NextStep? Want to learn more about our services? We'd love to hear from you!</p>
            </div>

            <div className="contact-section">
              <h3>Get In Touch</h3>
              
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>support@nextstep.com</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>Philadelphia, PA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Send us a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us how we can help..."
                  rows="6"
                ></textarea>
              </div>

              <button type="submit" className="cta-button">
                Send Message
              </button>
            </form>
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
