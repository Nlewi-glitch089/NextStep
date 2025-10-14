import React, { useState } from 'react';
import '../styles/components/skillform.css';

export default function SkillForm({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    techSkills: [],
    resumeConfidence: null,
    careerGoal: null,
    experience: null,
    learningStyle: null
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'techSkills',
      question: 'Which technical skills do you have experience with?',
      subtitle: 'Select all that apply',
      type: 'multiple',
      options: [
        { value: 'html-css', label: 'HTML/CSS', icon: '🎨' },
        { value: 'javascript', label: 'JavaScript', icon: '⚡' },
        { value: 'python', label: 'Python', icon: '🐍' },
        { value: 'databases', label: 'Databases', icon: '🗄️' },
        { value: 'cloud', label: 'Cloud Services', icon: '☁️' },
        { value: 'none', label: 'Just Getting Started', icon: '🌱' }
      ]
    },
    {
      id: 'resumeConfidence',
      question: 'How confident are you in your current resume?',
      subtitle: "Be honest—we're here to help!",
      type: 'single',
      options: [
        { value: 'very', label: 'Very Confident', desc: 'Ready to send it out', icon: '💪' },
        { value: 'somewhat', label: 'Somewhat Confident', desc: 'Could use some polish', icon: '👍' },
        { value: 'not-very', label: 'Not Very Confident', desc: 'Needs significant work', icon: '🤔' },
        { value: 'none', label: "Don't Have One Yet", desc: 'Starting from scratch', icon: '📄' }
      ]
    },
    {
      id: 'careerGoal',
      question: "What's your main career goal right now?",
      subtitle: 'Choose what matters most to you',
      type: 'single',
      options: [
        { value: 'first-job', label: 'Land My First Job', icon: '🎯' },
        { value: 'switch', label: 'Switch Career Paths', icon: '🔄' },
        { value: 'advance', label: 'Advance to Senior Role', icon: '📈' },
        { value: 'skills', label: 'Build New Skills', icon: '🎓' },
        { value: 'explore', label: 'Just Exploring Options', icon: '🧭' }
      ]
    },
    {
      id: 'experience',
      question: 'How much professional experience do you have?',
      subtitle: 'In your field or related areas',
      type: 'single',
      options: [
        { value: 'none', label: 'No Experience', desc: 'Just starting out', icon: '🌱' },
        { value: '0-2', label: '0-2 Years', desc: 'Early career', icon: '🌿' },
        { value: '3-5', label: '3-5 Years', desc: 'Building expertise', icon: '🌳' },
        { value: '5+', label: '5+ Years', desc: 'Experienced professional', icon: '🏆' }
      ]
    },
    {
      id: 'learningStyle',
      question: 'How do you prefer to learn new skills?',
      subtitle: 'This helps us recommend the right resources',
      type: 'single',
      options: [
        { value: 'video', label: 'Video Tutorials', icon: '🎥' },
        { value: 'reading', label: 'Articles & Documentation', icon: '📚' },
        { value: 'hands-on', label: 'Hands-on Projects', icon: '🛠️' },
        { value: 'interactive', label: 'Interactive Courses', icon: '💻' },
        { value: 'mentorship', label: 'Mentorship & Guidance', icon: '👥' }
      ]
    }
  ];

  const handleAnswer = (questionId, value, isMultiple = false) => {
    if (isMultiple) {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(v => v !== value)
        : [...currentAnswers, value];
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const canProceed = () => {
    const currentQuestion = questions[step];
    const answer = answers[currentQuestion.id];
    return currentQuestion.type === 'multiple'
      ? answer && answer.length > 0
      : answer !== null;
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const getRecommendations = () => {
    const recs = [];

    if (answers.techSkills?.includes('none') || answers.techSkills?.length <= 1) {
      recs.push({
        title: 'Start with Fundamentals',
        description: 'Begin with HTML, CSS, and JavaScript basics to build a solid foundation.',
        icon: '🎯',
        priority: 'high'
      });
    } else if (answers.techSkills?.length >= 3) {
      recs.push({
        title: 'Showcase Your Skills',
        description: 'Build a portfolio project that demonstrates your diverse technical abilities.',
        icon: '🎨',
        priority: 'medium'
      });
    }

    if (answers.resumeConfidence === 'none' || answers.resumeConfidence === 'not-very') {
      recs.push({
        title: 'Resume Builder Workshop',
        description: 'Use our guided resume builder to create a professional resume that stands out.',
        icon: '📝',
        priority: 'high'
      });
    }

    if (answers.careerGoal === 'first-job') {
      recs.push({
        title: 'Entry-Level Job Board',
        description: 'Explore curated entry-level positions that welcome new professionals.',
        icon: '🚀',
        priority: 'high'
      });
    } else if (answers.careerGoal === 'advance') {
      recs.push({
        title: 'Leadership Skills Module',
        description: 'Develop the soft skills needed for senior roles and management positions.',
        icon: '👔',
        priority: 'medium'
      });
    }

    if (answers.learningStyle === 'hands-on') {
      recs.push({
        title: 'Project-Based Challenges',
        description: 'Complete real-world projects that build your portfolio while you learn.',
        icon: '🛠️',
        priority: 'medium'
      });
    } else if (answers.learningStyle === 'mentorship') {
      recs.push({
        title: 'Connect with a Mentor',
        description: 'Get matched with experienced professionals who can guide your career journey.',
        icon: '🤝',
        priority: 'high'
      });
    }

    recs.push({
      title: 'Personalized Learning Path',
      description: 'Follow a custom roadmap designed specifically for your goals and experience level.',
      icon: '🗺️',
      priority: 'high'
    });

    return recs.sort((a, b) => a.priority === 'high' ? -1 : 1);
  };

  const currentQuestion = questions[step];

  const handleGetStarted = () => {
    if (onComplete) {
      onComplete();
    } else {
      alert('Navigating to dashboard...');
    }
  };

  return (
    <main className="skill-form-container">
      {!showResults ? (
        <section className="skill-form-card">
          <div className="progress-bar">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`progress-segment ${index <= step ? 'active' : ''}`}
              />
            ))}
          </div>

          <header className="question-header">
            <div className="question-number">
              Question {step + 1} of {questions.length}
            </div>
            <h2 className="question-title">{currentQuestion.question}</h2>
            <p className="question-subtitle">{currentQuestion.subtitle}</p>
          </header>

          <section className="options-container">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentQuestion.type === 'multiple'
                ? answers[currentQuestion.id]?.includes(option.value)
                : answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={option.value}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() =>
                    handleAnswer(currentQuestion.id, option.value, currentQuestion.type === 'multiple')
                  }
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="option-icon">{option.icon}</span>
                  <div className="option-content">
                    <div className="option-label">{option.label}</div>
                    {option.desc && <div className="option-desc">{option.desc}</div>}
                  </div>
                  {isSelected && <span className="option-checkmark">✓</span>}
                </button>
              );
            })}
          </section>

          <footer className="form-navigation">
            <button onClick={handleBack} disabled={step === 0} className="btn-secondary">
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary"
            >
              {step === questions.length - 1 ? 'See My Results' : 'Next'}
            </button>
          </footer>
        </section>
      ) : (
        <section className="results-card">
          <header className="results-header">
            <div className="results-icon">🎉</div>
            <h2 className="results-title">Your Personalized Career Roadmap</h2>
            <p className="results-subtitle">
              Based on your answers, here's what we recommend to help you reach your goals
            </p>
          </header>

          <section className="recommendations-container">
            {getRecommendations().map((rec, index) => (
              <article
                key={index}
                className={`recommendation-card ${rec.priority === 'high' ? 'priority-high' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="recommendation-icon">{rec.icon}</span>
                <div className="recommendation-content">
                  <h3 className="recommendation-title">
                    {rec.title}
                    {rec.priority === 'high' && (
                      <span className="priority-badge">RECOMMENDED</span>
                    )}
                  </h3>
                  <p className="recommendation-desc">{rec.description}</p>
                </div>
              </article>
            ))}
          </section>

          <footer className="results-footer">
            <button
              onClick={handleGetStarted}
              className="btn-primary btn-large"
            >
              Get Started on My Journey
            </button>
            <p className="footer-note">
              You can always update your preferences in settings
            </p>
          </footer>
        </section>
      )}
    </main>
  );
}
