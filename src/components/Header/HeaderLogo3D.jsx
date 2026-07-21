import { Suspense, useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Box3, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODEL_URL = '/models/header-logo-house.glb'

function LogoModel() {
  const gltf = useLoader(GLTFLoader, MODEL_URL)
  const prepared = useMemo(() => {
    const object = gltf.scene.clone(true)

    // The source model was authored lying on its back. Rotate it into a
    // straight front view before measuring so it can be fitted precisely.
    object.rotation.set(-Math.PI / 2, 0, Math.PI)
    object.updateMatrixWorld(true)

    const bounds = new Box3().setFromObject(object)
    const dimensions = bounds.getSize(new Vector3())
    const center = bounds.getCenter(new Vector3())
    const largest = Math.max(dimensions.x, dimensions.y, dimensions.z) || 1

    object.position.sub(center)
    object.traverse((child) => {
      if (!child.isMesh) return
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      const brandedMaterials = materials.map((material) => {
        const branded = material.clone()
        branded.color?.set('#2855e8')
        branded.emissive?.set('#112968')
        branded.emissiveIntensity = 0.16
        branded.roughness = 0.44
        branded.metalness = 0.08
        branded.needsUpdate = true
        return branded
      })
      child.material = Array.isArray(child.material) ? brandedMaterials : brandedMaterials[0]
      child.castShadow = false
      child.receiveShadow = false
    })

    return { object, scale: 2.15 / largest }
  }, [gltf])

  return <primitive object={prepared.object} scale={prepared.scale} />
}

export function HeaderLogo3D() {
  return (
    <span className="header-logo-3d" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.6], fov: 26, near: 0.1, far: 20 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.6} />
        <hemisphereLight args={['#ffffff', '#536575', 1.5]} />
        <directionalLight position={[3, 5, 6]} intensity={3.1} color="#ffffff" />
        <directionalLight position={[-4, 2, 3]} intensity={0.9} color="#9bc5ff" />
        <Suspense fallback={null}>
          <LogoModel />
        </Suspense>
      </Canvas>
    </span>
  )
}

useLoader.preload(GLTFLoader, MODEL_URL)
