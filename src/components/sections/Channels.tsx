import React from 'react';
import { ExternalLink, Share2 } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, YouTubeIcon, InstagramIcon, TelegramIcon, TikTokIcon } from '../ui/Icons';
import { socials } from '../../data/portfolioData';

export const Channels: React.FC = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'youtube': return <YouTubeIcon size={24} color="#ef4444" />;
      case 'instagram': return <InstagramIcon size={24} color="#ec4899" />;
      case 'telegram': return <TelegramIcon size={24} color="#06b6d4" />;
      case 'github': return <GitHubIcon size={24} color="var(--text-primary)" />;
      case 'linkedin': return <LinkedInIcon size={24} color="#0284c7" />;
      case 'tiktok': return <TikTokIcon size={24} color="var(--accent-light)" />;
      default: return <Share2 size={24} color="var(--accent-light)" />;
    }
  };

  return (
    <section id="channels" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', marginBottom: '40px' }}>
          <span className="section-eyebrow">Building in Public</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            Content &amp; Community Channels
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            I document real-world AI agent builds, automation breakdowns, and system architectures across YouTube, Instagram, and Telegram.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {socials.filter(s => s.blurb).map((channel) => (
            <a
              key={channel.label}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-glass-card)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {getIcon(channel.icon)}
                  </div>
                  <ExternalLink size={16} color="var(--text-muted)" />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {channel.label}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {channel.blurb}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-light)', fontSize: '0.8125rem', fontWeight: 600 }}>
                <span>Join Channel / Watch</span>
                <ExternalLink size={13} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
