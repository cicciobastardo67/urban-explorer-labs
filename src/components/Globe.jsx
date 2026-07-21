import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { feature } from 'topojson-client'
import landTopology from 'world-atlas/land-50m.json'
import countriesTopology from 'world-atlas/countries-50m.json'

const GLOBE_RADIUS = 1.35
const DEFAULT_INITIAL_LATITUDE = 16
const DEFAULT_INITIAL_LONGITUDE = -105
const DEFAULT_GRATICULE_COLOR = '#000000'
const DEFAULT_DOT_COLOR = '#000000'
const DEFAULT_OCEAN_COLOR = 'rgba(0, 0, 0, 0)'
const LAND_GEOMETRY = feature(landTopology, landTopology.objects.land).features[0].geometry
const CAMBODIA_GEOMETRY = feature(
  countriesTopology,
  countriesTopology.objects.countries,
).features.find((country) => country.id === '116').geometry

function parseRgba(color) {
  const match = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i,
  )

  if (!match) return { color: new THREE.Color(color), alpha: 1 }

  return {
    color: new THREE.Color(
      Number(match[1]) / 255,
      Number(match[2]) / 255,
      Number(match[3]) / 255,
    ),
    alpha: match[4] === undefined ? 1 : Number(match[4]),
  }
}

function latLngToVector3(lat, lng, radius = GLOBE_RADIUS) {
  const latitude = THREE.MathUtils.degToRad(lat)
  const longitude = THREE.MathUtils.degToRad(lng)

  return new THREE.Vector3(
    radius * Math.cos(latitude) * Math.sin(longitude),
    radius * Math.sin(latitude),
    radius * Math.cos(latitude) * Math.cos(longitude),
  )
}

function makeGrid(material) {
  const group = new THREE.Group()
  const radius = GLOBE_RADIUS * 1.004

  for (let lat = -75; lat <= 75; lat += 15) {
    const points = []
    for (let lng = -180; lng <= 180; lng += 3) {
      points.push(latLngToVector3(lat, lng, radius))
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material))
  }

  for (let lng = -165; lng < 180; lng += 15) {
    const points = []
    for (let lat = -90; lat <= 90; lat += 3) {
      points.push(latLngToVector3(lat, lng, radius))
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material))
  }

  return group
}

function ringContainsPoint(ring, lng, lat) {
  let inside = false

  for (let i = 0, previous = ring.length - 1; i < ring.length; previous = i, i += 1) {
    const [lngA, latA] = ring[i]
    const [lngB, latB] = ring[previous]
    const crossesLatitude = (latA > lat) !== (latB > lat)
    const edgeLongitude = ((lngB - lngA) * (lat - latA)) / (latB - latA) + lngA

    if (crossesLatitude && lng < edgeLongitude) inside = !inside
  }

  return inside
}

function preparePolygons(geometry) {
  const multipolygon = geometry.type === 'MultiPolygon'
    ? geometry.coordinates
    : [geometry.coordinates]

  return multipolygon.map((rings) => {
    const outer = rings[0]
    const longitudes = outer.map(([lng]) => lng)
    const latitudes = outer.map(([, lat]) => lat)

    return {
      outer,
      holes: rings.slice(1),
      minLng: Math.min(...longitudes),
      maxLng: Math.max(...longitudes),
      minLat: Math.min(...latitudes),
      maxLat: Math.max(...latitudes),
    }
  })
}

const LAND_POLYGONS = preparePolygons(LAND_GEOMETRY)
const CAMBODIA_POLYGONS = preparePolygons(CAMBODIA_GEOMETRY)

function isLand(lng, lat) {
  return containsPoint(LAND_POLYGONS, lng, lat)
}

function containsPoint(polygons, lng, lat) {
  return polygons.some((polygon) => (
    lng >= polygon.minLng
    && lng <= polygon.maxLng
    && lat >= polygon.minLat
    && lat <= polygon.maxLat
    && ringContainsPoint(polygon.outer, lng, lat)
    && !polygon.holes.some((hole) => ringContainsPoint(hole, lng, lat))
  ))
}

function isCambodia(lng, lat) {
  return containsPoint(CAMBODIA_POLYGONS, lng, lat)
}

function createDotLayer(positions, color, size = 0.014) {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const material = new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true,
    depthWrite: false,
  })

  return new THREE.Points(geometry, material)
}

