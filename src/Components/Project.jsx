import { useProjects } from '../context/ProjectContext';

export default function Project({ id, title, description, tech, link, onEdit }){
   
    const { deleteProject } = useProjects();

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteProject(id);
        }
    };

    const handleEdit = () => {
        onEdit({ id, title, description, tech, link });
    };

    return (
        <section className="project-card">
            <div className="project-actions">
                <button className="edit-btn" onClick={handleEdit} title="Edit Project">
                    ✏️
                </button>
                <button className="delete-btn" onClick={handleDelete} title="Delete Project">
                    🗑️
                </button>
            </div>
            
            <h3 className="project-title">{title}</h3>
            <p className="project-description">{description}</p>
            <p className="project-tech">
                <strong>Technologies:</strong> {tech || 'Not specified'}
            </p>
            {link && (
                <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link"
                >
                    View Project
                </a>
            )}
        </section>
    );
};

