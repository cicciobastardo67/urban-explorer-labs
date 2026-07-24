import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { MeshText } from '../MeshText'
import { WeightHoverText } from '../WeightHoverText'

const meshSplitColors = ['#2855e8', '#8bcbff']

const principles = [
  {
    id: 'local-first',
    number: '01',
    title: 'Local-first',
    description: 'Data stays in-country. Systems run in your environment.',
    artwork: 'images/principles/local-first-artwork.png',
    artworkAlt: 'Local server infrastructure contained within Cambodia',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18 18-8.06 18-18S33.94 6 24 6z" />
        <path d="M24 14v10l6 6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="30" width="20" height="12" rx="2" />
      </svg>
    ),
  },
  {
    id: 'human-approved',
    number: '02',
    title: 'Human-approved',
    description: 'Important actions require human review and clear accountability.',
    artwork: 'images/principles/human-approved-artwork.png',
    artworkAlt: 'Automated system waiting for a human approval decision',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 10h20a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" />
        <path d="M14 18h20" strokeLinecap="round" />
        <path d="M14 24h14" strokeLinecap="round" />
        <path d="M14 30h10" strokeLinecap="round" />
        <circle cx="36" cy="36" r="4" />
      </svg>
    ),
  },
  {
    id: 'evidence-linked',
    number: '03',
    title: 'Evidence-linked',
    description: 'Every output links to sources, documents, and audit trails.',
    artwork: 'images/principles/evidence-linked-artwork.png',
    artworkAlt: 'Evidence-linked output connected to source documents and audit trail',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 6h20a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
        <path d="M14 14h20" strokeLinecap="round" />
        <path d="M14 20h14" strokeLinecap="round" />
        <path d="M14 26h10" strokeLinecap="round" />
        <path d="M30 30l6 6" strokeLinecap="round" />
        <path d="M36 30l-6 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'khmer-ready',
    number: '04',
    title: 'Khmer-ready',
    description: 'Built for Khmer language, local regulations, and cultural context.',
    artwork: 'images/principles/khmer-ready-artwork.png',
    artworkAlt: 'Khmer language workstation with Cambodian regulatory document',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="10" width="36" height="28" rx="3" />
        <text x="24" y="28" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-khmer)" fontSize="16" fontWeight="700" fill="currentColor">ខ្មែរ</text>
      </svg>
    ),
  },
]

function movePrincipleArtwork(event) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const rect = event.currentTarget.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5

  event.currentTarget.style.setProperty('--principle-shift-x', `${x * 8}px`)
  event.currentTarget.style.setProperty('--principle-shift-y', `${y * 5}px`)
  event.currentTarget.style.setProperty('--principle-rotate-x', `${y * -4}deg`)
  event.currentTarget.style.setProperty('--principle-rotate-y', `${x * 5.5}deg`)
}

function resetPrincipleArtwork(event) {
  event.currentTarget.style.removeProperty('--principle-shift-x')
  event.currentTarget.style.removeProperty('--principle-shift-y')
  event.currentTarget.style.removeProperty('--principle-rotate-x')
  event.currentTarget.style.removeProperty('--principle-rotate-y')
}

export function Section03() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' })

  return (
    <section
      ref={ref}
      id="approach"
      className="section section-approach"
      aria-labelledby="approach-heading"
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
        {/* Section Header */}
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
          <MeshText
            text="03"
            className="section-number section-number--mesh"
            customColors={meshSplitColors}
            force={36}
          />
          <div className="section-divider" style={{
            width: '1px',
            height: '80px',
            background: 'linear-gradient(180deg, var(--signal-blue) 0%, transparent 100%)',
            marginTop: '8px',
            flexShrink: 0,
          }} />
          <div>
            <h2
              id="approach-heading"
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
              <WeightHoverText label="Local by design. Accountable by default." />
            </h2>
          </div>
        </motion.div>

        {/* Principles Sequence */}
        <div className="principles-sequence" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}>
          {principles.map((principle, i) => (
            <motion.div
              key={principle.id}
              className="principle-row"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + i * 0.12 }}
              onPointerMove={movePrincipleArtwork}
              onPointerLeave={resetPrincipleArtwork}
              style={{
                display: 'grid',
                gridTemplateColumns: '64px minmax(230px, 0.75fr) minmax(320px, 1.25fr)',
                gap: '32px',
                alignItems: 'center',
                padding: '32px',
                borderRadius: '12px',
                background: 'var(--field-surface)',
                border: '1px solid var(--line)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
              }}
            >
              <span className="number-badge" style={{
                alignSelf: 'start',
                paddingTop: '12px',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 700,
                color: 'var(--signal-blue)',
                lineHeight: 1,
                fontFamily: 'var(--font-latin)',
              }}>
                {principle.number}
              </span>

              <figure className="principle-artwork">
                <img
                  src={`${import.meta.env.BASE_URL}${principle.artwork}`}
                  alt={principle.artworkAlt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              {/* Arrow between principles */}
              {i < principles.length - 1 && (
                <motion.div
                  style={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--signal-blue)',
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </motion.div>
              )}

              {/* Content */}
              <div className="principle-content">
                <h3 style={{
                  fontSize: 'clamp(24px, 2.8vw, 32px)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: 'var(--ink)',
                  margin: '0 0 12px',
                  fontFamily: 'var(--font-latin)',
                }}>
                  {principle.title}
                </h3>
                <p style={{
                  fontSize: 'var(--body-size)',
                  lineHeight: 'var(--body-line)',
                  color: 'var(--muted)',
                  margin: 0,
                  maxWidth: '560px',
                }}>
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
