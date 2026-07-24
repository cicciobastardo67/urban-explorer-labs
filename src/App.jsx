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
import { useEffect, useState } from 'react'

function HomePage() {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [mapMode, setMapMode] = useState(() => (
    window.localStorage.getItem('urban-explorer-map-mode') === 'day' ? 'day' : 'night'
  ))

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)
    const handler = (e) => setReduceMotion(e.matches)
    mediaQuery.addEventListener?.('change', handler)
    return () => mediaQuery.removeEventListener?.('change', handler)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.site-content > section'))
    let frame = 0

    const updateParallax = () => {
      frame = 0
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = reduceMotion ? 0 : Math.min(Math.max(window.scrollY / scrollRange, 0), 1)
      const cameraX = Math.sin(progress * Math.PI * 2) * 28
      const cameraY = Math.cos(progress * Math.PI * 3) * 10
      document.querySelector('.app')?.style.setProperty('--map-scroll', `${progress * 100}%`)

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const local = Math.min(
          Math.max((rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight, -1.5),
          1.5,
        )
        const direction = index % 2 === 0 ? 1 : -1
        section.style.setProperty('--layer-parallax-x', `${cameraX + local * 18 * direction}px`)
        section.style.setProperty('--layer-parallax-y', `${cameraY + local * 8}px`)
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reduceMotion])

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
        <Section04 />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const slug = window.location.pathname.split('/').filter(Boolean).at(-1)
  const product = productPages[slug]
  return product ? <ProductPage product={product} /> : <HomePage />
}

export default App
