import { useState } from 'react'

export function usePaperRollState() {
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)

  return {
    active,
    pressed,
    handlers: {
      onMouseEnter: () => setActive(true),
      onMouseLeave: () => {
        setActive(false)
        setPressed(false)
      },
      onPointerEnter: () => setActive(true),
      onPointerLeave: () => {
        setActive(false)
        setPressed(false)
      },
      onPointerDown: () => setPressed(true),
      onPointerUp: () => setPressed(false),
      onFocusCapture: () => setActive(true),
      onBlurCapture: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(false)
      },
    },
  }
}
