import { useProjects } from '../context/ProjectContext';
import { useState, useEffect } from 'react';

export default function ProjectForm({ onCancel, editingProject }) {
    
    const { addProject, updateProject } = useProjects();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tech: '',
        link: ''
    });

    // Populate form when editing
    useEffect(() => {
        if (editingProject) {
            setFormData({
                title: editingProject.title || '',
                description: editingProject.description || '',
                tech: editingProject.tech || '',
                link: editingProject.link || ''
            });
        }
    }, [editingProject]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.description.trim()) {
            alert('Title and description are required');
            return;
        }

        const projectData = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            tech: formData.tech.trim() || '',
            link: formData.link.trim() || ''
        };

        if (editingProject) {
            updateProject(editingProject.id, projectData);
        } else {
            addProject(projectData);
        }
        
        onCancel();
    };

    return (
        <form className="project-form" onSubmit={handleSubmit}>
            <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            
            <div className="form-group">
                <label htmlFor="title">Project Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter project title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your project"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="tech">Technologies</label>
                <input
                    type="text"
                    id="tech"
                    name="tech"
                    placeholder="e.g., React, Node.js, MongoDB"
                    value={formData.tech}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="link">Live Demo URL (Optional)</label>
                <input
                    type="url"
                    id="link"
                    name="link"
                    placeholder="https://your-project.com (optional)"
                    value={formData.link}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}