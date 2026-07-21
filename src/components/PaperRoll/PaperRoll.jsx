/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { BufferAttribute, BufferGeometry, DoubleSide, MathUtils } from 'three'
import { useReducedMotion } from 'framer-motion'

const SEGMENTS = 28
const SQRT_TWO = Math.sqrt(2)

function createCornerGeometry() {
  const positions = []
  const basePositions = []
  const indices = []
  const rowStarts = []

  for (let row = 0; row <= SEGMENTS; row += 1) {
    rowStarts[row] = positions.length / 3
    const u = row / SEGMENTS
    for (let column = 0; column <= SEGMENTS - row; column += 1) {
      const v = column / SEGMENTS
      const x = -1 + 2 * u + 2 * v
      const y = 1 - 2 * u
      positions.push(x, y, 0)
      basePositions.push(x, y, 0)
    }
  }

  for (let row = 0; row < SEGMENTS; row += 1) {
    const rowLength = SEGMENTS - row + 1
    for (let column = 0; column < rowLength - 1; column += 1) {
      const a = rowStarts[row] + column
      const b = rowStarts[row + 1] + column
      const c = rowStarts[row] + column + 1
      indices.push(a, b, c)
      if (column < rowLength - 2) {
        const d = rowStarts[row + 1] + column + 1
        indices.push(b, d, c)
      }
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  geometry.userData.basePositions = new Float32Array(basePositions)
  return geometry
}

function CurlingPaper({ active, pressed, reduceMotion }) {
  const meshRef = useRef(null)
  const progressRef = useRef(0)
  const { invalidate } = useThree()
  const geometry = useMemo(createCornerGeometry, [])

  useEffect(() => {
    invalidate()
  }, [active, pressed, invalidate])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((_, delta) => {
    const target = reduceMotion ? 0 : pressed ? 1 : active ? 0.78 : 0
    const next = MathUtils.damp(progressRef.current, target, 8.5, delta)
    progressRef.current = Math.abs(next - target) < 0.001 ? target : next

    const attribute = geometry.attributes.position
    const base = geometry.userData.basePositions
    const progress = progressRef.current
    const radius = 0.61
    const curlStrength = 1.34

    for (let index = 0; index < attribute.count; index += 1) {
      const offset = index * 3
      const x = base[offset]
      const y = base[offset + 1]
      const alongFold = (x - y) / SQRT_TWO
      const distanceFromFold = Math.max(0, (x + y) / SQRT_TWO)
      const angle = (distanceFromFold / radius) * curlStrength
      const rolledDistance = radius * Math.sin(angle)
      const lift = radius * (1 - Math.cos(angle))
      const normalDistance = MathUtils.lerp(distanceFromFold, rolledDistance, progress)

      attribute.setXYZ(
        index,
        (alongFold + normalDistance) / SQRT_TWO,
        (-alongFold + normalDistance) / SQRT_TWO,
        lift * progress,
      )
    }

    attribute.needsUpdate = true
    geometry.computeVertexNormals()
    if (meshRef.current) meshRef.current.rotation.z = -0.035 * progress

    if (progressRef.current !== target) invalidate()
  })

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#f8fcff"
        emissive="#dcecf7"
        emissiveIntensity={0.08}
        roughness={0.72}
        metalness={0}
        clearcoat={0.08}
        clearcoatRoughness={0.85}
        side={DoubleSide}
      />
    </mesh>
  )
}

export function PaperRoll({ active, pressed }) {
  const reduceMotion = useReducedMotion()

  return (
    <span className="paper-roll" aria-hidden="true">
      <Canvas
        orthographic
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], zoom: 1, left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 20 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.9} />
        <directionalLight position={[-2, 3, 5]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[3, -2, 3]} intensity={0.65} color="#2855e8" />
        <CurlingPaper active={active} pressed={pressed} reduceMotion={reduceMotion} />
      </Canvas>
    </span>
  )
}
