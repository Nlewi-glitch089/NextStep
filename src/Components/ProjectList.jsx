import Project from './Project';
import { useProjects } from '../context/ProjectContext';

export default function ProjectList({ onEditProject }) {

    const { projects } = useProjects();

    return (
        <section className="projects-container">
            <h2>Projects</h2>
            
            <section className="projects-grid">
                {projects.map((project) => (
                    <Project
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        tech={project.tech}
                        link={project.link}
                        onEdit={onEditProject}
                    />
                ))}
            </section>
        </section>
    );
};