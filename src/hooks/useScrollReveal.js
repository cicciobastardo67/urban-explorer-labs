import { useState, useEffect, useCallback, useRef } from 'react'

// Single ref version
export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const [element, setElement] = useState(null)

  const setRef = useCallback((node) => {
    setElement(node)
  }, [])

  useEffect(() => {
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [element, threshold, rootMargin, triggerOnce])

  return [setRef, isVisible]
}

// Multiple refs version - returns array of [setRef, isVisible] pairs
export function useScrollRevealMultiple(count, options = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const [states, setStates] = useState(() => Array(count).fill(false))
  const elements = useRef(Array(count).fill(null))

  const setRef = useCallback((index) => (node) => {
    elements.current[index] = node
  }, [])

  useEffect(() => {
    const observers = []

    for (let i = 0; i < count; i++) {
      const element = elements.current[i]
      if (!element) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStates(prev => {
              const next = [...prev]
              next[i] = true
              return next
            })
            if (triggerOnce) {
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setStates(prev => {
              const next = [...prev]
              next[i] = false
              return next
            })
          }
        },
        { threshold, rootMargin }
      )

      observer.observe(element)
      observers.push(observer)
    }

    return () => observers.forEach(o => o.disconnect())
  }, [count, threshold, rootMargin, triggerOnce])

  return states.map((isVisible, i) => [setRef(i), isVisible])
}
