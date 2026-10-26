import React from 'react';
import { ArrowUp, Send, Heart } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, YouTubeIcon, InstagramIcon, TelegramIcon } from '../ui/Icons';
import { profile, socials } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--surface-2)',
        padding: '60px 0 32px 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            marginBottom: '40px'
          }}
        >
          {/* Brand & Summary */}
          <div style={{ maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.875rem'
                }}
              >
                M
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                {profile.name}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 450, lineHeight: 1.65 }}>
              {profile.tagline}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <a href="#about" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--duration-fast)' }}>About</a>
            <a href="#projects" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--duration-fast)' }}>43 Projects</a>
            <a href="#workflow" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--duration-fast)' }}>Agentic Simulator</a>
            <a href="#skills" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--duration-fast)' }}>3D Skills Cosmos</a>
            <a href="#apps" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--duration-fast)' }}>Play Store Apps</a>
            <a href="#experience" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--duration-fast)' }}>Experience</a>
            <a href="#contact" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--duration-fast)' }}>Contact</a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
            title="Scroll back to top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Divider & Socials */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
            &copy; {new Date().getFullYear()} Maaz Ali. Built with React &amp; Three.js.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'inline-flex' }} aria-label="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'inline-flex' }} aria-label="GitHub">
              <GitHubIcon size={18} />
            </a>
            <a href="https://www.youtube.com/@Maazali_ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'inline-flex' }} aria-label="YouTube">
              <YouTubeIcon size={18} />
            </a>
            <a href="https://www.instagram.com/maazali.ai/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'inline-flex' }} aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href="https://t.me/Maazinex" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'inline-flex' }} aria-label="Telegram">
              <TelegramIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
