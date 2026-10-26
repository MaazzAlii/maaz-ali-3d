import React, { useState, useEffect } from 'react';
import { X, Lock, ExternalLink, Layers, Target, CheckCircle2, Cpu } from 'lucide-react';
import { GitHubIcon } from './Icons';
import { Project } from '../../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type TabType = 'overview' | 'architecture' | 'results';

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  useEffect(() => {
    setActiveTab('overview');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-primary">{project.category}</span>
              {project.visibility === 'private' ? (
                <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Lock size={11} /> Private Client Project
                </span>
              ) : (
                <span className="badge badge-emerald">Open Source / Public</span>
              )}
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="btn-outline"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              flexShrink: 0
            }}
            aria-label="Close project modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            padding: '0 24px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-raised)',
            gap: '8px'
          }}
        >
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '12px 16px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: activeTab === 'overview' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'overview' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Target size={15} />
            Overview &amp; Problem
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            style={{
              padding: '12px 16px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: activeTab === 'architecture' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'architecture' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Cpu size={15} />
            Architecture &amp; Stack
          </button>

          <button
            onClick={() => setActiveTab('results')}
            style={{
              padding: '12px 16px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: activeTab === 'results' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'results' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle2 size={15} />
            Results &amp; Impact
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'overview' && (
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                Problem Statement &amp; Objective
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                {project.overview || project.description}
              </p>
              {project.metrics && project.metrics.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    KEY METRICS:
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.metrics.map((m, idx) => (
                      <span key={idx} className="badge badge-cyan">{m}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'architecture' && (
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                System Architecture &amp; Technical Decisions
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                {project.architecture || 'Built following clean architecture principles, leveraging modular components, type-safe API schemas, and optimized data workflows.'}
              </p>

              <h5 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                TECHNOLOGIES UTILIZED:
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tech.map((t) => (
                  <span key={t} className="badge" style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-primary)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                Deliverables &amp; Outcomes
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {project.results || 'Successfully implemented, verified, and shipped to meet production standards and operational requirements.'}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.8125rem' }}
              >
                <GitHubIcon size={15} />
                <span>Source Code</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.8125rem' }}
              >
                <ExternalLink size={15} />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="btn btn-outline"
            style={{ padding: '6px 16px', fontSize: '0.8125rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
