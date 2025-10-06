import React, { useState } from 'react';

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
    // Here you would typically save to backend
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

  const handleLogout = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <main className="home-main dark">
      {/* Add simple navigation */}
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
                      <option value="Entry Level">Entry Level</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
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
