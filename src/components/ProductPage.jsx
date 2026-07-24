import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ProductDataShow } from './ProductDataShow'
import { VisualOverview } from './VisualOverview'
import { assetUrl } from '../utils/assetUrl'

function moveArtwork(event) {
  const bounds = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
  event.currentTarget.style.setProperty('--artwork-x', x.toFixed(3))
  event.currentTarget.style.setProperty('--artwork-y', y.toFixed(3))
}

function resetArtwork(event) {
  event.currentTarget.style.setProperty('--artwork-x', 0)
  event.currentTarget.style.setProperty('--artwork-y', 0)
}

export function ProductPage({ product }) {
  const [mapMode, setMapMode] = useState(() => (
    window.localStorage.getItem('urban-explorer-map-mode') === 'day' ? 'day' : 'night'
  ))

  useEffect(() => {
    document.title = `${product.name} | Urban Explorer Labs`
    window.scrollTo(0, 0)
  }, [product])

  const toggleMapMode = () => {
    setMapMode((currentMode) => {
      const nextMode = currentMode === 'day' ? 'night' : 'day'
      window.localStorage.setItem('urban-explorer-map-mode', nextMode)
      return nextMode
    })
  }

  const mapImage = mapMode === 'night'
    ? 'images/phnom-penh-scroll-map-night-v2.png'
    : 'images/phnom-penh-scroll-map-v2.png'

  const contactHref = `${import.meta.env.BASE_URL}#contact`

  return (
    <div className={`app product-page product-${product.slug}`} data-map-mode={mapMode}>
      <div
        className="site-map-background"
        style={{ '--site-map-image': `url(${assetUrl(mapImage)})` }}
        aria-hidden="true"
      />
      <div className="site-map-wash" aria-hidden="true" />
      <Header mapMode={mapMode} onToggleMapMode={toggleMapMode} />
      <main>
        <section className="product-hero"><div className="container product-hero-grid">
          <div><p className="product-eyebrow">{product.category}</p><h1>{product.title}</h1><p className="product-intro">{product.intro}</p>
            <div className="product-actions"><a className="btn btn-primary" href={contactHref}>{product.primaryCta}</a><a className="btn btn-secondary" href="#data-show">{product.secondaryCta}</a></div>
          </div>
          <aside className="product-proof-card"><span>Built for</span><strong>{product.audience}</strong><ul>{product.proof.map((item) => <li key={item}>{item}</li>)}</ul></aside>
        </div></section>

        <section className="product-section product-problem">
          <div className={`container ${product.visuals?.problem ? 'product-problem-grid' : 'product-two-column'}`}>
            <div>
              <h2>{product.problemTitle}</h2>
              <ul>{product.problems.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            {product.visuals?.problem && (
              <figure className="product-artwork product-problem-artwork" onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
                <img src={assetUrl(product.visuals.problem)} alt={`${product.name} routes difficult orders to human review`} />
              </figure>
            )}
          </div>
        </section>

        <section className="product-section"><div className="container"><p className="product-kicker">Operational outcomes</p><div className="product-card-grid">
          {product.outcomes.map(([title, copy], index) => <article key={title}>
            {product.visuals?.outcomes?.[index] && (
              <figure className="product-artwork product-outcome-artwork" onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
                <img src={assetUrl(product.visuals.outcomes[index])} alt="" />
              </figure>
            )}
            <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
          </article>)}
        </div></div></section>

        <section id="workflow" className="product-section product-workflow"><div className="container"><p className="product-kicker">How the workflow moves</p><h2>One controlled path from input to approved action.</h2>
          {product.visuals?.workflow && (
            <figure className="product-artwork product-workflow-artwork" onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
              <img src={assetUrl(product.visuals.workflow)} alt={`${product.name} order workflow from Telegram conversation to receipt and handoff`} />
            </figure>
          )}
          <ol>
            {product.workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}
          </ol>
        </div></section>

        <ProductDataShow initialView={product.dataView} />

        <VisualOverview compact productName={product.name} />

        <section className="product-section"><div className="container product-two-column"><div><p className="product-kicker">Capabilities</p><h2>Built around the work—not a generic dashboard.</h2></div><ul className="product-capabilities">{product.capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div></section>

        <section className="product-disclaimer product-privacy"><div className="container"><strong>Deployment boundary</strong><p>{product.privacy}</p></div></section>

        {product.disclaimer && <section className="product-disclaimer"><div className="container"><strong>Human responsibility remains essential.</strong><p>{product.disclaimer}</p></div></section>}

        <section className="product-section product-pilot"><div className="container product-two-column"><div><p className="product-kicker">Start with a focused pilot</p><h2>{product.pilot}</h2></div><div><p>{product.pilotCopy}</p><a className="btn btn-primary" href={contactHref}>Request the pilot</a></div></div></section>

        <section className="product-section product-faq"><div className="container"><p className="product-kicker">Questions</p><h2>Clear boundaries before implementation.</h2><div>{product.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

        <section className="product-final-cta"><div className="container"><p>{product.category}</p><h2>Bring us the workflow. We will map the practical next step.</h2><a className="btn btn-primary" href={contactHref}>{product.primaryCta}</a></div></section>
      </main>
      <Footer />
    </div>
  )
}
