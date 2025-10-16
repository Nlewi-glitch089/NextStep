import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}

export function ProjectProvider({ children }) {
  // In production, this would be fetched from backend based on user ID
  const [currentUserId] = useState('user-demo-123'); // Demo user ID
  
  // Sample data - in production, fetch from API based on currentUserId
  const [projects, setProjects] = useState([
    {
      id: 1,
      userId: 'user-demo-123', // Associate projects with specific users
      title: "Lemon-Aid App",
      description: "A teen-focused app that encourages stepping out of comfort zones, building friendships, and accessing peer support. Features include guided challenges, mentorship options, and gamified progress tracking.",
      tech: "Figma (UI/UX), Frontend TBD, Research + Prototyping",
      link: "https://www.figma.com/proto/SCW3VXsYHKKSe8pNWJ0OYw/Lemon-Aid-Wireframe?node-id=6-3&starting-point-node-id=6%3A3"
    },
  
  ]);

  // Filter projects for current user
  const userProjects = projects.filter(project => project.userId === currentUserId);

  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      userId: currentUserId, // Associate with current user
      ...projectData
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id, updatedData) => {
    setProjects(prev => 
      prev.map(project => 
        (project.id === id && project.userId === currentUserId) 
          ? { ...project, ...updatedData } 
          : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(prev => 
      prev.filter(project => !(project.id === id && project.userId === currentUserId))
    );
  };

  const value = {
    projects: userProjects, // Only return current user's projects
    addProject,
    updateProject,
    deleteProject,
    currentUserId
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}
