import React, { useState } from 'react';
import ProjectList from './ProjectList.jsx';
import ProjectForm from './ProjectForm.jsx';

export default function ProjectsPage({ onNavigate }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProject(null);
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
          <h1 className="page-title">My Projects</h1>
          <p className="page-subtitle">Showcase your work and track your progress</p>
        </div>

        <div className="page-content">
          {!showForm ? (
            <>
              <div className="projects-header">
                <button className="cta-button" onClick={handleAddProject}>
                  Add New Project
                </button>
              </div>
              <ProjectList onEditProject={handleEditProject} />
            </>
          ) : (
            <ProjectForm 
              onCancel={handleCancelForm} 
              editingProject={editingProject}
            />
          )}
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
