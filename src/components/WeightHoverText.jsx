import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'

function seededOrder(length) {
  return Array.from({ length }, (_, index) => index).sort((a, b) => {
    const aKey = Math.sin((a + 1) * 12.9898) * 43758.5453
    const bKey = Math.sin((b + 1) * 12.9898) * 43758.5453
    return (aKey - Math.floor(aKey)) - (bKey - Math.floor(bKey))
  })
}

export function WeightHoverText({
  label,
  fromWeight = 700,
  toWeight = 900,
  staggerDuration = 30,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const reduceMotion = useReducedMotion()
  const words = useMemo(() => label.split(' '), [label])
  const letterCount = label.replaceAll(' ', '').length
  const order = useMemo(() => seededOrder(letterCount), [letterCount])
  const delayByIndex = useMemo(() => {
    const delays = new Map()
    order.forEach((letterIndex, orderIndex) => {
      delays.set(letterIndex, orderIndex * staggerDuration / 1000)
    })
    return delays
  }, [order, staggerDuration])

  let letterIndex = 0

  return (
    <span
      className="weight-hover-text"
      aria-label={label}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {words.map((word, wordIndex) => (
        <span className="weight-hover-text__word" aria-hidden="true" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((letter) => {
            const currentIndex = letterIndex
            letterIndex += 1

            return (
              <motion.span
                className="weight-hover-text__letter"
                key={`${letter}-${currentIndex}`}
                initial={{
                  fontWeight: fromWeight,
                  fontVariationSettings: `'wght' ${fromWeight}`,
                }}
                animate={{
                  fontWeight: isHovered && !reduceMotion ? toWeight : fromWeight,
                  fontVariationSettings: `'wght' ${isHovered && !reduceMotion ? toWeight : fromWeight}`,
                }}
                transition={{
                  type: 'spring',
                  duration: 0.7,
                  bounce: 0.2,
                  delay: reduceMotion ? 0 : delayByIndex.get(currentIndex),
                }}
              >
                {letter}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 && <span className="weight-hover-text__space"> </span>}
        </span>
      ))}
    </span>
  )
}
