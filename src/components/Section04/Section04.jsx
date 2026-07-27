import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { MeshText } from '../MeshText'
import { WeightHoverText } from '../WeightHoverText'

const needOptions = [
  { value: 'sales', label: 'Sales automation' },
  { value: 'compliance', label: 'Compliance and documents' },
  { value: 'media', label: 'Media automation' },
  { value: 'infrastructure', label: 'Private automation infrastructure' },
]

const CONTACT_EMAIL = 'dcgcc1967@gmail.com'

export function Section04() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' })
  const [formState, setFormState] = useState({
    name: '', email: '', company: '', role: '', need: '', message: ''
  })
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formRef.current?.reportValidity()) return

    const needLabel = needOptions.find((option) => option.value === formState.need)?.label || formState.need
    const subject = `Private demo request - ${formState.company || formState.name}`
    const body = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Company: ${formState.company || 'Not provided'}`,
      `Role: ${formState.role || 'Not provided'}`,
      `Area: ${needLabel}`,
      '',
      'Workflow or challenge:',
      formState.message,
    ].join('\n')

    setStatus('opening')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.setTimeout(() => setStatus('idle'), 1200)
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="section section-contact"
      aria-labelledby="contact-heading"
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'start',
      }}>
        {/* Form */}
        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ maxWidth: '520px' }}
        >
          <div className="section-header" style={{
            display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '48px',
          }}>
            <MeshText
              text="05"
              className="section-number section-number--mesh"
              colorSplit
              customColors={['#2855e8', '#8bcbff']}
              force={36}
            />
            <div>
              <h2
                id="contact-heading"
                className="section-heading contact-heading"
                aria-label="Bring us the workflow that wastes your team's time."
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
                <span className="contact-heading-line" aria-hidden="true">
                  <WeightHoverText label="Bring us the workflow that" />
                </span>
                <span className="contact-heading-line" aria-hidden="true">
                  <WeightHoverText label="wastes your team's time." />
                </span>
              </h2>
            </div>
          </div>

          <p className="body-text" style={{
            fontSize: 'var(--body-size)',
            lineHeight: 'var(--body-line)',
            color: 'var(--muted)',
            marginBottom: '40px',
            maxWidth: '400px',
          }}>
            Tell us what the workflow is, who does it today and roughly how long it takes. That is enough for a first conversation. If we think you do not need us, we will say so in the reply.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label htmlFor="name" className="label" style={{ display: 'block', marginBottom: '8px' }}>
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '8px',
                    border: '1px solid var(--line)', background: 'var(--field-surface)',
                    fontSize: 'var(--body-size)', color: 'var(--ink)',
                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--signal-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(40,85,232,0.15)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
              <div>
                <label htmlFor="email" className="label" style={{ display: 'block', marginBottom: '8px' }}>
                  Work email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '8px',
                    border: '1px solid var(--line)', background: 'var(--field-surface)',
                    fontSize: 'var(--body-size)', color: 'var(--ink)',
                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--signal-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(40,85,232,0.15)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label htmlFor="company" className="label" style={{ display: 'block', marginBottom: '8px' }}>
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '8px',
                    border: '1px solid var(--line)', background: 'var(--field-surface)',
                    fontSize: 'var(--body-size)', color: 'var(--ink)',
                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--signal-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(40,85,232,0.15)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
              <div>
                <label htmlFor="role" className="label" style={{ display: 'block', marginBottom: '8px' }}>
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formState.role}
                  onChange={handleChange}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '8px',
                    border: '1px solid var(--line)', background: 'var(--field-surface)',
                    fontSize: 'var(--body-size)', color: 'var(--ink)',
                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--signal-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(40,85,232,0.15)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="need" className="label" style={{ display: 'block', marginBottom: '8px' }}>
                What area best describes your need?
              </label>
              <select
                id="need"
                name="need"
                value={formState.need}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '8px',
                  border: '1px solid var(--line)', background: 'var(--field-surface)',
                  fontSize: 'var(--body-size)', color: 'var(--ink)',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  cursor: 'pointer',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--signal-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(40,85,232,0.15)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none' }}
              >
                <option value="">Select an area</option>
                {needOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="label" style={{ display: 'block', marginBottom: '8px' }}>
                Describe the workflow or challenge
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '8px',
                  border: '1px solid var(--line)', background: 'var(--field-surface)',
                  fontSize: 'var(--body-size)', color: 'var(--ink)',
                  fontFamily: 'inherit', resize: 'vertical',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--signal-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(40,85,232,0.15)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.boxShadow = 'none' }}
                placeholder="e.g., Our sales team spends 4 hours daily manually entering orders from PDFs into the ERP..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'opening'}
              className="btn btn-primary"
              style={{ width: 'fit-content', minWidth: '200px' }}
            >
              {status === 'opening' ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                  Opening email…
                </>
              ) : (
                'Request a private demo'
              )}
            </button>
            <p className="contact-form-note">
              We use this only to reply. We do not sell it or add you to a mailing list. This opens your email application; nothing is stored by this website. If it does not open, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </form>
        </motion.div>

        {/* Right visual - map scene */}
        <motion.div
          className="contact-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 40 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          aria-hidden="true"
          style={{ minHeight: '500px', position: 'relative' }}
        />
      </div>
    </section>
  )
}
