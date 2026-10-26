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
    <section id="contact" style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', marginBottom: '40px' }}>
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="display-2" style={{ marginBottom: '12px' }}>
            {contact.heading}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            {contact.body}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
          {/* Left Column: Direct Info Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Copy Card */}
            <div
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-glass-card)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-light)', marginBottom: '8px' }}>
                <Mail size={18} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  DIRECT EMAIL
                </span>
              </div>
              <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
                {profile.email}
              </p>
              <button
                onClick={handleCopyEmail}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8125rem', width: 'fit-content' }}
              >
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
              </button>
            </div>

            {/* Location & Availability Card */}
            <div
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-glass-card)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan-primary)', marginBottom: '8px' }}>
                <MapPin size={18} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  LOCATION &amp; RELOCATION
                </span>
              </div>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Rawalpindi, Pakistan
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Open to remote roles worldwide, on-site positions in Pakistan, and international relocation.
              </p>
            </div>

            {/* Quick response note */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid var(--border-glow)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Sparkles size={20} color="var(--accent-light)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Typically responding within 24 hours. Feel free to connect directly via LinkedIn or Telegram as well.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div
            className="glass-panel"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--bg-surface)'
            }}
          >
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: 'var(--emerald-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}
                >
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>
                  Message Ready!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '20px' }}>
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
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '4px' }}>
                  Send a Direct Message
                </h3>

                <div>
                  <label 
                    htmlFor="contact-name"
                    style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Henderson"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-raised)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="contact-email"
                    style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-raised)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="contact-service"
                    style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}
                  >
                    Area of Collaboration
                  </label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-raised)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="AI & LLM Systems">AI &amp; LLM Systems (LangGraph, RAG, Swarms)</option>
                    <option value="Business Automation">Business Automation (n8n, GoHighLevel, Bots)</option>
                    <option value="Full-Stack Web/Mobile">Full-Stack Web &amp; Mobile App Development</option>
                    <option value="Hiring & Engineering Role">Full-Time / Contract Engineering Role</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label 
                    htmlFor="contact-message"
                    style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}
                  >
                    Project Details &amp; Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or engineering opportunity..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-raised)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.9375rem', marginTop: '6px' }}
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
