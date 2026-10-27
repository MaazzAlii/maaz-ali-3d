import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { contact, profile } from '../../data/portfolioData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'AI & LLM Systems',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setFormSubmitted(true);

    // Optional mailto link fallback
    const mailtoUrl = `mailto:${profile.email}?subject=Inquiry from ${encodeURIComponent(formData.name)}: ${encodeURIComponent(formData.service)}&body=${encodeURIComponent(formData.message + '\n\nSender Email: ' + formData.email)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" style={{ padding: 'var(--section-spacing) 0', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', marginBottom: '40px' }}>
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            {contact.heading}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 450, lineHeight: 1.65 }}>
            {contact.body}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '32px' }}>
          {/* Left Column: Direct Info Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Copy Card */}
            <div
              className="liquid-card"
              style={{
                padding: 'clamp(20px, 3.5vw, 28px) clamp(16px, 3vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '10px' }}>
                  <Mail size={18} />
                  <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    Direct Email
                  </span>
                </div>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.015em' }}>
                  {profile.email}
                </p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="btn btn-secondary"
                style={{ padding: '8px 18px', fontSize: '0.8125rem', width: 'fit-content' }}
              >
                {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
              </button>
            </div>

            {/* Location & Availability Card */}
            <div
              className="liquid-card"
              style={{
                padding: 'clamp(20px, 3.5vw, 28px) clamp(16px, 3vw, 24px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-bronze)', marginBottom: '10px' }}>
                <MapPin size={18} />
                <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Location &amp; Relocation
                </span>
              </div>
              <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                Rawalpindi, Pakistan
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 450, lineHeight: 1.65 }}>
                Open to remote roles worldwide, on-site positions in Pakistan, and international relocation.
              </p>
            </div>

            {/* Quick response note */}
            <div
              className="liquid-card"
              style={{
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                backgroundColor: 'var(--surface-2)'
              }}
            >
              <Sparkles size={20} color="var(--accent)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.55, margin: 0 }}>
                Typically responding within 24 hours. Feel free to connect directly via LinkedIn or Telegram as well.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div
            className="liquid-card"
            style={{
              padding: 'clamp(24px, 4vw, 36px) clamp(18px, 3.5vw, 32px)'
            }}
          >
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--success-bg)',
                    color: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}
                >
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Message Ready!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px', lineHeight: 1.6 }}>
                  Thank you, {formData.name}. Your email client was triggered to send the message. I will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 18px', fontSize: '0.8125rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '4px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  Send a Direct Message
                </h3>

                <div>
                  <label htmlFor="contact-name" className="form-label">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Henderson"
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="form-label">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="contact-service" className="form-label">
                    Area of Collaboration
                  </label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="form-select"
                  >
                    <option value="AI & LLM Systems">AI &amp; LLM Systems (LangGraph, RAG, Swarms)</option>
                    <option value="Business Automation">Business Automation (n8n, GoHighLevel, Bots)</option>
                    <option value="Full-Stack Web/Mobile">Full-Stack Web &amp; Mobile App Development</option>
                    <option value="Hiring & Engineering Role">Full-Time / Contract Engineering Role</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="form-label">
                    Project Details &amp; Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or engineering opportunity..."
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.9375rem', marginTop: '6px' }}
                >
                  <Send size={16} />
                  <span>Send Message &amp; Connect</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
