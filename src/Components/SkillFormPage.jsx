import React, { useState, useEffect } from 'react';
import '../styles/components/skillform.css';

export default function SkillFormPage({ onComplete, onBack, initialData, retakeMode = false }) {
  // initialize formData using initialData when available
  const [formData, setFormData] = useState(() => ({
    skills: [],
    experience: '',
    careerGoal: '',
    studentStatus: '',
    intendedNextStep: '',
    intendedField: '',
    interests: [],
    preferredWorkEnvironment: [],
    learningStyle: [],
    workValues: [],
    careerPriorities: [],
    techInterests: [],
    softSkills: []
  }));

  // on mount, merge initialData into formData safely
  useEffect(() => {
    if (initialData && typeof initialData === 'object') {
      // exclude any legacy `currentRole` so review shows Current Status only
      const { currentRole, ...safeData } = initialData;
      setFormData(prev => ({
        ...prev,
        ...safeData,
        // ensure arrays are arrays
        skills: Array.isArray(safeData.skills) ? safeData.skills : prev.skills,
        interests: Array.isArray(safeData.interests) ? safeData.interests : prev.interests,
        techInterests: Array.isArray(safeData.techInterests) ? safeData.techInterests : prev.techInterests,
        softSkills: Array.isArray(safeData.softSkills) ? safeData.softSkills : prev.softSkills,
        preferredWorkEnvironment: Array.isArray(safeData.preferredWorkEnvironment) ? safeData.preferredWorkEnvironment : prev.preferredWorkEnvironment,
        workValues: Array.isArray(safeData.workValues) ? safeData.workValues : prev.workValues,
        careerPriorities: Array.isArray(safeData.careerPriorities) ? safeData.careerPriorities : prev.careerPriorities,
        learningStyle: Array.isArray(safeData.learningStyle) ? safeData.learningStyle : prev.learningStyle
      }));
    }
  }, [initialData]);

  const [currentStep, setCurrentStep] = useState(0);

  // Use 5 visible steps; the final step includes Learning & Development + Review
  const steps = [
    'Basic Information',
    'Career Interests',
    'Skills & Experience',
    'Work Preferences',
    'Learning & Development'
  ];

  // Multiple choice options
  const careerInterestOptions = [
    'Software Development', 'Data Science', 'Cybersecurity', 'Web Design',
    'Mobile App Development', 'Cloud Computing', 'Artificial Intelligence',
    'Project Management', 'Digital Marketing', 'UX/UI Design', 'DevOps',
    'Database Administration', 'Network Administration', 'Quality Assurance'
  ];

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'SQL',
    'HTML/CSS', 'Git', 'AWS', 'Docker', 'Linux', 'MongoDB', 'Express.js',
    'Angular', 'Vue.js', 'TypeScript', 'PHP', 'C#', '.NET', 'Spring Boot'
  ];

  const workEnvironmentOptions = [
    'Remote Work', 'Office Environment', 'Hybrid (Remote + Office)',
    'Startup Culture', 'Corporate Environment', 'Collaborative Teams',
    'Independent Work', 'Fast-Paced Environment', 'Structured Environment',
    'Creative Workspace', 'International Teams', 'Small Team (2-10 people)',
    'Large Team (10+ people)', 'Client-Facing Roles'
  ];

  const learningStyleOptions = [
    'Hands-on Practice', 'Video Tutorials', 'Reading Documentation',
    'Interactive Courses', 'Mentorship', 'Bootcamps', 'Online Certifications',
    'University Courses', 'Self-Directed Learning', 'Group Study',
    'Project-Based Learning', 'Workshop Attendance', 'Conference Learning'
  ];

  const workValueOptions = [
    'Work-Life Balance', 'High Salary', 'Job Security', 'Career Growth',
    'Learning Opportunities', 'Company Culture', 'Flexible Schedule',
    'Making Impact', 'Innovation', 'Leadership Opportunities', 
    'Recognition', 'Autonomy', 'Teamwork', 'Challenging Work'
  ];

  const careerPriorityOptions = [
    'Quick Job Placement', 'High Starting Salary', 'Long-term Growth',
    'Skill Development', 'Industry Reputation', 'Company Benefits',
    'Location Flexibility', 'Job Stability', 'Creative Freedom',
    'Technical Challenges', 'Leadership Path', 'Entrepreneurship'
  ];

  const techInterestOptions = [
    'Frontend Development', 'Backend Development', 'Full-Stack Development',
    'Mobile Development', 'Game Development', 'Machine Learning',
    'Data Analysis', 'Cloud Architecture', 'DevOps Engineering',
    'Blockchain', 'IoT Development', 'AR/VR Development'
  ];

  const softSkillOptions = [
    'Communication', 'Problem Solving', 'Teamwork', 'Leadership',
    'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity',
    'Public Speaking', 'Project Management', 'Conflict Resolution',
    'Emotional Intelligence', 'Negotiation', 'Customer Service'
  ];

  const experienceOptions = [
    // Narrowed, student-friendly experience levels
    'Exploring career options',
    'High school student',
    'Recent graduate',
    'College student / in training',
    'Intern / apprentice',
    'Entry level / beginner',
    'Early experience (1–2 years)',
    'Intermediate (3–5 years)',
    'Advanced (5+ years)'
  ];

  const handleMultipleChoice = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSingleChoice = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const surveyAnswers = {
      ...formData,
      completedAt: Date.now()
    };
    
    console.log('Survey completed with answers:', surveyAnswers);
    
    if (onComplete) {
      onComplete(surveyAnswers);
    }
  };

  const handleBackToProfile = () => {
    if (onBack) onBack();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <div className="step-content">
            <h3>Tell us about yourself</h3>
            
            <div className="form-group">
              <label>Student Status</label>
              <div className="choice-grid">
                {['High School Senior', 'Recent Graduate', 'College Student', 'Gap Year', 'Other'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    className={`choice-button ${formData.studentStatus === opt ? 'selected' : ''}`}
                    onClick={() => handleSingleChoice('studentStatus', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Intended Next Step</label>
              <div className="choice-grid">
                {['College (2 years)', 'College (3 years)', 'College (4 years)', 'Apprenticeship / Trade', 'Workforce / Internship', 'Gap Year', 'Undecided'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    className={`choice-button ${formData.intendedNextStep === opt ? 'selected' : ''}`}
                    onClick={() => handleSingleChoice('intendedNextStep', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Intended Field of Study (optional)</label>
              <input
                type="text"
                name="intendedField"
                value={formData.intendedField}
                onChange={handleInputChange}
                placeholder={formData.intendedNextStep && formData.intendedNextStep.startsWith('College') ? 'e.g., Computer Science' : 'e.g., UX Design, Healthcare, Web Development'}
              />
            </div>

            <div className="form-group">
              <label>Career Goal</label>
              <input
                type="text"
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer, Data Scientist"
              />
            </div>

            <div className="form-group">
              <label>Experience Level — Select one</label>
              <div className="choice-grid">
                {experienceOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`choice-button ${formData.experience === option ? 'selected' : ''}`}
                    onClick={() => handleSingleChoice('experience', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1: // Career Interests
        return (
          <div className="step-content">
            <h3>What career areas interest you?</h3>
            <p>Select all that apply</p>
            
            <div className="choice-grid">
              {careerInterestOptions.map(interest => (
                <button
                  key={interest}
                  type="button"
                  className={`choice-button ${formData.interests.includes(interest) ? 'selected' : ''}`}
                  onClick={() => handleMultipleChoice('interests', interest)}
                >
                  {interest}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label>Technology Areas of Interest</label>
              <p>What specific tech areas excite you?</p>
              <div className="choice-grid">
                {techInterestOptions.map(tech => (
                  <button
                    key={tech}
                    type="button"
                    className={`choice-button ${formData.techInterests.includes(tech) ? 'selected' : ''}`}
                    onClick={() => handleMultipleChoice('techInterests', tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Skills & Experience
        return (
          <div className="step-content">
            <h3>What skills do you have or want to develop?</h3>
            <p>Select your current skills and skills you're interested in learning</p>
            
            <div className="choice-grid">
              {skillOptions.map(skill => (
                <button
                  key={skill}
                  type="button"
                  className={`choice-button ${formData.skills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => handleMultipleChoice('skills', skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label>Soft Skills</label>
              <p>What soft skills are you strong in or want to develop?</p>
              <div className="choice-grid">
                {softSkillOptions.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className={`choice-button ${formData.softSkills.includes(skill) ? 'selected' : ''}`}
                    onClick={() => handleMultipleChoice('softSkills', skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Work Preferences
        return (
          <div className="step-content">
            <h3>What work environment do you prefer?</h3>
            <p>Select all that appeal to you</p>
            
            <div className="choice-grid">
              {workEnvironmentOptions.map(env => (
                <button
                  key={env}
                  type="button"
                  className={`choice-button ${formData.preferredWorkEnvironment.includes(env) ? 'selected' : ''}`}
                  onClick={() => handleMultipleChoice('preferredWorkEnvironment', env)}
                >
                  {env}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label>Work Values</label>
              <p>What's most important to you in a job?</p>
              <div className="choice-grid">
                {workValueOptions.map(value => (
                  <button
                    key={value}
                    type="button"
                    className={`choice-button ${formData.workValues.includes(value) ? 'selected' : ''}`}
                    onClick={() => handleMultipleChoice('workValues', value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Career Priorities</label>
              <p>What are your main career priorities right now?</p>
              <div className="choice-grid">
                {careerPriorityOptions.map(priority => (
                  <button
                    key={priority}
                    type="button"
                    className={`choice-button ${formData.careerPriorities.includes(priority) ? 'selected' : ''}`}
                    onClick={() => handleMultipleChoice('careerPriorities', priority)}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Learning & Development (final step) — now also shows Review & Submit summary
        return (
          <div className="step-content">
            <h3>How do you prefer to learn?</h3>
            <p>Select all learning methods that work well for you</p>
            
            <div className="choice-grid">
              {learningStyleOptions.map(style => (
                <button
                  key={style}
                  type="button"
                  className={`choice-button ${formData.learningStyle.includes(style) ? 'selected' : ''}`}
                  onClick={() => handleMultipleChoice('learningStyle', style)}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Review section moved into final step so total steps = steps.length (5) */}
            <div className="review-section" style={{ marginTop: '1.25rem' }}>
              <h3 style={{ marginTop: '1rem' }}>Review Your Responses</h3>
              <div className="review-group">
                <h4>Basic Information</h4>
                <p><strong>Current Status:</strong> {formData.studentStatus || formData.intendedNextStep || 'No status specified'}</p>
                <p><strong>Career Goal:</strong> {formData.careerGoal || 'Not specified'}</p>
                <p><strong>Experience:</strong> {formData.experience || 'Not specified'}</p>
              </div>

              <div className="review-group">
                <h4>Career Interests ({formData.interests.length})</h4>
                <div className="review-tags">
                  {formData.interests.map(interest => (
                    <span key={interest} className="review-tag">{interest}</span>
                  ))}
                </div>
              </div>

              <div className="review-group">
                <h4>Technical Skills ({formData.skills.length})</h4>
                <div className="review-tags">
                  {formData.skills.map(skill => (
                    <span key={skill} className="review-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="review-group">
                <h4>Work Environment Preferences ({formData.preferredWorkEnvironment.length})</h4>
                <div className="review-tags">
                  {formData.preferredWorkEnvironment.map(env => (
                    <span key={env} className="review-tag">{env}</span>
                  ))}
                </div>
              </div>

              <div className="review-group">
                <h4>Learning Styles ({formData.learningStyle.length})</h4>
                <div className="review-tags">
                  {formData.learningStyle.map(style => (
                    <span key={style} className="review-tag">{style}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="skill-form-main">
      <div className="skill-form-container">
        <div className="form-header">
          <h1>Career Assessment</h1>

          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <p>Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div className="form-navigation">
            <div className="nav-left">
              {/* Single Previous button:
                - If retakeMode && at first step, act as Back to Profile (exit retake)
                - Otherwise act as normal Previous (prevStep)
                - When retakeMode is active, use primary styling for visual consistency with Next */}
              {(currentStep > 0 || (retakeMode && currentStep === 0)) && (
                <button
                  type="button"
                  className={retakeMode ? 'btn-primary' : 'btn-secondary'}
                  onClick={() => {
                    if (retakeMode && currentStep === 0) {
                      handleBackToProfile();
                    } else {
                      prevStep();
                    }
                  }}
                >
                  ← Previous
                </button>
              )}
            </div>
            
            <div className="nav-right">
              {currentStep < steps.length - 1 ? (
                <button type="button" className="btn-primary" onClick={nextStep}>
                  Next →
                </button>
              ) : (
                <button type="submit" className="cta-button">
                  Complete Assessment
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
