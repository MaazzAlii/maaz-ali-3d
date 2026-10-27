import React from 'react';
import { Cpu, Terminal, Layers, Database, Smartphone, Workflow } from 'lucide-react';
import { skillGroups } from '../../data/portfolioData';
import { TechCosmos3D } from '../3d/TechCosmos3D';

interface SkillsProps {
  theme?: 'dark' | 'light';
}

export const Skills: React.FC<SkillsProps> = ({ theme = 'dark' }) => {
  const getGroupIcon = (label: string) => {
    if (label.includes('AI')) return <Cpu size={18} color="var(--accent)" />;
    if (label.includes('Automation')) return <Workflow size={18} color="#ec4899" />;
    if (label.includes('Backend')) return <Terminal size={18} color="var(--accent-emerald)" />;
    if (label.includes('Frontend')) return <Smartphone size={18} color="var(--accent-cyan)" />;
    return <Database size={18} color="var(--warning-fg)" />;
  };

  return (
    <section id="skills" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', marginBottom: '36px' }}>
          <span className="section-eyebrow">Technical Mastery</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            Engineering Capabilities &amp; Stack
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 450, lineHeight: 1.65 }}>
            A battle-tested technology ecosystem spanning autonomous agent orchestrations, enterprise workflow automation (n8n &amp; GoHighLevel), and distributed full-stack services.
          </p>
        </div>

        {/* 3D Dynamic Tech Cosmos Architecture Graph */}
        <div style={{ marginBottom: '40px' }}>
          <TechCosmos3D theme={theme} />
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
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-default)'
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
                      fontWeight: 600,
                      padding: '4px 10px',
                      backgroundColor: 'var(--surface-2)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-default)'
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
