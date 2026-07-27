export function HomeAbout() {
  return <section id="about" className="home-about section-block">
    <div className="container">
      <p className="product-kicker">About Urban Explorer Labs</p>
      <div className="home-about__grid">
        <div>
          <h2>Built in Phnom Penh, for the way business actually runs here.</h2>
          <p>Urban Explorer Labs builds private automation systems for Cambodian businesses. We build the systems, run them with you during a focused pilot, and hand you something that keeps working on infrastructure you control.</p>
          <p>Each system covers one real workflow, treats Khmer as a first-class language, and stops at a human decision. That is the product, not a limitation.</p>
        </div>
        <div className="home-about__points">
          <article><h3>We build, we do not resell.</h3><p>Four systems, built here and maintained here.</p></article>
          <article><h3>We scope small on purpose.</h3><p>One shop, one brand or one document family. A pilot you can finish and measure.</p></article>
          <article><h3>We tell you when the answer is no.</h3><p>Not every workflow should be automated. Saying so saves you time and money.</p></article>
        </div>
      </div>
      <a className="btn btn-secondary" href={`${import.meta.env.BASE_URL}about/`}>Read more about how we work</a>
    </div>
  </section>
}
