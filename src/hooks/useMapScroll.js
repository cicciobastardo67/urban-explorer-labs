import { useEffect, useState } from 'react'

export function useMapScroll(sectionSelector) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)
    const handleChange = (event) => setReduceMotion(event.matches)
    mediaQuery.addEventListener?.('change', handleChange)
    return () => mediaQuery.removeEventListener?.('change', handleChange)
  }, [])

  useEffect(() => {
    const app = document.querySelector('.app')
    const sections = Array.from(document.querySelectorAll(sectionSelector))
    const coarsePointer = window.matchMedia('(pointer: coarse)')
    let frame = 0

    const updateParallax = () => {
      frame = 0
      if (coarsePointer.matches || reduceMotion) {
        app?.style.setProperty('--map-scroll', '0%')
        sections.forEach((section) => {
          section.style.setProperty('--layer-parallax-x', '0px')
          section.style.setProperty('--layer-parallax-y', '0px')
        })
        return
      }

      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1)
      const cameraX = Math.sin(progress * Math.PI * 2) * 28
      const cameraY = Math.cos(progress * Math.PI * 3) * 10
      app?.style.setProperty('--map-scroll', `${progress * 100}%`)

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
    coarsePointer.addEventListener?.('change', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      coarsePointer.removeEventListener?.('change', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reduceMotion, sectionSelector])

  return reduceMotion
}
