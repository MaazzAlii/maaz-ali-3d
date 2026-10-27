import React from 'react';
import { Smartphone, ExternalLink, CheckCircle } from 'lucide-react';
import { androidApps, AndroidApp } from '../../data/portfolioData';

export const AppsShowcase: React.FC = () => {
  return (
    <section id="apps" style={{ padding: 'var(--section-spacing) 0', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', marginBottom: '40px' }}>
          <span className="section-eyebrow">Google Play Store</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            Published Mobile Applications
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 450, lineHeight: 1.65 }}>
            Production-grade Flutter applications engineered, monetized, and published directly to global Android users on the Google Play Store.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '32px'
          }}
        >
          {androidApps.map((app: AndroidApp) => (
            <div
              key={app.name}
              className="liquid-card"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Preview Banner */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '220px',
                  backgroundColor: 'var(--surface-2)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {app.image ? (
                  <img
                    src={app.image}
                    alt={app.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}

                {/* Badge Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '6px'
                  }}
                >
                  <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                    <CheckCircle size={12} /> Live on Play Store
                  </span>
                </div>
              </div>

              {/* App Content */}
              <div style={{ padding: 'clamp(16px, 3vw, 24px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Smartphone size={18} color="var(--accent)" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {app.name}
                  </h3>
                </div>

                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', fontWeight: 450, lineHeight: 1.65, marginBottom: '20px', flex: 1 }}>
                  {app.description}
                </p>

                {/* Key feature tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {app.metrics?.map((m: string) => (
                    <span key={m} className="badge badge-bronze" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      {m}
                    </span>
                  ))}
                  {app.tags.map((t: string) => (
                    <span 
                      key={t} 
                      className="badge" 
                      style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 600, 
                        backgroundColor: 'var(--surface-2)', 
                        color: 'var(--text-primary)', 
                        border: '1px solid var(--border-default)' 
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Play Store Download Button */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  <a
                    href={app.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '10px 16px', fontSize: '0.875rem' }}
                  >
                    <span>View on Google Play Store</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
