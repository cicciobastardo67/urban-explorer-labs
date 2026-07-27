import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Section01 } from './components/Section01'
import { Section02 } from './components/Section02'
import { Section03 } from './components/Section03'
import { Section04 } from './components/Section04'
import { Footer } from './components/Footer'
import { ProductPage } from './components/ProductPage'
import { productPages } from './productData'
import { assetUrl } from './utils/assetUrl'
import { useState } from 'react'
import { useMapScroll } from './hooks/useMapScroll'
import { HomeAbout } from './components/HomeAbout'
import { HomeFaq } from './components/HomeFaq'
import { AboutPage } from './components/AboutPage'

function HomePage() {
  const reduceMotion = useMapScroll('.site-content > section')
  const [mapMode, setMapMode] = useState(() => (
    window.localStorage.getItem('urban-explorer-map-mode') === 'day' ? 'day' : 'night'
  ))

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

  return (
    <div className="app" data-reduced-motion={reduceMotion} data-map-mode={mapMode}>
      <div
        className="site-map-background"
        style={{ '--site-map-image': `url(${assetUrl(mapImage)})` }}
        aria-hidden="true"
      />
      <div className="site-map-wash" aria-hidden="true" />
      <Header mapMode={mapMode} onToggleMapMode={toggleMapMode} />
      <main className="site-content">
        <Hero mapMode={mapMode} />
        <Section01 />
        <Section02 />
        <Section03 />
        <HomeAbout />
        <HomeFaq />
        <Section04 />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const slug = window.location.pathname.split('/').filter(Boolean).at(-1)
  const product = productPages[slug]
  if (slug === 'about') return <AboutPage />
  return product ? <ProductPage product={product} /> : <HomePage />
}

export default App
