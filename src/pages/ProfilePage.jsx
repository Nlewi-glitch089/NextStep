// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/pages/profile.css';

export default function ProfilePage({ onNavigate }) {
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

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem("userProfile");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setUserProfile(userData);
      setOriginalProfile(userData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setOriginalProfile({...userProfile});
    
    // Save updated profile to localStorage
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserProfile({...originalProfile});
    setNewSkill('');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !userProfile.skills.includes(newSkill.trim())) {
      setUserProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
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
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Manage your career profile and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {userProfile.fullName.charAt(0)}
                </div>
              </div>
              <div className="profile-info">
                <h2>{userProfile.fullName}</h2>
                <p>{userProfile.currentRole}</p>
                <p className="career-goal">Goal: {userProfile.careerGoal}</p>
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
                        value={userProfile.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p>{userProfile.fullName}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p>{userProfile.email}</p>
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
                        value={userProfile.currentRole}
                        onChange={handleInputChange}
                        placeholder="e.g., Computer Science Student"
                      />
                    ) : (
                      <p>{userProfile.currentRole}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Career Goal</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="careerGoal"
                        value={userProfile.careerGoal}
                        onChange={handleInputChange}
                        placeholder="e.g., Software Engineer"
                      />
                    ) : (
                      <p>{userProfile.careerGoal}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Skills & Experience</h3>
                <div className="skills-section">
                  <label>Skills</label>
                  <div className="skills-list">
                    {userProfile.skills.map((skill, index) => (
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
                    ))}
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
                      value={userProfile.experience}
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
                    <p>{userProfile.experience}</p>
                  )}
                </div>
              </div>
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