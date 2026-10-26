import React, { useState, useMemo } from 'react';
import { Search, Lock, ExternalLink, ArrowUpRight, Filter, Layers, Code } from 'lucide-react';
import { projects, categories, Project, ProjectCategory } from '../../data/portfolioData';
import { ProjectModal } from '../ui/ProjectModal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    categories.forEach((cat) => {
      counts[cat.key] = projects.filter((p) => p.category === cat.key).length;
    });
    return counts;
  }, []);

  return (
    <section id="projects" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '32px' }}>
          <span className="section-eyebrow">Portfolio Index</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            43 Shipped Projects &amp; Engagements
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 450, lineHeight: 1.65 }}>
            Explore client systems, autonomous agentic RAG architectures, n8n automations, published mobile apps, and enterprise full-stack platforms.
          </p>
        </div>

        {/* Search Bar & Category Filter Bar */}
        <div style={{ marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', maxWidth: '420px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-secondary)'
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tech stack (e.g. LangGraph, FastAPI)..."
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--surface-1)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.8125rem'
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              paddingBottom: '8px'
            }}
          >
            <button
              onClick={() => setSelectedCategory('All')}
              className={`badge ${selectedCategory === 'All' ? 'badge-primary' : ''}`}
              style={{
                cursor: 'pointer',
                padding: '8px 16px',
                fontSize: '0.8125rem',
                fontWeight: selectedCategory === 'All' ? 700 : 600,
                border: '1px solid var(--border-default)',
                backgroundColor: selectedCategory === 'All' ? 'var(--accent-muted)' : 'var(--surface-1)',
                color: selectedCategory === 'All' ? 'var(--accent)' : 'var(--text-primary)'
              }}
            >
              All Projects ({categoryCounts['All']})
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`badge ${isSelected ? 'badge-primary' : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 16px',
                    fontSize: '0.8125rem',
                    fontWeight: isSelected ? 700 : 600,
                    border: '1px solid var(--border-default)',
                    backgroundColor: isSelected ? 'var(--accent-muted)' : 'var(--surface-1)',
                    color: isSelected ? 'var(--accent)' : 'var(--text-primary)'
                  }}
                >
                  {cat.key} ({categoryCounts[cat.key] || 0})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results summary */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="liquid-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
              }}
            >
              {/* Card Banner / Thumbnail */}
              <div
                style={{
                  height: '140px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
                  borderBottom: '1px solid var(--border-subtle)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="badge" style={{ fontSize: '0.72rem', fontWeight: 600 }}>
                    {project.category}
                  </span>
                  {project.visibility === 'private' ? (
                    <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', fontWeight: 600 }}>
                      <Lock size={10} /> Private
                    </span>
                  ) : (
                    <span className="badge badge-emerald" style={{ fontSize: '0.72rem', fontWeight: 600 }}>
                      Public
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code size={16} color="var(--accent)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {project.tech[0]} {project.tech[1] ? `· ${project.tech[1]}` : ''}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  onClick={() => setActiveModalProject(project)}
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    cursor: 'pointer',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 450,
                    lineHeight: 1.65,
                    marginBottom: '16px',
                    flex: 1
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--surface-2)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-default)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', alignSelf: 'center' }}>
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '14px'
                  }}
                >
                  <button
                    onClick={() => setActiveModalProject(project)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--accent)'
                    }}
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight size={14} />
                  </button>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                      title="View GitHub repository"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