// Natural Earth 1:50m land geometry is bundled locally. Sampling at a nearly
// uniform spherical interval keeps coastlines recognisable without a texture.
function makeLandDots(color) {
  const positions = []
  const latitudeStep = 1.05
  let row = 0

  for (let lat = -85; lat <= 85; lat += latitudeStep) {
    const longitudeStep = latitudeStep / Math.max(0.28, Math.cos(THREE.MathUtils.degToRad(lat)))
    const rowOffset = row % 2 === 0 ? 0 : longitudeStep * 0.5

    for (let lng = -180 + rowOffset; lng < 180; lng += longitudeStep) {
      if (!isLand(lng, lat) || isCambodia(lng, lat)) continue

      const point = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.012)
      positions.push(point.x, point.y, point.z)
    }

    row += 1
  }

  const cambodiaBlue = []
  const cambodiaRed = []
  const cambodiaWhite = []
  const cambodiaStep = 0.16

  for (let lat = 10.25, cambodiaRow = 0; lat <= 14.8; lat += cambodiaStep, cambodiaRow += 1) {
    const longitudeStep = cambodiaStep / Math.cos(THREE.MathUtils.degToRad(lat))
    const rowOffset = cambodiaRow % 2 === 0 ? 0 : longitudeStep * 0.5

    for (let lng = 102.25 + rowOffset; lng <= 107.75; lng += longitudeStep) {
      if (!isCambodia(lng, lat)) continue

      const point = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.019)
      const target = (
        lat >= 12.15 && lat <= 13.05 && lng >= 104.25 && lng <= 105.35
          ? cambodiaWhite
          : lat < 11.4 || lat > 13.65
            ? cambodiaBlue
            : cambodiaRed
      )
      target.push(point.x, point.y, point.z)
    }
  }

  const group = new THREE.Group()
  group.add(createDotLayer(positions, color))
  group.add(createDotLayer(cambodiaBlue, '#032ea1', 0.021))
  group.add(createDotLayer(cambodiaRed, '#e00025', 0.021))
  group.add(createDotLayer(cambodiaWhite, '#ffffff', 0.022))
  return group
}

export default function Globe({
  className = '',
  initialLatitude = DEFAULT_INITIAL_LATITUDE,
  initialLongitude = DEFAULT_INITIAL_LONGITUDE,
  graticuleColor = DEFAULT_GRATICULE_COLOR,
  dotColor = DEFAULT_DOT_COLOR,
  oceanColor = DEFAULT_OCEAN_COLOR,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 5.4)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-hidden', 'true')
    container.appendChild(renderer.domElement)

    const globe = new THREE.Group()
    globe.rotation.set(
      THREE.MathUtils.degToRad(initialLatitude),
      THREE.MathUtils.degToRad(initialLongitude),
      0,
    )
    scene.add(globe)

    const resolvedOcean = parseRgba(oceanColor)
    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
      new THREE.MeshBasicMaterial({
        color: resolvedOcean.color,
        transparent: resolvedOcean.alpha < 1,
        opacity: resolvedOcean.alpha,
        depthWrite: true,
      }),
    )
    globe.add(ocean)

    const gridMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(graticuleColor),
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    })
    globe.add(makeGrid(gridMaterial))
    globe.add(makeLandDots(dotColor))

    scene.add(new THREE.HemisphereLight(0xdaf1ff, 0x06131b, 2.3))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
    keyLight.position.set(-3, 4, 5)
    scene.add(keyLight)

    let width = 1
    let height = 1
    const resize = () => {
      width = Math.max(1, container.clientWidth)
      height = Math.max(1, container.clientHeight)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new window.ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isHovering = false
    let isDragging = false
    let previousX = 0
    let previousY = 0
    let velocityX = 0
    let velocityY = 0

    const onPointerDown = (event) => {
      isDragging = true
      previousX = event.clientX
      previousY = event.clientY
      renderer.domElement.setPointerCapture(event.pointerId)
      container.classList.add('is-dragging')
    }
    const onPointerMove = (event) => {
      if (!isDragging) return
      const deltaX = event.clientX - previousX
      const deltaY = event.clientY - previousY
      velocityX = deltaX * 0.005
      velocityY = deltaY * 0.0035
      globe.rotation.y += velocityX
      globe.rotation.x = THREE.MathUtils.clamp(globe.rotation.x + velocityY, -0.8, 0.8)
      previousX = event.clientX
      previousY = event.clientY
    }
    const onPointerUp = (event) => {
      isDragging = false
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId)
      }
      container.classList.remove('is-dragging')
    }
    const onPointerEnter = () => { isHovering = true }
    const onPointerLeave = () => {
      isHovering = false
      isDragging = false
      container.classList.remove('is-dragging')
    }

    const canvas = renderer.domElement
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)
    canvas.addEventListener('pointerenter', onPointerEnter)
    canvas.addEventListener('pointerleave', onPointerLeave)

    const clock = new THREE.Clock()
    let animationFrame = 0
    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.05)
      if (!reducedMotion.matches && !isDragging && !isHovering) {
        globe.rotation.y -= delta * 0.11
      }
      if (!isDragging) {
        globe.rotation.y += velocityX
        globe.rotation.x = THREE.MathUtils.clamp(globe.rotation.x + velocityY, -0.8, 0.8)
        velocityX *= 0.93
        velocityY *= 0.93
      }
      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('pointerenter', onPointerEnter)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      renderer.dispose()
      canvas.remove()
    }
  }, [dotColor, graticuleColor, initialLatitude, initialLongitude, oceanColor])

  return (
    <div
      ref={containerRef}
      className={`hero-globe ${className}`.trim()}
      role="img"
      aria-label="Interactive globe centered on Cambodia. Drag to rotate."
    />
  )
}
