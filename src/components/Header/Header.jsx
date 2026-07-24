import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from 'framer-motion'
import { useRef } from 'react'
import { HeaderLogo3D } from './HeaderLogo3D'

export function Header({ mapMode = 'day', onToggleMapMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const headerRef = useRef(null)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 20)
    })
    return unsubscribe
  }, [scrollY])

  const home = import.meta.env.BASE_URL
  const navLinks = [
    { href: `${home}#systems`, label: 'Systems' },
    { href: `${home}#work`, label: 'Work' },
    { href: `${home}#approach`, label: 'Approach' },
    { href: `${home}#about`, label: 'About' },
  ]

  return (
    <motion.header
      ref={headerRef}
      className="header"
      style={{
        background: scrolled
          ? mapMode === 'night'
            ? 'rgba(5, 14, 29, 0.90)'
            : 'rgba(234, 245, 255, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--header-height)',
        transition: 'background var(--transition-normal), border-color var(--transition-normal), backdrop-filter var(--transition-normal)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container header-inner" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        gap: '24px',
      }}>
        {/* Brand */}
        <a href={import.meta.env.BASE_URL} className="brand" aria-label="Urban Explorer Labs home" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0,
          textDecoration: 'none',
        }}>
          <HeaderLogo3D />
          <span style={{
            fontSize: 'var(--nav-size)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: 'var(--ink)',
            fontFamily: 'var(--font-latin)',
          }}>UE Labs</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Main navigation" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: 1,
          justifyContent: 'center',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                fontSize: 'var(--nav-size)',
                fontWeight: 500,
                color: 'var(--ink)',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'color var(--transition-fast), background var(--transition-fast)',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--signal-blue)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--ink)'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="map-mode-toggle"
          aria-label={`Switch to ${mapMode === 'day' ? 'night' : 'day'} map`}
          aria-pressed={mapMode === 'night'}
          onClick={onToggleMapMode}
        >
          {mapMode === 'day' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 15.5A8 8 0 0 1 8.5 5 8 8 0 1 0 19 15.5Z" />
            </svg>
          )}
          <span>{mapMode === 'day' ? 'Night' : 'Day'}</span>
        </button>

        {/* Desktop CTA */}
        <a
          href={`${home}#contact`}
          className="btn btn-primary header-cta"
          style={{ flexShrink: 0 }}
        >
          Request a demo
        </a>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            flexShrink: 0,
            padding: '8px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid var(--line)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Mobile CTA */}
        <a
          href={`${home}#contact`}
          className="btn btn-primary header-cta-mobile"
          style={{ display: 'none', flexShrink: 0 }}
        >
          Request a demo
        </a>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            className="nav-mobile"
            aria-label="Mobile navigation"
            style={{
              position: 'fixed',
              top: 'var(--header-height)',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--canvas)',
              padding: '24px var(--gutter-mobile)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 999,
              borderTop: '1px solid var(--line)',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-mobile"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`${home}#contact`}
              className="btn btn-primary"
              style={{ marginTop: '16px', width: '100%', textAlign: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              Request a demo
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
