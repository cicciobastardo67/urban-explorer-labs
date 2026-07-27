import { useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { assetUrl } from '../utils/assetUrl'

const systems = [
  ['LUYAGENT', 'Telegram conversations become confirmed orders. The seller approves every payment.', 'luyagent'],
  ['KhmerADV', 'Multi-brand campaign production with a structural approval gate.', 'khmeradv'],
  ['Hermes Post', "One idea becomes an approved week of posts in the owner's own voice.", 'hermes-post'],
  ['KramOS', 'Evidence-linked findings from deterministic checks, decided by a named reviewer.', 'kramos'],
]

export function AboutPage() {
  const [mapMode, setMapMode] = useState(() => window.localStorage.getItem('urban-explorer-map-mode') === 'day' ? 'day' : 'night')
  const toggle = () => setMapMode((mode) => { const next = mode === 'day' ? 'night' : 'day'; window.localStorage.setItem('urban-explorer-map-mode', next); return next })
  const map = mapMode === 'night' ? 'images/phnom-penh-scroll-map-night-v2.png' : 'images/phnom-penh-scroll-map-v2.png'
  return <div className="app about-page" data-map-mode={mapMode}>
    <div className="site-map-background" style={{ '--site-map-image': `url(${assetUrl(map)})` }} aria-hidden="true" /><div className="site-map-wash" aria-hidden="true" />
    <Header mapMode={mapMode} onToggleMapMode={toggle} />
    <main className="about-content">
      <section className="about-hero"><div className="container"><p className="product-kicker">About Urban Explorer Labs</p><h1>We build automation that knows when to stop.</h1><p>Four systems for Cambodian business. Built in Phnom Penh, running on infrastructure you control, handing every decision that matters back to a person.</p></div></section>
      <section className="section-block"><div className="container prose-grid"><h2>Why we exist</h2><div><p>Most automation assumes English first, distant infrastructure and fewer humans in the loop. Those assumptions do not fit a shop taking orders on Telegram, an agency running several client brands, or a factory that must show an auditor where a number came from.</p><p>We build differently: one real workflow per system, Khmer as a first-class output, and a structural human decision before anything important leaves.</p></div></div></section>
      <section className="section-block"><div className="container"><p className="product-kicker">How we work</p><div className="about-method-grid">{[['We scope small.','One shop, one brand or one document family.'],['We run it with you.','Four weeks on real material, watching what breaks.'],['We measure before expanding.','You see what worked, what failed and what needed a person.'],['We tell you when the answer is no.','Some workflows need a process change before automation.']].map(([h,p])=><article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div></div></section>
      <section className="section-block"><div className="container"><p className="product-kicker">What we build</p><div className="about-systems-grid">{systems.map(([n,c,s])=><a href={`${import.meta.env.BASE_URL}${s}/`} key={s}><h3>{n}</h3><p>{c}</p><span>Explore the system →</span></a>)}</div></div></section>
      <section className="section-block"><div className="container prose-grid"><h2>Where we are</h2><p>Phnom Penh, Cambodia. We build here, and we run pilots with your team. Individual team profiles will be added only when verified—not as placeholders or stock identities.</p></div></section>
      <section className="product-final-cta"><div className="container"><h2>Bring us the workflow that wastes your team's time.</h2><p>We will tell you whether we are the right answer.</p><a className="btn btn-primary" href={`${import.meta.env.BASE_URL}#contact`}>Request a conversation</a></div></section>
    </main><Footer />
  </div>
}
