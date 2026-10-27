import React from 'react';
import { ArrowUpRight, FileDown, Mail, MapPin, Sparkles, Award } from 'lucide-react';
import { HeroScene3D } from '../3d/HeroScene3D';
import { hero, profile } from '../../data/portfolioData';

interface HeroProps {
  theme?: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({ theme = 'dark' }) => {
  return (
    <section 
      id="hero" 
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - var(--nav-height))',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height) + clamp(20px, 3.5vw, 40px))',
        paddingBottom: 'clamp(40px, 5vw, 64px)',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(28px, 4vw, 48px)'
          }}
        >
          {/* Left Column: Headline & Value Prop */}
          <div style={{ maxWidth: '620px' }}>
            {/* Location & Status Pill */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="badge badge-primary">
                <Sparkles size={12} />
                Agentic AI &amp; Automation
              </span>
              <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={12} />
                Rawalpindi, PK · Open to Relocation
              </span>
            </div>

            {/* Main Title */}
            <h1 className="display-1" style={{ marginBottom: '20px' }}>
              AI Engineer building{' '}
              <span className="serif-emphasis text-gradient">agentic systems</span>{' '}
              and automating businesses end-to-end.
            </h1>

            {/* Subtitle */}
            <p 
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                fontWeight: 400,
                lineHeight: 1.65,
                marginBottom: '28px'
              }}
            >
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <a href="#projects" className="btn btn-primary">
                <span>View All 43 Projects</span>
                <ArrowUpRight size={16} />
              </a>

              <a href="/Maaz_Ali_Resume.pdf" download="Maaz_Ali_Resume.pdf" className="btn btn-secondary">
                <FileDown size={16} />
                <span>Resume (PDF)</span>
              </a>

              <a href="#contact" className="btn btn-outline">
                <Mail size={16} />
                <span>Contact</span>
              </a>
            </div>

            {/* Metric Counters Bar (Responsive 4-col desktop, 2-col mobile) */}
            <div 
              className="liquid-card hero-stats-grid"
              style={{
                padding: 'clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div>
                <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  43
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  Shipped Projects
                </p>
              </div>

              <div>
                <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                  10+
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  Client Works
                </p>
              </div>

              <div>
                <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-bronze)', lineHeight: 1 }}>
                  2
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  Play Store Apps
                </p>
              </div>

              <div>
                <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--warning-fg)', lineHeight: 1 }}>
                  983<span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>/1000</span>
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  AZ-901 Azure Score
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Agentic Swarm Canvas */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              minHeight: 'clamp(360px, 48vh, 520px)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <HeroScene3D theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
};
