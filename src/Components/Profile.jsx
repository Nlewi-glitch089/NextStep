import React, { useState, useEffect } from 'react';
import SkillFormPage from './SkillFormPage.jsx';
import '../styles/pages/profile.css';

export default function Profile({ onNavigate }) {
  const [userProfile, setUserProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    currentRole: 'Computer Science Student',
    careerGoal: 'Software Engineer',
    skills: ['JavaScript', 'React', 'Python', 'CSS'],
    experience: 'Entry Level'
  });

  const [originalProfile, setOriginalProfile] = useState({...userProfile});
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [surveyData, setSurveyData] = useState(null);
  const [showSurveyData, setShowSurveyData] = useState(false);
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);
  const [error, setError] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    try {
      const savedUserData = localStorage.getItem("userProfile");
      const savedSurveyData = localStorage.getItem("surveyAnswers");
      
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        // Ensure userData has required fields
        const safeUserData = {
          fullName: userData.fullName || 'User',
          email: userData.email || '',
          currentRole: userData.currentRole || '',
          careerGoal: userData.careerGoal || '',
          skills: Array.isArray(userData.skills) ? userData.skills : [],
          experience: userData.experience || 'Entry Level',
          ...userData
        };
        setUserProfile(safeUserData);
        setOriginalProfile(safeUserData);
      }
      
      if (savedSurveyData) {
        const parsedSurveyData = JSON.parse(savedSurveyData);
        setSurveyData(parsedSurveyData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Failed to load profile data. Please try refreshing the page.');
    }
  }, []);

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setUserProfile(prev => ({
        ...prev,
        [name]: value
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile field.');
    }
  };

  const handleSave = () => {
    try {
      setIsEditing(false);
      setOriginalProfile({...userProfile});
      
      // Save updated profile to localStorage
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserProfile({...originalProfile});
    setNewSkill('');
  };

  const handleAddSkill = () => {
    try {
      if (newSkill.trim() && !userProfile.skills.includes(newSkill.trim())) {
        setUserProfile(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()]
        }));
        setNewSkill('');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      setError('Failed to add skill.');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    try {
      setUserProfile(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill !== skillToRemove)
      }));
    } catch (error) {
      console.error('Error removing skill:', error);
      setError('Failed to remove skill.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const handleBackToHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleRetakeSurvey = () => {
    try {
      // Clear existing survey data
      localStorage.removeItem("surveyAnswers");
      
      const updatedProfile = {
        ...userProfile,
        hasCompletedSurvey: false
      };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      
      // Clear local survey data state
      setSurveyData(null);
      setShowSurveyData(false);
      
      // Show the skill assessment form
      setShowSkillAssessment(true);
    } catch (error) {
      console.error('Error retaking survey:', error);
      setError('Failed to start survey retake. Please try again.');
    }
  };

  const handleSkillAssessmentComplete = (surveyAnswers) => {
    try {
      // Save survey answers to localStorage
      if (surveyAnswers) {
        const surveyDataWithTimestamp = {
          ...surveyAnswers,
          completedAt: Date.now()
        };
        
        localStorage.setItem("surveyAnswers", JSON.stringify(surveyDataWithTimestamp));
        setSurveyData(surveyDataWithTimestamp);
        
        // Update user profile to mark survey as completed
        const updatedProfile = {
          ...userProfile,
          hasCompletedSurvey: true,
          // Update profile with survey data if available
          ...(surveyAnswers.skills && Array.isArray(surveyAnswers.skills) && { skills: surveyAnswers.skills }),
          ...(surveyAnswers.experience && { experience: surveyAnswers.experience }),
          ...(surveyAnswers.careerGoal && { careerGoal: surveyAnswers.careerGoal }),
          ...(surveyAnswers.currentRole && { currentRole: surveyAnswers.currentRole })
        };
        
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        setUserProfile(updatedProfile);
      }
      
      // Hide the skill assessment form
      setShowSkillAssessment(false);
    } catch (error) {
      console.error('Error completing skill assessment:', error);
      setError('Failed to save assessment results. Please try again.');
      setShowSkillAssessment(false);
    }
  };

  // Error display
  if (error) {
    return (
      <main className="home-main dark">
        <nav className="navbar">
          <h1 className="nav-logo" onClick={handleBackToHome}>
            NextStep
          </h1>
          <section className="nav-auth-buttons">
            <button className="sign-in-button" onClick={handleBackToHome}>
              Back to Home
            </button>
          </section>
        </nav>
        <div className="page-container">
          <div className="error-container">
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button className="cta-button" onClick={() => window.location.reload()}>
              Refresh Page
            </button>
            <button className="btn-secondary" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Add the missing back handler
  const handleBackFromSurvey = () => {
    setShowSkillAssessment(false);
  };

  // If showing skill assessment, render the SkillFormPage
  if (showSkillAssessment) {
    return <SkillFormPage 
      onComplete={handleSkillAssessmentComplete} 
      onBack={handleBackFromSurvey}
    />;
  }

  return (
    <main className="home-main dark">
      <nav className="navbar">
        <h1 className="nav-logo" onClick={handleBackToHome}>
          NextStep
        </h1>
        <section className="nav-auth-buttons">
          {/* Removed the Back to Home button - keeping only the one at the bottom */}
        </section>
      </nav>

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title hero-title">My Profile</h1>
          <p className="page-subtitle">Manage your career profile and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {userProfile?.fullName ? userProfile.fullName.charAt(0) : 'U'}
                </div>
              </div>
              <div className="profile-info">
                <h2>{userProfile?.fullName || 'User'}</h2>
                <p>{userProfile?.currentRole || 'No role specified'}</p>
                <p className="career-goal">Goal: {userProfile?.careerGoal || 'No goal set'}</p>
              </div>
              <div className="profile-actions">
                {!isEditing ? (
                  <button className="cta-button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="btn-primary" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button className="btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-section">
                <h3>Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={userProfile?.fullName || ''}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p>{userProfile?.fullName || 'Not specified'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userProfile?.email || ''}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p>{userProfile?.email || 'Not specified'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Career Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Current Role</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="currentRole"
                        value={userProfile?.currentRole || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., Computer Science Student"
                      />
                    ) : (
                      <p>{userProfile?.currentRole || 'Not specified'}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Career Goal</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="careerGoal"
                        value={userProfile?.careerGoal || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., Software Engineer"
                      />
                    ) : (
                      <p>{userProfile?.careerGoal || 'Not specified'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Skills & Experience</h3>
                <div className="skills-section">
                  <label>Skills</label>
                  <div className="skills-list">
                    {userProfile?.skills && Array.isArray(userProfile.skills) ? 
                      userProfile.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                          {isEditing && (
                            <button 
                              className="skill-remove"
                              onClick={() => handleRemoveSkill(skill)}
                              title="Remove skill"
                            >
                              ×
                            </button>
                          )}
                        </span>
                      )) : (
                        <p>No skills added yet</p>
                      )
                    }
                  </div>
                  {isEditing && (
                    <div className="add-skill-section">
                      <div className="add-skill-input">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Add a new skill"
                          className="skill-input"
                        />
                        <button 
                          className="btn-secondary"
                          onClick={handleAddSkill}
                          disabled={!newSkill.trim()}
                        >
                          Add Skill
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Experience Level</label>
                  {isEditing ? (
                    <select
                      name="experience"
                      value={userProfile?.experience || 'Entry Level'}
                      onChange={handleInputChange}
                    >
                      <option value="Entry Level">Entry Level (0 years)</option>
                      <option value="Entry Level - Recent Graduate">Recent Graduate (0-6 months)</option>
                      <option value="Entry Level - Intern">Intern</option>
                      <option value="1 year">1 year experience</option>
                      <option value="2 years">2 years experience</option>
                      <option value="3 years">3 years experience</option>
                      <option value="4 years">4 years experience</option>
                      <option value="5 years">5 years experience</option>
                      <option value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</option>
                      <option value="Junior Professional (1-3 years)">Junior Professional (1-3 years)</option>
                      <option value="Associate (2-4 years)">Associate (2-4 years)</option>
                      <option value="Senior Level (5-8 years)">Senior Level (5-8 years)</option>
                      <option value="Senior Professional (6-10 years)">Senior Professional (6-10 years)</option>
                      <option value="Lead (7-12 years)">Lead (7-12 years)</option>
                      <option value="Principal (8-15 years)">Principal (8-15 years)</option>
                      <option value="Manager (5-10 years)">Manager (5-10 years)</option>
                      <option value="Senior Manager (8-15 years)">Senior Manager (8-15 years)</option>
                      <option value="Director (10-20 years)">Director (10-20 years)</option>
                      <option value="VP/Executive (15+ years)">VP/Executive (15+ years)</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Contractor">Contractor</option>
                      <option value="Entrepreneur">Entrepreneur</option>
                    </select>
                  ) : (
                    <p>{userProfile?.experience || 'Not specified'}</p>
                  )}
                </div>
              </div>

              {/* Enhanced Survey Assessment Results Section */}
              {surveyData ? (
                <div className="profile-section">
                  <div className="survey-header-section">
                    <h3>Career Assessment Results</h3>
                    <button 
                      className="btn-secondary toggle-survey-btn"
                      onClick={() => setShowSurveyData(!showSurveyData)}
                    >
                      {showSurveyData ? 'Hide' : 'Show'} Complete Assessment
                    </button>
                  </div>
                  
                  <div className="survey-completed-info">
                    <p className="survey-completed-date">
                      Completed: {surveyData.completedAt ? new Date(surveyData.completedAt).toLocaleDateString() : 'Unknown date'}
                    </p>
                  </div>
                  
                  {showSurveyData && (
                    <div className="survey-data-content">
                      {/* Career Interests */}
                      {surveyData.interests && Array.isArray(surveyData.interests) && surveyData.interests.length > 0 && (
                        <div className="form-group">
                          <label>Career Interests ({surveyData.interests.length})</label>
                          <div className="interests-display">
                            {surveyData.interests.map((interest, index) => (
                              <span key={index} className="interest-tag">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technology Interests */}
                      {surveyData.techInterests && Array.isArray(surveyData.techInterests) && surveyData.techInterests.length > 0 && (
                        <div className="form-group">
                          <label>Technology Interests ({surveyData.techInterests.length})</label>
                          <div className="interests-display">
                            {surveyData.techInterests.map((tech, index) => (
                              <span key={index} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technical Skills */}
                      {surveyData.skills && Array.isArray(surveyData.skills) && surveyData.skills.length > 0 && (
                        <div className="form-group">
                          <label>Technical Skills ({surveyData.skills.length})</label>
                          <div className="interests-display">
                            {surveyData.skills.map((skill, index) => (
                              <span key={index} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Soft Skills */}
                      {surveyData.softSkills && Array.isArray(surveyData.softSkills) && surveyData.softSkills.length > 0 && (
                        <div className="form-group">
                          <label>Soft Skills ({surveyData.softSkills.length})</label>
                          <div className="interests-display">
                            {surveyData.softSkills.map((skill, index) => (
                              <span key={index} className="soft-skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Work Environment Preferences */}
                      {surveyData.preferredWorkEnvironment && Array.isArray(surveyData.preferredWorkEnvironment) && surveyData.preferredWorkEnvironment.length > 0 && (
                        <div className="form-group">
                          <label>Work Environment Preferences ({surveyData.preferredWorkEnvironment.length})</label>
                          <div className="interests-display">
                            {surveyData.preferredWorkEnvironment.map((env, index) => (
                              <span key={index} className="env-tag">
                                {env}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Work Values */}
                      {surveyData.workValues && Array.isArray(surveyData.workValues) && surveyData.workValues.length > 0 && (
                        <div className="form-group">
                          <label>Work Values ({surveyData.workValues.length})</label>
                          <div className="interests-display">
                            {surveyData.workValues.map((value, index) => (
                              <span key={index} className="value-tag">
                                {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Career Priorities */}
                      {surveyData.careerPriorities && Array.isArray(surveyData.careerPriorities) && surveyData.careerPriorities.length > 0 && (
                        <div className="form-group">
                          <label>Career Priorities ({surveyData.careerPriorities.length})</label>
                          <div className="interests-display">
                            {surveyData.careerPriorities.map((priority, index) => (
                              <span key={index} className="priority-tag">
                                {priority}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Learning Styles */}
                      {surveyData.learningStyle && Array.isArray(surveyData.learningStyle) && surveyData.learningStyle.length > 0 && (
                        <div className="form-group">
                          <label>Learning Styles ({surveyData.learningStyle.length})</label>
                          <div className="interests-display">
                            {surveyData.learningStyle.map((style, index) => (
                              <span key={index} className="learning-tag">
                                {style}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Experience Level */}
                      {surveyData.experience && (
                        <div className="form-group">
                          <label>Experience Level</label>
                          <p className="survey-response">{surveyData.experience}</p>
                        </div>
                      )}
                      
                      <div className="survey-actions">
                        <button 
                          className="btn-secondary retake-btn"
                          onClick={handleRetakeSurvey}
                        >
                          Retake Assessment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="profile-section">
                  <h3>Career Assessment</h3>
                  <div className="no-survey-data">
                    <p>You haven't completed your career assessment yet.</p>
                    <button 
                      className="cta-button"
                      onClick={handleRetakeSurvey}
                    >
                      Take Career Assessment
                    </button>
                  </div>
                </div>
              )}
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
