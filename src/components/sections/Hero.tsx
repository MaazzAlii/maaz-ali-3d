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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height) + 30px)',
        paddingBottom: '60px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '40px'
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
              <span className="text-gradient">agentic systems</span>{' '}
              and automating businesses end-to-end.
            </h1>

            {/* Subtitle */}
            <p 
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                fontWeight: 450,
                lineHeight: 1.65,
                marginBottom: '28px'
              }}
            >
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
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

            {/* Metric Counters Bar */}
            <div 
              className="liquid-card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                padding: '18px 24px',
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
                <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--accent-cyan)', lineHeight: 1 }}>
                  2
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  Play Store Apps
                </p>
              </div>

              <div>
                <p style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--warning-fg)', lineHeight: 1 }}>
                  983
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  AZ-900 / 1000
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Agentic Swarm Canvas */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '480px',
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
