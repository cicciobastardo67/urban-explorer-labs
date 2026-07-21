import { Suspense, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Model({ url, rotation, targetSize }) {
  const gltf = useLoader(GLTFLoader, url);
  const prepared = useMemo(() => {
    const object = gltf.scene.clone(true);
    const bounds = new Box3().setFromObject(object);
    const dimensions = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const largest = Math.max(dimensions.x, dimensions.y, dimensions.z) || 1;

    object.position.set(-center.x, -bounds.min.y, -center.z);
    object.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return { object, scale: targetSize / largest };
  }, [gltf, targetSize]);

  return (
    <group position={[0, -targetSize * .42, 0]} rotation={rotation}>
      <primitive object={prepared.object} scale={prepared.scale} />
    </group>
  );
}

export default function HeroLandmark({ className, url, rotation = [0, 0, 0], targetSize = 3, cameraPosition = [4.8, 3.3, 7.2] }) {
  return (
    <div className={`hero-landmark ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: cameraPosition, fov: 30, near: .1, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.7} />
        <hemisphereLight args={["#f5fbff", "#8ea4b6", 1.8]} />
        <directionalLight position={[5, 8, 6]} intensity={3.4} color="#ffffff" castShadow />
        <directionalLight position={[-4, 3, 2]} intensity={1.4} color="#8db9ff" />
        <Suspense fallback={null}>
          <Model url={url} rotation={rotation} targetSize={targetSize} />
        </Suspense>
      </Canvas>
    </div>
  );
}
