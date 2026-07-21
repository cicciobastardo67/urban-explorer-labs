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
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="10" width="36" height="28" rx="3" />
        <text x="24" y="28" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-khmer)" fontSize="16" fontWeight="700" fill="currentColor">ខ្មែរ</text>
      </svg>
    ),
  },
]

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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + i * 0.12 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '32px',
                alignItems: 'start',
                padding: '32px',
                borderRadius: '12px',
                background: 'rgba(248, 252, 255, 0.5)',
                border: '1px solid var(--line)',
                position: 'relative',
              }}
            >
              {/* Number and icon */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                position: 'relative',
                flexShrink: 0,
              }}>
                <span className="number-badge" style={{
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 700,
                  color: 'var(--signal-blue)',
                  lineHeight: 1,
                  fontFamily: 'var(--font-latin)',
                }}>
                  {principle.number}
                </span>

                {/* Ceramic object */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '16px',
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #F0F4F8 100%)',
                  border: '1px solid rgba(28, 62, 91, 0.1)',
                  boxShadow: '0 8px 32px rgba(28, 62, 91, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--signal-blue)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {principle.icon}
                  {/* Subtle signal glow */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 50%, rgba(40,85,232,0.05) 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>

              {/* Arrow between principles */}
              {i < principles.length - 1 && (
                <motion.div
                  style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
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
              <div style={{ paddingTop: '8px' }}>
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
