import React, { useState } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Sparkles, 
  Award,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon, YouTubeIcon, InstagramIcon, TelegramIcon, TikTokIcon } from '../ui/Icons';
import { about, profile, socials, certifications } from '../../data/portfolioData';

export const About: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin': return <LinkedInIcon size={16} />;
      case 'github': return <GitHubIcon size={16} />;
      case 'youtube': return <YouTubeIcon size={16} />;
      case 'instagram': return <InstagramIcon size={16} />;
      case 'telegram': return <TelegramIcon size={16} />;
      case 'tiktok': return <TikTokIcon size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  return (
    <section id="about" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Authentic Portrait with 3D Holographic Border */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '4 / 5',
                borderRadius: 'var(--radius-xl)',
                perspective: '1000px',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out, box-shadow 0.25s',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px var(--accent-glow)',
                  border: '2px solid var(--border-glow)',
                  position: 'relative'
                }}
              >
                <img
                  src={profile.photo}
                  alt="Maaz Ali — AI Engineer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  loading="lazy"
                />

                {/* Cyber gradient overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7, 9, 14, 0.85) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }} 
                />

                {/* Floating identity badge at bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(14, 18, 27, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#ffffff' }}>{profile.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent-light)', fontFamily: 'var(--font-mono)' }}>
                      BS CS · NUML Islamabad
                    </p>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Credentials */}
          <div>
            <span className="section-eyebrow">{about.eyebrow}</span>
            <h2 className="display-2" style={{ marginBottom: '20px' }}>
              {about.heading}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {about.paragraphs.map((p, idx) => (
                <p 
                  key={idx} 
                  style={{ 
                    fontSize: '1rem', 
                    color: 'var(--text-secondary)', 
                    lineHeight: 1.65 
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Quick Facts Code Card */}
            <div 
              className="glass-card" 
              style={{ 
                padding: '20px', 
                borderRadius: 'var(--radius-lg)', 
                marginBottom: '28px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', color: 'var(--text-muted)' }}>
                <Terminal size={14} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>quick_facts.json</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <GraduationCap size={18} color="var(--accent-light)" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>BS Computer Science</strong>, NUML Islamabad (Graduating Jan 2027)
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Microsoft Certified AZ-900</strong>: Azure Fundamentals (Score: 983 / 1000)
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={18} color="var(--cyan-primary)" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Location</strong>: Rawalpindi, Pakistan (Open to Remote &amp; Worldwide Relocation)
                  </span>
                </div>
              </div>
            </div>

            {/* Social Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.8125rem' }}
                  aria-label={s.label}
                >
                  {getSocialIcon(s.icon)}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
