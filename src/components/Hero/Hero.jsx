import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Globe from '../Globe'
import { SpotlightText } from '../SpotlightText'

export function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const heroRef = useRef(null)
  const [revealRef] = useScrollReveal({ threshold: 0, rootMargin: '0px 0px -50px 0px' })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <section
      ref={(el) => { heroRef.current = el; revealRef(el) }}
      id="home"
      className="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        overflow: 'hidden',
      }}
      aria-labelledby="hero-heading"
    >
      {/* Left fade gradient for text readability */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: isMobile ? '100%' : '58%',
        background: isMobile 
          ? 'linear-gradient(180deg, rgba(234,245,255,0.82) 0%, transparent 72%)'
          : 'linear-gradient(90deg, rgba(234,245,255,0.92) 0%, rgba(234,245,255,0.72) 38%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Content */}
      <div className="container hero-content" style={{
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.35fr 1fr',
        gap: '24px',
        alignItems: 'center',
        paddingTop: 'var(--header-height)',
        paddingBottom: '80px',
      }}>
        {/* Left: Copy */}
        <div className="hero-copy" style={{
          maxWidth: isMobile ? '100%' : '700px',
          paddingRight: 0,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1
              id="hero-heading"
              className="hero-headline"
              style={{
                fontSize: isMobile
                  ? 'var(--hero-size-mobile)'
                  : 'clamp(50px, 4.5vw, 64px)',
                fontWeight: 'var(--hero-weight)',
                lineHeight: 0.98,
                letterSpacing: 'var(--hero-track)',
                color: 'var(--ink)',
                marginBottom: '24px',
                fontFamily: 'var(--font-latin)',
              }}
            >
              <SpotlightText
                text={'Intelligent automation.\nBuilt for Cambodia.\nKept under your control.'}
              />
            </h1>
            <p className="body-text" style={{
              fontSize: 'clamp(18px, 1.3vw, 20px)',
              lineHeight: 1.6,
              color: 'var(--muted)',
              marginBottom: '32px',
              maxWidth: '480px',
            }}>
              Private sales, compliance, document, and media automation designed around real Cambodian business workflows.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a href="#contact" className="btn btn-primary" style={{ minWidth: '200px' }}>
                Request a private demo
              </a>
              <a href="#systems" className="btn btn-secondary" style={{ minWidth: '180px' }}>
                Explore our systems
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: interactive local globe */}
        {!isMobile && (
          <div className="hero-globe-region">
            <Globe
              initialLatitude={16}
              graticuleColor="#000000"
              dotColor="#000000"
              oceanColor="rgba(0, 0, 0, 0)"
            />
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--muted)',
          fontSize: 'var(--label-size)',
        }}
      >
        <span style={{ letterSpacing: '0.1em' }}>SCROLL</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
