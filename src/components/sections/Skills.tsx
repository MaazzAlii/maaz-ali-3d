import React from 'react';
import { Cpu, Terminal, Layers, Database, Smartphone, Workflow } from 'lucide-react';
import { skillGroups } from '../../data/portfolioData';
import { TechCosmos3D } from '../3d/TechCosmos3D';

export const Skills: React.FC = () => {
  const getGroupIcon = (label: string) => {
    if (label.includes('AI')) return <Cpu size={18} color="var(--accent-light)" />;
    if (label.includes('Automation')) return <Workflow size={18} color="#ec4899" />;
    if (label.includes('Backend')) return <Terminal size={18} color="var(--emerald-primary)" />;
    if (label.includes('Frontend')) return <Smartphone size={18} color="var(--cyan-primary)" />;
    return <Database size={18} color="#f59e0b" />;
  };

  return (
    <section id="skills" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', marginBottom: '36px' }}>
          <span className="section-eyebrow">Technical Mastery</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            Engineering Capabilities &amp; Stack
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            A battle-tested technology ecosystem spanning autonomous agent orchestrations, enterprise workflow automation, and distributed full-stack services.
          </p>
        </div>

        {/* 3D Tech Cosmos Integration */}
        <div style={{ marginBottom: '40px' }}>
          <TechCosmos3D />
        </div>

        {/* Structured Category Skill Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="liquid-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {getGroupIcon(group.label)}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {group.label}
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="badge"
                    style={{
                      fontSize: '0.8125rem',
                      padding: '4px 10px',
                      backgroundColor: 'var(--bg-raised)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
