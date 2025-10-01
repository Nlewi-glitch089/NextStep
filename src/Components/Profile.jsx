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

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
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
                    <button className="cta-button" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button className="demo-button" onClick={handleCancel}>
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
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  {isEditing && (
                    <button className="demo-button">Add Skill</button>
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
