import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ProductDataShow } from './ProductDataShow'
import { VisualOverview } from './VisualOverview'

export function ProductPage({ product }) {
  useEffect(() => {
    document.title = `${product.name} | Urban Explorer Labs`
    window.scrollTo(0, 0)
  }, [product])

  const contactHref = `${import.meta.env.BASE_URL}#contact`

  return (
    <div className={`product-page product-${product.slug}`}>
      <Header />
      <main>
        <section className="product-hero"><div className="container product-hero-grid">
          <div><p className="product-eyebrow">{product.category}</p><h1>{product.title}</h1><p className="product-intro">{product.intro}</p>
            <div className="product-actions"><a className="btn btn-primary" href={contactHref}>{product.primaryCta}</a><a className="btn btn-secondary" href="#data-show">{product.secondaryCta}</a></div>
          </div>
          <aside className="product-proof-card"><span>Built for</span><strong>{product.audience}</strong><ul>{product.proof.map((item) => <li key={item}>{item}</li>)}</ul></aside>
        </div></section>

        <section className="product-section product-problem"><div className="container product-two-column"><h2>{product.problemTitle}</h2><ul>{product.problems.map((item) => <li key={item}>{item}</li>)}</ul></div></section>

        <section className="product-section"><div className="container"><p className="product-kicker">Operational outcomes</p><div className="product-card-grid">
          {product.outcomes.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div></div></section>

        <section id="workflow" className="product-section product-workflow"><div className="container"><p className="product-kicker">How the workflow moves</p><h2>One controlled path from input to approved action.</h2><ol>
          {product.workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}
        </ol></div></section>

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
