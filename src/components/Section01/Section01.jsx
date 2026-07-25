import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { MeshText } from '../MeshText'
import { WeightHoverText } from '../WeightHoverText'

const systems = [
  {
    id: 'luyagent',
    number: '01',
    category: 'Sales Automation',
    name: 'LUYAGENT',
    description: 'Telegram sales automation that connects catalog, cart, payment review, confirmation and human handoff.',
    artwork: 'images/systems/luyagent-artwork.png',
    artworkAlt: 'LUYAGENT commerce automation connecting catalog, cart, review and human handoff',
    steps: ['Catalog', 'Cart', 'Review', 'Handoff'],
  },
  {
    id: 'khmeradv',
    number: '02',
    category: 'Agency Media Operations',
    name: 'KhmerADV',
    description: 'Multi-brand campaign production, approval and publishing from one controlled agency workspace.',
    artwork: 'images/systems/khmeradv-artwork.png',
    artworkAlt: 'KhmerADV multi-brand campaign network with production, approval and publishing',
    steps: ['Brands', 'Production', 'Approval', 'Publish'],
  },
  {
    id: 'hermes-post',
    number: '03',
    category: 'Small Business Content',
    name: 'Hermes Post',
    description: 'A simple idea-to-post assistant for shops, bloggers, creators and owner-led businesses.',
    artwork: 'images/systems/hermes-post-artwork.png',
    artworkAlt: 'Hermes Post transforming a business idea into a finished social post',
    steps: ['Idea', 'Draft', 'Review', 'Post'],
  },
  {
    id: 'kramos',
    number: '04',
    category: 'Compliance & Documents',
    name: 'KramOS',
    description: 'Evidence-first document compliance with deterministic checks and human approval for Cambodian operations.',
    artwork: 'images/systems/kramos-artwork.png',
    artworkAlt: 'KramOS evidence vault connecting documents, deterministic checks and human approval',
    steps: ['Evidence', 'Checks', 'Approval', 'Record'],
  },
]

function RailProductIcon({ system, index, isOpen, onOpen }) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.45 })
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.45 })
  const rotateY = useTransform(x, [-8, 8], [-7, 7])
  const rotateX = useTransform(y, [-6, 6], [6, -6])
  const href = `${import.meta.env.BASE_URL}${system.id}/`

  const followPointer = (event) => {
    if (
      event.pointerType === 'touch'
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5
    rawX.set(pointerX * 16)
    rawY.set(pointerY * 12)
  }

  const resetPointer = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      className="journey-product"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + index * 0.1 }}
    >
      <motion.a
        className="journey-product__link"
        href={href}
        aria-label={`Preview ${system.name}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'system-quick-view' : undefined}
        style={{ x, y, rotateX, rotateY }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.96 }}
        onPointerMove={followPointer}
        onPointerLeave={resetPointer}
        onClick={(event) => {
          event.preventDefault()
          onOpen(system)
        }}
      >
        <span className="journey-product__icon" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}${system.artwork}`} alt="" />
        </span>
      </motion.a>
      <span className="label label-small journey-product__label">{system.name}</span>
    </motion.div>
  )
}

