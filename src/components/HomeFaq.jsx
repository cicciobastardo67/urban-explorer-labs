const questions = [
  ['Do you host our data?', 'No. Each product page states exactly where its data sits. LUYAGENT and KramOS process on your own machine. KhmerADV and Hermes Post name the external services used for specific steps.'],
  ['Are these products or custom builds?', 'Products. Four of them, each shaped around one workflow. A pilot configures one to your operation rather than inventing a new system.'],
  ['Which one do we need?', 'Telegram sales: LUYAGENT. One business producing its own content: Hermes Post. An agency managing client brands: KhmerADV. Evidence-linked document review: KramOS.'],
  ['Do they work in Khmer?', 'Yes. Khmer is a first-class output, not a final translation step. KramOS also handles English and Chinese in the same document set.'],
  ['Can approval steps be removed?', 'No. A payment, post or finding always waits for a named person.'],
  ['How long is a pilot?', 'Four weeks, scoped to one workflow. We agree what to measure before it starts.'],
]

export function HomeFaq() {
  return <section className="home-faq section-block"><div className="container">
    <p className="product-kicker">Questions</p><h2>What to know before we talk.</h2>
    <div className="home-faq__list">{questions.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
  </div></section>
}
