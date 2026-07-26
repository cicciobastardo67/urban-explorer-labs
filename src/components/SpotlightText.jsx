import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

const DEFAULT_TRANSITION = {
  type: 'tween',
  duration: 0.3,
  ease: 'easeInOut',
}

export function SpotlightText({
  text,
  brightColor = '#FFFFFF',
  dimColor = '#000000',
  maskSize = 150,
  intensity = 10,
  transition = DEFAULT_TRANSITION,
  className = '',
}) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const supportsFinePointer =
    typeof window === 'undefined' ||
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const interactive = !prefersReducedMotion && supportsFinePointer

  const maskX = useMotionValue(0)
  const maskY = useMotionValue(0)
  const maskSizeValue = useMotionValue(0)
  const core = Math.max(10, Math.min(100, intensity))
  const maskImage = useMotionTemplate`radial-gradient(circle ${maskSizeValue}px at ${maskX}px ${maskY}px, black, black ${core}%, transparent 100%)`

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return undefined

    if (!interactive) {
      maskX.set(content.clientWidth / 2)
      maskY.set(content.clientHeight / 2)
      maskSizeValue.set(maskSize)
      return undefined
    }

    let sizeAnimation
    const updatePosition = (event) => {
      const rect = content.getBoundingClientRect()
      maskX.set(event.clientX - rect.left)
      maskY.set(event.clientY - rect.top)
    }
    const onEnter = (event) => {
      updatePosition(event)
      sizeAnimation?.stop()
      sizeAnimation = animate(maskSizeValue, maskSize, transition)
    }
    const onLeave = () => {
      sizeAnimation?.stop()
      sizeAnimation = animate(maskSizeValue, 0, transition)
    }

    container.addEventListener('pointermove', updatePosition)
    container.addEventListener('pointerenter', onEnter)
    container.addEventListener('pointerleave', onLeave)

    return () => {
      sizeAnimation?.stop()
      container.removeEventListener('pointermove', updatePosition)
      container.removeEventListener('pointerenter', onEnter)
      container.removeEventListener('pointerleave', onLeave)
    }
  }, [
    interactive,
    maskSize,
    maskSizeValue,
    maskX,
    maskY,
    transition,
  ])

  const layerStyle = {
    display: 'block',
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    font: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    userSelect: 'none',
  }

  return (
    <span
      ref={containerRef}
      className={`spotlight-text ${className}`.trim()}
      style={{ cursor: interactive ? 'none' : undefined }}
    >
      <span ref={contentRef} className="spotlight-text__content">
        <span aria-label={text} style={{ ...layerStyle, color: dimColor }}>
          {text}
        </span>
        <motion.span
          aria-hidden="true"
          style={{
            ...layerStyle,
            position: 'absolute',
            inset: 0,
            color: brightColor,
            pointerEvents: 'none',
            WebkitMaskImage: interactive ? maskImage : 'none',
            maskImage: interactive ? maskImage : 'none',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        >
          {text}
        </motion.span>
      </span>
    </span>
  )
}
