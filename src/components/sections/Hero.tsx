import React from 'react';
import { ArrowUpRight, Sparkles, FileDown, ChevronDown, Compass } from 'lucide-react';
import { HeroScene3D } from '../3d/HeroScene3D';
import { profile } from '../../data/portfolioData';

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
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#06080c',
        overflow: 'hidden'
      }}
    >
      {/* 1. Immersive 3D Architectural WebGL Stage */}
      <HeroScene3D theme={theme} />

      {/* 2. Soft Radial Vignette for Editorial Legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 26% 50%, rgba(6, 8, 12, 0.88) 0%, rgba(6, 8, 12, 0.5) 55%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Subtle Bottom Horizon Fade to connect cleanly to About section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to top, #06080c 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* 3. Foreground Editorial Content Layer */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          paddingTop: 'calc(var(--nav-height) + 48px)',
          paddingBottom: '80px',
          pointerEvents: 'none'
        }}
      >
        <div style={{ maxWidth: '780px' }}>
          {/* Kicker Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              marginBottom: '28px',
              pointerEvents: 'auto'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#38bdf8',
                boxShadow: '0 0 10px #38bdf8'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#e2e8f0',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              Interactive 3D Web Experiences · Maaz Ali
            </span>
          </div>

          {/* Large Bold Editorial Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.75rem, 6.8vw, 5.5rem)',
              fontWeight: 850,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              textTransform: 'uppercase',
              marginBottom: '26px',
              fontFamily: 'var(--font-display)',
              pointerEvents: 'auto'
            }}
          >
            WEB EXPERIENCES<br />
            <span
              style={{
                color: '#f8fafc',
                textShadow: '0 0 50px rgba(56, 189, 248, 0.35)',
                backgroundImage: 'linear-gradient(135deg, #ffffff 25%, #38bdf8 80%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              BEYOND THE SCREEN.
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: '#cbd5e1',
              fontWeight: 400,
              lineHeight: 1.65,
              maxWidth: '620px',
              marginBottom: '38px',
              pointerEvents: 'auto'
            }}
          >
            I design and develop immersive 3D websites that transform brands, products, and businesses into interactive digital experiences.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '42px',
              pointerEvents: 'auto'
            }}
          >
            <a
              href="#projects"
              className="btn"
              style={{
                backgroundColor: '#38bdf8',
                color: '#06080c',
                fontWeight: 750,
                fontSize: '0.9375rem',
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 24px rgba(56, 189, 248, 0.45)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                letterSpacing: '-0.01em'
              }}
            >
              <span>Explore My Work</span>
              <ArrowUpRight size={17} />
            </a>

            <a
              href="#contact"
              className="btn"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                fontWeight: 650,
                fontSize: '0.9375rem',
                padding: '14px 26px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '-0.01em'
              }}
            >
              <span>Build Your 3D Website</span>
              <Sparkles size={16} color="#38bdf8" />
            </a>

            <a
              href="/Maaz_Ali_Resume.pdf"
              download="Maaz_Ali_Resume.pdf"
              className="btn"
              style={{
                backgroundColor: 'transparent',
                color: '#94a3b8',
                fontWeight: 550,
                fontSize: '0.875rem',
                padding: '12px 18px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px'
              }}
            >
              <FileDown size={15} />
              <span>Resume (PDF)</span>
            </a>
          </div>

          {/* Understated Editorial Capabilities Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#94a3b8',
              pointerEvents: 'auto'
            }}
          >
            <div>
              <span style={{ color: '#ffffff', fontWeight: 750, fontSize: '1rem', marginRight: '6px' }}>43</span>
              <span>Shipped Projects</span>
            </div>

            <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

            <div>
              <span style={{ color: '#38bdf8', fontWeight: 750, fontSize: '1rem', marginRight: '6px' }}>WebGL 3D</span>
              <span>Three.js Engine</span>
            </div>

            <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

            <div>
              <span style={{ color: '#818cf8', fontWeight: 750, fontSize: '1rem', marginRight: '6px' }}>Real-Time</span>
              <span>Spatial Parallax</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Minimalist Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: '#94a3b8',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          zIndex: 4,
          opacity: 0.85,
          textDecoration: 'none',
          pointerEvents: 'auto'
        }}
      >
        <span>Scroll to explore</span>
        <ChevronDown size={15} color="#38bdf8" />
      </a>
    </section>
  );
};
