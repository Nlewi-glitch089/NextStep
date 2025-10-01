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
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Lemon-Aid App",
      description: "A teen-focused app that encourages stepping out of comfort zones, building friendships, and accessing peer support. Features include guided challenges, mentorship options, and gamified progress tracking.",
      tech: "Figma (UI/UX), Frontend TBD, Research + Prototyping",
      link: "https://www.figma.com/proto/SCW3VXsYHKKSe8pNWJ0OYw/Lemon-Aid-Wireframe?node-id=6-3&starting-point-node-id=6%3A3"
    },
    {
      id: 2,
      title: "DataDrift",
      description: "A fun package tracker project themed around tech aesthetics. Lets users track shipping progress with a unique, interactive interface.",
      tech: "Python",
      link: "https://platform.techsmart.codes/code/18750704/"
    }
  ]);

  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id, updatedData) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updatedData } : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}
