import React, { useState, useEffect } from 'react';
import '../styles/components/projects.css';
import TextSizeControls from './TextSizeControls.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Projects({ onNavigate }) {
  const STORAGE_KEY = 'userProjects';
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', skills: '', liveUrl: '' }); // added liveUrl

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProjects(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load projects', e);
    }
  }, []);

  const saveProjects = (next) => {
    setProjects(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.error(e); }
  };

  const handleInput = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    // validate live URL if provided (optional)
    if (form.liveUrl && form.liveUrl.trim()) {
      try {
        const normalized = new URL(form.liveUrl.trim());
        // only allow http(s)
        if (!['http:', 'https:'].includes(normalized.protocol)) {
          alert('Please enter a valid http(s) URL for the Live URL field.');
          return;
        }
      } catch (err) {
        alert('Please enter a valid Live URL (include http:// or https://) or leave it empty.');
        return;
      }
    }

    const newP = {
      id: Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean)
      , liveUrl: form.liveUrl?.trim() || '' // save optional live URL
    };
    const next = [newP, ...projects];
    saveProjects(next);
    setForm({ title: '', description: '', skills: '', liveUrl: '' });
  };

  const handleDelete = (id) => {
    const next = projects.filter(p => p.id !== id);
    saveProjects(next);
  };

  const handleEdit = (id) => {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    setForm({ title: p.title, description: p.description, skills: p.skills.join(', '), liveUrl: p.liveUrl || '' });
    // delete original and allow user to re-save (simple edit flow)
    handleDelete(id);
  };

  const handleBackToHome = () => { if (onNavigate) onNavigate('home'); };

  return (
    <main className="home-main dark projects-main">
      <nav className="navbar">
        <div className="nav-brand">
          <h1 className="nav-logo interactive-logo" onClick={handleBackToHome}>
            NextStep
            <div className="logo-glow" />
          </h1>
          <div className="nav-text-controls-inline">
            <TextSizeControls />
            <ThemeToggle />
          </div>
        </div>

        <section className="nav-links">{/* keep spacing consistent */}</section>
        <section className="nav-auth-buttons">{/* intentionally empty */}</section>
      </nav>

      <div className="page-container projects-container">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Create and showcase projects that highlight your skills</p>
        </div>

        <div className="projects-grid">
          <section className="project-form-card">
            <h3>Add a Project</h3>
            <form onSubmit={handleAdd} className="project-form">
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleInput} placeholder="Project title" />

              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleInput} placeholder="Short description" rows="4" />

              <label>Skills (comma separated)</label>
              <input name="skills" value={form.skills} onChange={handleInput} placeholder="JavaScript, React, CSS" />

              <label>Live URL (optional)</label>
              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleInput}
                placeholder="https://your-project.example.com (optional)"
              />

              <div className="form-actions">
                <button type="submit" className="cta-button">Add Project</button>
              </div>
            </form>
          </section>

          <section className="project-list-card">
            <h3>Your Projects ({projects.length})</h3>
            <div className="projects-list">
              {projects.length === 0 ? (
                <p className="empty-note">No projects yet — add one to get started.</p>
              ) : projects.map(p => (
                <article key={p.id} className="project-card">
                  <header className="project-card-header">
                    <h4>{p.title}</h4>
                    <div className="project-actions">
                      <button className="btn-secondary" onClick={() => handleEdit(p.id)}>Edit</button>
                      <button className="btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  </header>
                  <p className="project-desc">{p.description}</p>
                  {p.liveUrl && (
                    <p className="project-live">
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="live-link">
                        Open Live Project
                      </a>
                    </p>
                  )}
                  {p.skills && p.skills.length > 0 && (
                    <div className="project-skills">
                      {p.skills.map((s, idx) => <span key={idx} className="tag">{s}</span>)}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="page-actions">
          <button className="cta-button" onClick={handleBackToHome}>Back to Home</button>
        </div>
      </div>
    </main>
  );
}
