import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileDown, Sparkles, Send } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { profile } from '../../data/portfolioData';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects', badge: '43' },
    { label: 'Workflows', href: '#workflow' },
    { label: '3D Skills', href: '#skills' },
    { label: 'Apps', href: '#apps' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all var(--transition-normal)',
        backgroundColor: isScrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(var(--glass-blur)) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(var(--glass-blur)) saturate(180%)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo / Brand */}
        <a 
          href="#hero" 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          aria-label="Maaz Ali Portfolio Homepage"
        >
          <div 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid var(--border-glow)',
              boxShadow: '0 0 12px var(--accent-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <img
              src={profile.photo}
              alt="Maaz Ali"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Maaz Ali
              </span>
              <span 
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }}
                title="Available for AI Engineer & Automation projects"
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              AI Engineer · 3D
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav 
          style={{ display: 'none', alignItems: 'center', gap: '4px' }} 
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                padding: '6px 14px',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.backgroundColor = 'var(--surface-2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {link.label}
              {link.badge && (
                <span 
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    backgroundColor: 'var(--accent-muted)',
                    color: 'var(--accent)',
                    border: '1px solid var(--border-glow)',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls (Resume, Theme Toggle, Hire Me) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="btn-outline"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)'
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Resume PDF Download */}
          <a
            href="/Maaz_Ali_Resume.pdf"
            download="Maaz_Ali_Resume.pdf"
            className="btn btn-secondary desktop-only-btn"
            style={{ padding: '7px 14px', fontSize: '0.8125rem' }}
            title="Download Maaz Ali Official Resume PDF"
          >
            <FileDown size={15} />
            <span>Resume</span>
          </a>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="btn btn-primary"
            style={{ padding: '7px 18px', fontSize: '0.8125rem' }}
          >
            <Send size={14} />
            <span>Hire Me</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-outline mobile-menu-btn"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              padding: 0,
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle navigation drawer"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className="liquid-card"
          style={{
            position: 'absolute',
            top: 'calc(var(--nav-height) + 8px)',
            left: '12px',
            right: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: 'var(--surface-1)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 101
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.9375rem'
              }}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="badge badge-primary">{link.badge}</span>
              )}
            </a>
          ))}

          <a
            href="/Maaz_Ali_Resume.pdf"
            download="Maaz_Ali_Resume.pdf"
            onClick={handleLinkClick}
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '6px' }}
          >
            <FileDown size={16} />
            Download Resume (PDF)
          </a>
        </div>
      )}

      {/* CSS overrides for media queries */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