function SystemQuickView({ system, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  const href = `${import.meta.env.BASE_URL}${system.id}/`

  return createPortal(
    <motion.div
      className="system-quick-view__backdrop"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.section
        id="system-quick-view"
        className="system-quick-view"
        role="dialog"
        aria-modal="true"
        aria-labelledby="system-quick-view-title"
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      >
        <button className="system-quick-view__close" type="button" onClick={onClose} autoFocus aria-label="Close preview">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <figure className="system-quick-view__artwork">
          <img src={`${import.meta.env.BASE_URL}${system.artwork}`} alt={system.artworkAlt} />
        </figure>

        <div className="system-quick-view__content">
          <span className="system-category">{system.category}</span>
          <h3 id="system-quick-view-title">{system.name}</h3>
          <p>{system.description}</p>
          <ol aria-label={`${system.name} workflow`}>
            {system.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <a className="btn btn-primary" href={href}>
            Explore {system.name}
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.section>
    </motion.div>,
    document.body,
  )
}

function SystemRow({ system, index }) {
  const moveArtwork = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    event.currentTarget.style.setProperty('--artwork-shift-x', `${x * 9}px`)
    event.currentTarget.style.setProperty('--artwork-shift-y', `${y * 6}px`)
    event.currentTarget.style.setProperty('--artwork-rotate-x', `${y * -4.5}deg`)
    event.currentTarget.style.setProperty('--artwork-rotate-y', `${x * 6}deg`)
  }

  const resetArtwork = (event) => {
    event.currentTarget.style.removeProperty('--artwork-shift-x')
    event.currentTarget.style.removeProperty('--artwork-shift-y')
    event.currentTarget.style.removeProperty('--artwork-rotate-x')
    event.currentTarget.style.removeProperty('--artwork-rotate-y')
  }

  return (
    <motion.article
      className="system-table-row"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -4 }}
      onPointerMove={moveArtwork}
      onPointerLeave={resetArtwork}
    >
      <div className="system-table-index" aria-hidden="true">
        {system.number}
      </div>

      <figure className="system-table-artwork">
        <img
          src={`${import.meta.env.BASE_URL}${system.artwork}`}
          alt={system.artworkAlt}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="system-table-content">
        <div className="system-table-heading">
          <span className="system-category label">{system.category}</span>
          <h3 className="system-name">{system.name}</h3>
        </div>

        <p className="system-description">{system.description}</p>

        <ol className="system-flow" aria-label={`${system.name} workflow`}>
          {system.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="system-table-action">
        <a href={`${import.meta.env.BASE_URL}${system.id}/`} className="btn btn-secondary system-cta">
          Explore {system.name}
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.article>
  )
}

export function Section01() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' })
  const [selectedSystem, setSelectedSystem] = useState(null)

  return (
    <>
      <section
        ref={ref}
        id="systems"
        className="section section-systems"
        aria-labelledby="systems-heading"
        style={{
          position: 'relative',
          padding: 'var(--section-gap) var(--gutter-desktop)',
          background: 'var(--canvas)',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
        }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '24px',
            marginBottom: '80px',
          }}
        >
          <MeshText text="01" className="section-number section-number--mesh" force={36} />
          <div className="section-divider" style={{
            width: '1px',
            height: '80px',
            background: 'linear-gradient(180deg, var(--signal-blue) 0%, transparent 100%)',
            marginTop: '8px',
            flexShrink: 0,
          }} />
          <h2
            id="systems-heading"
            className="section-heading"
            style={{
              fontSize: 'var(--section-size-desktop)',
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.05em',
              color: 'var(--ink)',
              margin: 0,
              fontFamily: 'var(--font-latin)',
            }}
          >
            <WeightHoverText label="Four systems. One accountable foundation." />
          </h2>
        </motion.div>

        <motion.div
          className="journey-rail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '72px',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--signal-blue) 20%, var(--signal-blue) 80%, transparent)',
            transform: 'translateY(-50%)',
            zIndex: 0,
          }} />
          {systems.map((system, i) => (
            <RailProductIcon
              key={system.id}
              system={system}
              index={i}
              isOpen={selectedSystem?.id === system.id}
              onOpen={setSelectedSystem}
            />
          ))}
        </motion.div>

        <motion.div
          className="systems-table"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        >
          <div className="systems-table-header" aria-hidden="true">
            <span>No.</span>
            <span>Visual workflow</span>
            <span>System &amp; function</span>
            <span>Access</span>
          </div>
          {systems.map((system, i) => (
            <SystemRow key={system.id} system={system} index={i} />
          ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedSystem && (
          <SystemQuickView system={selectedSystem} onClose={() => setSelectedSystem(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
