import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ProductDataShow } from './ProductDataShow'
import { VisualOverview } from './VisualOverview'
import { SpotlightText } from './SpotlightText'
import { assetUrl } from '../utils/assetUrl'
import { moveArtwork, resetArtwork } from '../utils/artworkMotion'
import { useMapScroll } from '../hooks/useMapScroll'
import { productComparison } from '../productData'

function ListBlock({ title, items, tone = 'default' }) {
  return <div className={`product-list-block product-list-block--${tone}`}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>
}

export function ProductPage({ product }) {
  const reduceMotion = useMapScroll('.product-content > section')
  const [mapMode, setMapMode] = useState(() => window.localStorage.getItem('urban-explorer-map-mode') === 'day' ? 'day' : 'night')

  useEffect(() => {
    document.title = `${product.name} | Urban Explorer Labs`
    window.scrollTo(0, 0)
  }, [product])

  const toggleMapMode = () => setMapMode((current) => {
    const next = current === 'day' ? 'night' : 'day'
    window.localStorage.setItem('urban-explorer-map-mode', next)
    return next
  })
  const mapImage = mapMode === 'night' ? 'images/phnom-penh-scroll-map-night-v2.png' : 'images/phnom-penh-scroll-map-v2.png'
  const contactHref = `${import.meta.env.BASE_URL}#contact`

  return <div className={`app product-page product-${product.slug}`} data-map-mode={mapMode} data-reduced-motion={reduceMotion}>
    <div className="site-map-background" style={{ '--site-map-image': `url(${assetUrl(mapImage)})` }} aria-hidden="true" />
    <div className="site-map-wash" aria-hidden="true" />
    <Header mapMode={mapMode} onToggleMapMode={toggleMapMode} />
    <main className="product-content">
      <section className="product-hero"><div className="container product-hero-grid">
        <div><p className="product-eyebrow">{product.category}</p><h1><SpotlightText text={product.title} dimColor={mapMode === 'night' ? '#dcecff' : '#06101f'} brightColor={mapMode === 'night' ? '#ffffff' : '#2855e8'} /></h1><p className="product-intro">{product.intro}</p>{product.km?.hero && <p className="product-khmer"><span lang="km">{product.km.hero}</span></p>}<div className="product-actions"><a className="btn btn-primary" href={contactHref}>{product.primaryCta}</a><a className="btn btn-secondary" href="#data-show">{product.secondaryCta}</a></div></div>
        <aside className="product-proof-card"><span>Built for</span><strong>{product.audience}</strong><ul>{product.proof.map((item) => <li key={item}>{item}</li>)}</ul></aside>
      </div></section>

      <section className="product-section product-problem"><div className={`container ${product.visuals?.problem ? 'product-problem-grid' : 'product-copy-wide'}`}><div><h2>{product.problemTitle}</h2><ul>{product.problems.map((item) => <li key={item}>{item}</li>)}</ul></div>{product.visuals?.problem && <figure className="product-artwork product-problem-artwork" onPointerMove={moveArtwork} onPointerLeave={resetArtwork}><img src={assetUrl(product.visuals.problem)} alt={`${product.name} routes sensitive work to human review`} loading="lazy" /></figure>}</div></section>

      <section className="product-section product-fit"><div className="container"><p className="product-kicker">Fit and boundaries</p><h2>Know whether this is the right system before a pilot.</h2><div className="product-fit-grid"><ListBlock title={`${product.name} fits if`} items={product.fit.forYou} tone="fit" /><ListBlock title="It is not the right fit if" items={product.fit.notForYou} tone="not-fit" /></div></div></section>

      <section className="product-section"><div className="container"><p className="product-kicker">Operational outcomes</p><div className="product-card-grid">{product.outcomes.map(([title, copy], index) => <article key={title}>{product.visuals?.outcomes?.[index] && <figure className="product-artwork product-outcome-artwork" onPointerMove={moveArtwork} onPointerLeave={resetArtwork}><img src={assetUrl(product.visuals.outcomes[index])} alt="" loading="lazy" /></figure>}<span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="product-section product-use-cases"><div className="container"><p className="product-kicker">Use cases</p><h2>Where the system earns its place.</h2><div className="product-use-case-grid">{product.useCases.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section id="workflow" className="product-section product-workflow"><div className="container"><div className="product-workflow-intro"><div><p className="product-kicker">How the workflow moves</p><h2>One controlled path from input to approved action.</h2></div>{product.visuals?.workflow && <figure className="product-artwork product-workflow-artwork" onPointerMove={moveArtwork} onPointerLeave={resetArtwork}><img src={assetUrl(product.visuals.workflow)} alt={`${product.name} controlled workflow`} loading="lazy" /></figure>}</div><ol>{product.workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol></div></section>

      <ProductDataShow initialView={product.dataView} productName={product.name} artwork={product.visuals?.showcase} artworkAlt={`${product.name} operational control surface`} />
      <VisualOverview compact productName={product.name} image={product.visuals?.portfolio || product.visuals?.workflow} />

      <section className="product-section product-boundaries"><div className="container product-two-column"><div><p className="product-kicker">What it does not do</p><h2>Boundaries are part of the product.</h2></div><ul className="product-capabilities">{product.boundaries.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
      <section className="product-section"><div className="container product-two-column"><div><p className="product-kicker">Capabilities</p><h2>Built around the work, not a generic dashboard.</h2></div><ul className="product-capabilities">{product.capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div></section>

      <section className="product-section product-requirements"><div className="container"><p className="product-kicker">Requirements</p><div className="product-requirements-grid"><div><h2>What you need to run it.</h2><p><strong>Runs on:</strong> {product.requirements.runsOn}</p></div><ListBlock title="Required" items={product.requirements.needs} />{product.requirements.optional?.length > 0 && <ListBlock title="Optional" items={product.requirements.optional} />}</div></div></section>
      {product.findingSteps && <section className="product-section"><div className="container"><p className="product-kicker">How a finding is produced</p><h2>Rules, evidence and a named decision.</h2><ol className="product-technical-steps">{product.findingSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></div></section>}

      <section className="product-disclaimer product-privacy"><div className="container"><strong>Data and deployment</strong><p>{product.dataHandling}</p>{product.km?.boundary && <p className="product-khmer"><span lang="km">{product.km.boundary}</span></p>}</div></section>
      {product.disclaimer && <section className="product-disclaimer"><div className="container"><strong>Human responsibility remains essential.</strong><p>{product.disclaimer}</p></div></section>}

      <section className="product-section product-pilot"><div className="container"><p className="product-kicker">Start with a focused pilot</p><h2>{product.pilot}</h2><p className="product-pilot-lead">{product.pilotCopy}</p><ol className="product-pilot-plan">{product.pilotPlan.map(([week, title, copy]) => <li key={week}><span>Week {week}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><a className="btn btn-primary" href={contactHref}>Request the pilot</a></div></section>

      <section className="product-roadmap" aria-label={`${product.name} roadmap`}><div className="container"><p className="product-roadmap__label">{product.roadmap.label}</p><h2>Direction, clearly separated from availability.</h2><p>{product.roadmap.note}</p><ul>{product.roadmap.items.map((item) => <li key={item}>{item}</li>)}</ul></div></section>

      <section className="product-section product-comparison"><div className="container"><p className="product-kicker">Compare the systems</p><h2>Pick the one that matches your operation.</h2><div className="product-comparison-scroll"><table><thead><tr><th>System</th><th>Who runs it</th><th>Scope</th><th>Approval</th><th>Where data sits</th></tr></thead><tbody>{productComparison.map(([name, owner, scope, approval, data, slug]) => <tr key={slug} className={slug === product.slug ? 'is-current' : ''}><th><a href={`${import.meta.env.BASE_URL}${slug}/`}>{name}</a></th><td>{owner}</td><td>{scope}</td><td>{approval}</td><td>{data}</td></tr>)}</tbody></table></div><p>Every system stops and waits for a person before it does the thing that matters.</p></div></section>

      <section className="product-section product-faq"><div className="container"><p className="product-kicker">Questions</p><h2>Clear boundaries before implementation.</h2><div>{product.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
      <section className="product-final-cta"><div className="container"><p>{product.category}</p><h2>Bring us the workflow. We will map the practical next step.</h2><a className="btn btn-primary" href={contactHref}>{product.primaryCta}</a></div></section>
    </main><Footer />
  </div>
}
