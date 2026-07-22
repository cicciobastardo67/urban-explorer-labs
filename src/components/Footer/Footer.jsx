import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Footer() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px' })

  return (
    <footer
      ref={ref}
      className="footer"
      role="contentinfo"
      style={{
        position: 'relative',
        background: 'rgba(9, 13, 17, 0.9)',
        backdropFilter: 'blur(8px)',
        color: 'var(--white)',
        padding: '80px var(--gutter-desktop) 40px',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
      }}>
        <motion.div
          className="footer-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr repeat(3, 1fr)',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand Column */}
          <div className="footer-brand" style={{ maxWidth: '320px' }}>
            <a href={import.meta.env.BASE_URL} className="footer-brand-link" aria-label="Urban Explorer Labs home" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" style={{ flexShrink: 0 }}>
                <rect x="8" y="20" width="32" height="20" rx="2" fill="var(--white)" />
                <path d="M24 8 L16 20 L16 40 L32 40 L32 20 Z" fill="var(--white)" />
                <rect x="20" y="24" width="8" height="16" rx="1" fill="var(--footer)" />
                <circle cx="24" cy="16" r="2" fill="var(--route-coral)" />
              </svg>
              <span style={{
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'var(--white)',
                fontFamily: 'var(--font-latin)',
              }}>
                URBAN EXPLORER LABS
              </span>
            </a>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--footer-muted)',
              margin: 0,
              maxWidth: '280px',
            }}>
              Private automation systems for Cambodian enterprises.
            </p>
          </div>

          {/* Systems Column */}
          <nav className="footer-systems" aria-label="Systems">
            <h3 style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--footer-muted)',
              margin: '0 0 16px',
            }}>
              Systems
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href={`${import.meta.env.BASE_URL}luyagent/`} style={{ color: 'var(--white)', fontSize: '15px', lineHeight: 1.5, transition: 'color var(--transition-fast)' }}>LUYAGENT — Sales Automation</a></li>
              <li><a href={`${import.meta.env.BASE_URL}khmeradv/`} style={{ color: 'var(--white)', fontSize: '15px', lineHeight: 1.5, transition: 'color var(--transition-fast)' }}>KhmerADV — Media Automation</a></li>
              <li><a href={`${import.meta.env.BASE_URL}khaudit/`} style={{ color: 'var(--white)', fontSize: '15px', lineHeight: 1.5, transition: 'color var(--transition-fast)' }}>KHAudit — Compliance & Documents</a></li>
            </ul>
          </nav>

          {/* Company Column */}
          <nav className="footer-company" aria-label="Company">
            <h3 style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--footer-muted)',
              margin: '0 0 16px',
            }}>
              Company
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href={`${import.meta.env.BASE_URL}#approach`} style={{ color: 'var(--white)', fontSize: '15px', lineHeight: 1.5, transition: 'color var(--transition-fast)' }}>Approach</a></li>
              <li><a href={`${import.meta.env.BASE_URL}#work`} style={{ color: 'var(--white)', fontSize: '15px', lineHeight: 1.5, transition: 'color var(--transition-fast)' }}>Work</a></li>
              <li><a href={`${import.meta.env.BASE_URL}#about`} style={{ color: 'var(--white)', fontSize: '15px', lineHeight: 1.5, transition: 'color var(--transition-fast)' }}>About</a></li>
            </ul>
          </nav>

          {/* Contact Column */}
          <div className="footer-contact">
            <h3 style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--footer-muted)',
              margin: '0 0 16px',
            }}>
              Let's talk
            </h3>
            <address style={{ fontStyle: 'normal', color: 'var(--footer-muted)', fontSize: '15px', lineHeight: 1.7 }}>
              <a href="mailto:hello@urbanexplorerlabs.com" style={{ color: 'var(--white)', transition: 'color var(--transition-fast)' }}>
                hello@urbanexplorerlabs.com
              </a>
              <br />
              Phnom Penh, Cambodia
            </address>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="footer-divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            borderTop: '1px solid rgba(185, 195, 203, 0.2)',
            marginBottom: '32px',
          }}
        />

        {/* Copyright */}
        <motion.div
          className="footer-copyright"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '13px',
            color: 'var(--footer-muted)',
          }}
        >
          <p style={{ margin: 0 }}>
            &copy; 2026 Urban Explorer Labs. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px', fontSize: '12px' }}>
            <span>Private by design</span>
            <span>Accountable by default</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
