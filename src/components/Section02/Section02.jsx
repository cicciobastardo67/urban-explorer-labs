import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { MeshText } from '../MeshText'
import { WeightHoverText } from '../WeightHoverText'

const NOTEBOOK_ARTIFACT_URL = 'https://notebooklm.google.com/notebook/9baeee1e-40d1-4452-86e4-4632f448c536/artifact/713d7434-4bf9-493f-a303-23415ded44ae?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_'

const proofs = [
  {
    id: 'proof-1',
    heading: 'Real interfaces for real work.',
    description: 'Tools your teams use every day. Clean, focused, and tailored to your workflows.',
    visual: (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '100%',
        minHeight: '320px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, var(--surface) 0%, var(--mist-deep) 100%)',
        }} />
        <div style={{ padding: '24px', position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingBottom: '16px', borderBottom: '1px solid var(--line)', marginBottom: '16px',
          }}>
            <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '14px' }}>Document Review — INV-2024-0847</span>
            <a
              href={NOTEBOOK_ARTIFACT_URL}
              target="_blank"
              rel="noreferrer"
              className="label"
              style={{ fontSize: '10px', color: 'var(--signal-blue)', textDecoration: 'none' }}
            >
                  View NotebookLM artifact ↗
            </a>
          </div>
          <div style={{ flex: 1, display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px', overflow: 'auto' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Document Content</div>
              <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ink)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
Invoice No: INV-2024-0847
Date: 2024-03-15
Vendor: Khmer Tech Solutions
Amount: $47,850.00
Items:
  - Laptop Pro 16" x5 — $18,500
  - Monitor 27" x10 — $12,000
  - Docking Station x5 — $1,350
  - Installation — $16,000
              </div>
            </div>
            <div style={{ width: '320px', background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Findings</div>
              <div style={{ borderLeft: '3px solid var(--signal-blue)', paddingLeft: '12px', flex: 1 }}>
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>✓ Amount matches PO</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Linked to PO-2024-0412</div>
                </div>
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--route-coral)', marginBottom: '4px' }}>⚠ Vendor name mismatch</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>DB: "Khmer Tech" vs Invoice: "Khmer Tech Solutions"</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--signal-blue)', marginBottom: '4px' }}>ℹ Tax ID verified</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>GDT registration active</div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px', fontSize: '12px' }}>
                Approve & Forward
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'proof-2',
    heading: 'Private infrastructure you control.',
    description: 'Deployed in your environment. Your data stays local. Your policies stay in place.',
    visual: (
      <div style={{
        background: 'var(--ink)',
        border: '1px solid var(--line)',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '100%',
        minHeight: '320px',
        position: 'relative',
        color: 'var(--white)',
      }}>
        <div style={{ padding: '24px', position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px',
          }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>UE-CORE Server — Phnom Penh DC</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} /> Active
            </span>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--signal-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>System Status</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>CPU</span><span style={{ color: '#4ade80' }}>12% / 64 cores</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Memory</span><span style={{ color: '#4ade80' }}>28 GB / 128 GB</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Storage</span><span style={{ color: '#4ade80' }}>1.2 TB / 8 TB</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>GPU</span><span style={{ color: '#4ade80' }}>RTX 4090 × 4 — 24%</span>
                </div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--signal-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Data Locality</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Primary</span><span style={{ color: 'var(--white)' }}>Phnom Penh DC</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Backup</span><span style={{ color: 'var(--white)' }}>Siem Reap DC</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Cloud Sync</span><span style={{ color: 'var(--route-coral)' }}>Disabled (Policy)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Encryption</span><span style={{ color: '#4ade80' }}>AES-256 at rest</span>
                </div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--signal-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Network</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Ingress</span><span style={{ color: 'var(--white)' }}>42 Mbps</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Egress</span><span style={{ color: 'var(--white)' }}>18 Mbps</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Latency (local)</span><span style={{ color: '#4ade80' }}>{'< 2ms'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>WAN</span><span style={{ color: 'var(--route-coral)' }}>Blocked</span>
                </div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--signal-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Services</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>LLM Inference</span><span style={{ color: '#4ade80' }}>Running</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Vector DB</span><span style={{ color: '#4ade80' }}>Running</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Document Parser</span><span style={{ color: '#4ade80' }}>Running</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Media Pipeline</span><span style={{ color: '#4ade80' }}>Running</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'proof-3',
    heading: 'Integrated into your ecosystem.',
    description: 'Connect with your systems, data, and tools—without giving up control.',
    visual: (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '100%',
        minHeight: '320px',
        position: 'relative',
      }}>
        <div style={{ padding: '24px', position: 'relative', zIndex: 1, height: '100%' }}>
          <svg width="100%" height="100%" viewBox="0 0 600 320" style={{ display: 'block' }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--signal-blue)" opacity="0.6" />
              </marker>
            </defs>
            {/* External Systems */}
            <g fontFamily="var(--font-latin)">
              {/* ERP */}
              <rect x="20" y="40" width="140" height="80" rx="8" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1" />
              <text x="90" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)">ERP</text>
              <text x="90" y="95" textAnchor="middle" fontSize="11" fill="var(--muted)">SAP / Odoo</text>
              <circle cx="90" cy="135" r="30" fill="var(--ink)" />
              <text x="90" y="139" textAnchor="middle" fontSize="11" fill="var(--white)" fontWeight="600">API</text>

              {/* CRM */}
              <rect x="20" y="160" width="140" height="80" rx="8" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1" />
              <text x="90" y="190" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)">CRM</text>
              <text x="90" y="215" textAnchor="middle" fontSize="11" fill="var(--muted)">HubSpot / Custom</text>
              <circle cx="90" cy="255" r="30" fill="var(--ink)" />
              <text x="90" y="259" textAnchor="middle" fontSize="11" fill="var(--white)" fontWeight="600">API</text>

              {/* Urban Explorer Core */}
              <rect x="200" y="80" width="200" height="160" rx="12" fill="var(--ink)" stroke="var(--signal-blue)" strokeWidth="1.5" />
              <text x="300" y="115" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--white)">URBAN EXPLORER CORE</text>
              <text x="300" y="135" textAnchor="middle" fontSize="11" fill="var(--signal-blue)" fontWeight="600">Private • Local • Controlled</text>
              <line x1="220" y1="160" x2="380" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="300" y="195" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">Orchestration & Logic</text>
              <text x="300" y="215" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">Vector Store + RAG</text>
              <text x="300" y="235" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.7)">Policy Engine</text>

              {/* DMS */}
              <rect x="440" y="40" width="140" height="80" rx="8" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1" />
              <text x="510" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)">DMS</text>
              <text x="510" y="95" textAnchor="middle" fontSize="11" fill="var(--muted)">SharePoint / Custom</text>
              <circle cx="510" cy="135" r="30" fill="var(--ink)" />
              <text x="510" y="139" textAnchor="middle" fontSize="11" fill="var(--white)" fontWeight="600">API</text>

              {/* DATA */}
              <rect x="440" y="160" width="140" height="80" rx="8" fill="var(--canvas)" stroke="var(--line)" strokeWidth="1" />
              <text x="510" y="190" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)">DATA</text>
              <text x="510" y="215" textAnchor="middle" fontSize="11" fill="var(--muted)">PostgreSQL / ClickHouse</text>
              <circle cx="510" cy="255" r="30" fill="var(--ink)" />
              <text x="510" y="259" textAnchor="middle" fontSize="11" fill="var(--white)" fontWeight="600">API</text>

              {/* Connections from ERP/CRM to Core */}
              <path d="M160 80 C200 80, 200 160, 200 160" stroke="var(--signal-blue)" strokeWidth="1.5" fill="none" opacity="0.6" markerEnd="url(#arrowhead)" />
              <path d="M160 200 C200 200, 200 180, 200 180" stroke="var(--signal-blue)" strokeWidth="1.5" fill="none" opacity="0.6" markerEnd="url(#arrowhead)" />

              {/* Connections from Core to DMS/DATA */}
              <path d="M400 80 C440 80, 440 120, 440 120" stroke="var(--signal-blue)" strokeWidth="1.5" fill="none" opacity="0.6" markerEnd="url(#arrowhead)" />
              <path d="M400 200 C440 200, 440 200, 440 200" stroke="var(--signal-blue)" strokeWidth="1.5" fill="none" opacity="0.6" markerEnd="url(#arrowhead)" />

              {/* Signal pulses */}
              <circle cx="185" cy="100" r="4" fill="var(--signal-blue)" opacity="0.8">
                <animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="185" cy="180" r="4" fill="var(--signal-blue)" opacity="0.8">
                <animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              <circle cx="415" cy="100" r="4" fill="var(--signal-blue)" opacity="0.8">
                <animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="415" cy="180" r="4" fill="var(--signal-blue)" opacity="0.8">
                <animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
              </circle>
            </g>
          </svg>
        </div>
      </div>
    ),
  },
]

export function Section02() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' })

  return (
    <section
      ref={ref}
      id="work"
      className="section section-work"
      aria-labelledby="work-heading"
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
            marginBottom: '72px',
          }}
        >
          <MeshText
            text="02"
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
              id="work-heading"
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
              <WeightHoverText label="Built systems, not slide decks." />
            </h2>
          </div>
        </motion.div>

        {/* Proof Bands */}
        <div className="proof-bands" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {proofs.map((proof, i) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + i * 0.15 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                alignItems: 'start',
              }}
            >
              <div className="proof-copy" style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '24px',
              }}>
                <h3 style={{
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: 'var(--ink)',
                  margin: '0 0 16px',
                  fontFamily: 'var(--font-latin)',
                }}>
                  {proof.heading}
                </h3>
                <p style={{
                  fontSize: 'var(--body-size)',
                  lineHeight: 'var(--body-line)',
                  color: 'var(--muted)',
                  margin: 0,
                  maxWidth: '480px',
                }}>
                  {proof.description}
                </p>
              </div>
              <div className="proof-visual" style={{ minHeight: '320px' }}>
                {proof.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
