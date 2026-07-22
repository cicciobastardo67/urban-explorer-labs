import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { MeshText } from '../MeshText'
import { WeightHoverText } from '../WeightHoverText'
import { PaperRoll } from '../PaperRoll/PaperRoll'
import { usePaperRollState } from '../PaperRoll/usePaperRollState'

const systems = [
  {
    id: 'luyagent',
    number: '01',
    category: 'Sales Automation',
    name: 'LUYAGENT',
    description: 'Telegram sales automation that connects catalog, cart, payment review, confirmation and human handoff.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18 18-8.06 18-18S33.94 6 24 6z" />
        <path d="M24 14v10l7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'khmeradv',
    number: '02',
    category: 'Agency Media Operations',
    name: 'KhmerADV',
    description: 'Multi-brand campaign production, approval and publishing from one controlled agency workspace.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="10" width="36" height="28" rx="3" />
        <path d="M12 18h24M12 24h18M12 30h12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'hermes-post',
    number: '03',
    category: 'Small Business Content',
    name: 'Hermes Post',
    description: 'A simple idea-to-post assistant for shops, bloggers, creators and owner-led businesses.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 12h28v24H10z" /><path d="M16 19h16M16 25h10M16 31h7" strokeLinecap="round" />
        <path d="M34 31l5 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'kramos',
    number: '04',
    category: 'Compliance & Documents',
    name: 'KramOS',
    description: 'Evidence-first document compliance with deterministic checks and human approval for Cambodian operations.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 6h20a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
        <path d="M14 14h12M14 20h18M14 26h12" strokeLinecap="round" />
      </svg>
    ),
  },
]

function SystemCard({ system, index }) {
  const peel = usePaperRollState()

  return (
    <motion.article
      className={`sticker-peel-card${peel.active ? ' is-peeling' : ''}${peel.pressed ? ' is-pressed' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -9, rotateX: 3, rotateY: -5 }}
      whileTap={{ y: -3, rotateX: 5, rotateY: -8, scale: 0.985 }}
      {...peel.handlers}
    >
      <PaperRoll active={peel.active} pressed={peel.pressed} />
      <div className="sticker-peel-card__sheet">
        <div className="system-icon" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '64px', height: '64px', borderRadius: '12px',
          background: 'var(--surface)', border: '1px solid var(--line)',
          color: 'var(--signal-blue)',
        }}>
          {system.icon}
        </div>

        <div className="system-meta" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="system-category label" style={{
            fontSize: 'var(--label-size)', fontWeight: 600,
            color: 'var(--signal-blue)', letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {system.category}
          </span>
          <h3 className="system-name" style={{
            fontSize: '22px', fontWeight: 700, lineHeight: 1.2,
            color: 'var(--ink)', margin: 0,
          }}>
            {system.name}
          </h3>
        </div>

        <p className="system-description" style={{
          fontSize: 'var(--body-size)', lineHeight: 'var(--body-line)',
          color: 'var(--muted)', margin: 0, flex: 1,
        }}>
          {system.description}
        </p>

        <a href={`${import.meta.env.BASE_URL}${system.id}/`} className="btn btn-secondary system-cta" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
          Explore {system.name} →
        </a>
      </div>
    </motion.article>
  )
}

export function Section01() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' })

  return (
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
            text="01"
            className="section-number section-number--mesh"
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
          </div>
        </motion.div>

        {/* Journey Rail */}
        <motion.div
          className="journey-rail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
            marginBottom: '72px',
            position: 'relative',
          }}
        >
          {/* Rail line */}
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
            <motion.div
              key={system.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + i * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                zIndex: 1,
                position: 'relative',
                flex: 1,
              }}
            >
              <div className="rail-node" style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: i === 0 ? 'var(--signal-blue)' : 'var(--canvas)',
                border: '2px solid var(--signal-blue)',
                boxShadow: '0 0 0 4px var(--canvas)',
              }} />
              <span className="label label-small" style={{
                fontSize: 'var(--label-size)',
                fontWeight: 500,
                color: 'var(--ink)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}>
                {system.name}
              </span>
            </motion.div>
          ))}
          {/* Directional end */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '2px solid var(--signal-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '24px',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--signal-blue)" strokeWidth="2">
              <path d="M3 6l3 3-3 3" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Systems Columns */}
        <motion.div
          className="systems-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          style={{
            display: 'grid',
            gap: '32px',
          }}
        >
          {systems.map((system, i) => (
            <SystemCard key={system.id} system={system} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
