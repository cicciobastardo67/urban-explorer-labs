import { useEffect, useRef, useState } from 'react'

const GRID_W = 28
const GRID_H = 14
const SPRING = 0.075
const DAMPING = 0.88
const PROXIMITY_RADIUS = 0.32
const DEFAULT_COLORS = ['#2855e8', '#ff6f59']

function renderTextTexture(text, styles, width, height) {
  const texture = document.createElement('canvas')
  texture.width = width
  texture.height = height
  const context = texture.getContext('2d')
  context.clearRect(0, 0, width, height)
  context.fillStyle = styles.color
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`
  context.fillText(text, width / 2, height / 2)
  return texture
}

function tintTexture(source, color) {
  const texture = document.createElement('canvas')
  texture.width = source.width
  texture.height = source.height
  const context = texture.getContext('2d')
  context.drawImage(source, 0, 0)
  context.globalCompositeOperation = 'source-in'
  context.fillStyle = color
  context.fillRect(0, 0, texture.width, texture.height)
  context.globalCompositeOperation = 'source-over'
  return texture
}

export function MeshText({
  text,
  className = '',
  colorSplit = true,
  customColors = DEFAULT_COLORS,
  force = 18,
}) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return undefined

    const cellCount = GRID_W * GRID_H
    const displacementX = new Float32Array(cellCount)
    const displacementY = new Float32Array(cellCount)
    const velocityX = new Float32Array(cellCount)
    const velocityY = new Float32Array(cellCount)
    const cursor = {
      x: 99,
      y: 99,
      previousX: 99,
      previousY: 99,
      inside: false,
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = reducedMotionQuery.matches
    let baseTexture = null
    let colorTextureA = null
    let colorTextureB = null
    let animationFrame = 0
    let cancelled = false

    const rebuildTexture = async () => {
      setIsReady(false)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const computed = window.getComputedStyle(wrapper)
      const fontSize = `${Number.parseFloat(computed.fontSize) * dpr}px`
      const styles = {
        color: computed.color,
        fontFamily: computed.fontFamily,
        fontStyle: computed.fontStyle,
        fontWeight: computed.fontWeight,
        fontSize,
      }

      try {
        await document.fonts?.load(
          `${styles.fontStyle} ${styles.fontWeight} ${fontSize} ${styles.fontFamily}`,
          text,
        )
        await document.fonts?.ready
      } catch {
        // The browser's fallback font remains usable.
      }

      if (cancelled) return
      baseTexture = renderTextTexture(text, styles, canvas.width, canvas.height)
      colorTextureA = tintTexture(baseTexture, customColors[0] || DEFAULT_COLORS[0])
      colorTextureB = tintTexture(
        baseTexture,
        customColors[1] || customColors[0] || DEFAULT_COLORS[1],
      )
      setIsReady(true)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bounds = wrapper.getBoundingClientRect()
      const width = Math.max(2, Math.round(bounds.width * dpr))
      const height = Math.max(2, Math.round(bounds.height * dpr))
      const changed = canvas.width !== width || canvas.height !== height

      if (changed) {
        canvas.width = width
        canvas.height = height
      }
      if (changed || !baseTexture) rebuildTexture()
    }

    const onPointerMove = (event) => {
      if (reducedMotion) return
      const bounds = wrapper.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1

      if (!cursor.inside) {
        cursor.previousX = x
        cursor.previousY = y
        cursor.inside = true
      }
      cursor.x = x
      cursor.y = y
    }

    const onPointerLeave = () => {
      cursor.inside = false
      cursor.x = 99
      cursor.y = 99
    }

    const onReducedMotionChange = (event) => {
      reducedMotion = event.matches
      if (reducedMotion) onPointerLeave()
    }

    wrapper.addEventListener('pointermove', onPointerMove)
    wrapper.addEventListener('pointerleave', onPointerLeave)
    reducedMotionQuery.addEventListener('change', onReducedMotionChange)

    const resizeObserver = new window.ResizeObserver(resize)
    resizeObserver.observe(wrapper)
    resize()

    const drawTextureGrid = (texture, chromaDirection, chromaStrength) => {
      const sourceCellWidth = texture.width / GRID_W
      const sourceCellHeight = texture.height / GRID_H

      for (let row = 0; row < GRID_H; row += 1) {
        for (let column = 0; column < GRID_W; column += 1) {
          const index = row * GRID_W + column
          const sourceX = column * sourceCellWidth
          const sourceY = row * sourceCellHeight
          const offsetX = displacementX[index] * canvas.width * 0.11
          const offsetY = displacementY[index] * canvas.height * 0.16
          const chromaOffset = chromaDirection * chromaStrength

          context.drawImage(
            texture,
            sourceX,
            sourceY,
            sourceCellWidth + 1,
            sourceCellHeight + 1,
            sourceX + offsetX + chromaOffset,
            sourceY + offsetY,
            sourceCellWidth + 1.2,
            sourceCellHeight + 1.2,
          )
        }
      }
    }

    const tick = () => {
      const cursorVelocityX = cursor.x - cursor.previousX
      const cursorVelocityY = cursor.y - cursor.previousY
      const cursorSpeed = Math.hypot(cursorVelocityX, cursorVelocityY)
      const safeVelocityX = cursorSpeed > 0.8 ? 0 : cursorVelocityX
      const safeVelocityY = cursorSpeed > 0.8 ? 0 : cursorVelocityY
      cursor.previousX = cursor.x
      cursor.previousY = cursor.y

      let maximumDisplacement = 0
      for (let row = 0; row < GRID_H; row += 1) {
        for (let column = 0; column < GRID_W; column += 1) {
          const index = row * GRID_W + column
          const pointX = (column / (GRID_W - 1)) * 2 - 1
          const pointY = (row / (GRID_H - 1)) * 2 - 1
          const distanceX = cursor.x - (pointX + displacementX[index])
          const distanceY = cursor.y - (pointY + displacementY[index])
          const distance = Math.hypot(distanceX, distanceY)
          const proximity = Math.max(0, 1 / (1 + distance / PROXIMITY_RADIUS) - 0.12)

          if (!reducedMotion) {
            velocityX[index] += safeVelocityX * (force / 10) * proximity * 0.42
            velocityY[index] += safeVelocityY * (force / 10) * proximity * 0.42
            if (cursor.inside) {
              velocityX[index] += distanceX * (force / 10) * proximity * 0.0024
              velocityY[index] += distanceY * (force / 10) * proximity * 0.0024
            }
          }

          velocityX[index] = (velocityX[index] - displacementX[index] * SPRING) * DAMPING
          velocityY[index] = (velocityY[index] - displacementY[index] * SPRING) * DAMPING
          displacementX[index] = Math.max(
            -0.34,
            Math.min(0.34, displacementX[index] + velocityX[index]),
          )
          displacementY[index] = Math.max(
            -0.34,
            Math.min(0.34, displacementY[index] + velocityY[index]),
          )
          maximumDisplacement = Math.max(
            maximumDisplacement,
            Math.hypot(displacementX[index], displacementY[index]),
          )
        }
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      if (baseTexture) {
        const chromaStrength = colorSplit
          ? Math.min(canvas.width * 0.018, maximumDisplacement * canvas.width * 0.08)
          : 0

        if (colorSplit && chromaStrength > 0.15 && colorTextureA && colorTextureB) {
          context.globalAlpha = 0.72
          drawTextureGrid(colorTextureA, 1, chromaStrength)
          drawTextureGrid(colorTextureB, -1, chromaStrength)
        }
        context.globalAlpha = 1
        drawTextureGrid(baseTexture, 0, 0)
      }

      animationFrame = window.requestAnimationFrame(tick)
    }
    animationFrame = window.requestAnimationFrame(tick)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      wrapper.removeEventListener('pointermove', onPointerMove)
      wrapper.removeEventListener('pointerleave', onPointerLeave)
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
    }
  }, [colorSplit, customColors, force, text])

  return (
    <span ref={wrapperRef} className={`mesh-text ${className}`.trim()}>
      <span className={`mesh-text__fallback${isReady ? ' mesh-text__fallback--hidden' : ''}`}>
        {text}
      </span>
      <canvas
        ref={canvasRef}
        className={`mesh-text__canvas${isReady ? ' mesh-text__canvas--ready' : ''}`}
        aria-hidden="true"
      />
    </span>
  )
}
