import React, { useState } from 'react';
import '../styles/pages/contact.css';

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <main className="home-main dark">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Contact NextStep</h1>
          <p className="page-subtitle">Get in Touch - We're Here to Help</p>
        </div>

        <section className="contact-content">
          <aside className="contact-info">
            <article className="contact-section">
              <h3>📧 Email Us</h3>
              <p>info@nextstep.com</p>
              <p>For general inquiries and support</p>
            </article>

            <article className="contact-section">
              <h3>📞 Call Us</h3>
              <p>(555) 123-4567</p>
              <p>Monday - Friday, 9:00 AM - 6:00 PM EST</p>
            </article>

            <article className="contact-section">
              <h3>📍 Visit Us</h3>
              <p>123 Career Street<br />Future City, FC 12345</p>
              <p>Office hours by appointment</p>
            </article>

            <article className="contact-section">
              <h3>💬 Live Chat</h3>
              <p>Available on our website</p>
              <p>Instant support during business hours</p>
            </article>
          </aside>

          <section className="contact-form-container">
            <h3>Send Us a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="feedback">Feedback</option>
                  <option value="careers">Career Opportunities</option>
                </select>
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </fieldset>

              <button type="submit" className="cta-button">
                Send Message
              </button>
            </form>
          </section>
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
