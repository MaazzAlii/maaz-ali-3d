import React from 'react';
import { Briefcase, Award, CheckCircle2, Calendar, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { experience, certifications } from '../../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', marginBottom: '40px' }}>
          <span className="section-eyebrow">Track Record</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            Experience &amp; Certifications
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Demonstrated engineering leadership across autonomous AI agent swarms, cloud architecture, and mission-critical client deployments.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {/* Left Column: Work Experience Timeline */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="var(--accent-light)" />
              <span>Engineering Journey</span>
            </h3>

            <div
              className="glass-card"
              style={{
                padding: '28px',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--bg-glass-card)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
                <span className="badge badge-primary">{experience.period}</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} /> {experience.location}
                </span>
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                {experience.role}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {experience.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span 
                      style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        backgroundColor: 'var(--accent-primary)',
                        marginTop: '8px',
                        flexShrink: 0
                      }} 
                    />
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Certifications */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="#f59e0b" />
              <span>Accredited Credentials</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="glass-card"
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-glass-card)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-raised)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: cert.provider === 'Microsoft' ? '#0078d4' : '#10b981',
                        border: '1px solid var(--border-subtle)',
                        flexShrink: 0
                      }}
                    >
                      <Award size={22} />
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {cert.title}
                      </h4>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {cert.provider} {cert.date ? `· ${cert.date}` : ''}
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {cert.marks ? (
                      <span className="badge badge-primary" style={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                        {cert.marks}
                      </span>
                    ) : (
                      <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                        {cert.status || 'Verified'}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Degree verification banner */}
              <div
                className="glass-card"
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
                  border: '1px solid var(--border-glow)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Sparkles size={16} color="var(--accent-light)" />
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)' }}>
                    ACADEMIC STATUS
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  BS Computer Science
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  National University of Modern Languages (NUML) Islamabad · Expected Graduation: January 2027
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
