import { Suspense, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { assetUrl } from "../utils/assetUrl.js";

function NormalizedModel({ url, rotation = [0.18, -0.7, 0], size = 2.4 }) {
  const gltf = useLoader(GLTFLoader, url);
  const prepared = useMemo(() => {
    const object = gltf.scene.clone(true);
    const box = new Box3().setFromObject(object);
    const dimensions = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDimension = Math.max(dimensions.x, dimensions.y, dimensions.z) || 1;
    object.position.set(-center.x, -center.y, -center.z);
    object.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return { object, scale: size / maxDimension };
  }, [gltf, size]);

  return <primitive object={prepared.object} scale={prepared.scale} rotation={rotation} />;
}

export default function JourneyModel({ type = "vehicle" }) {
  const isVehicle = type === "vehicle";
  return (
    <Canvas
      className="journey-model-canvas"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: isVehicle ? [4.2, 2.8, 6.2] : [0, 1.4, 5], fov: isVehicle ? 31 : 28 }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 6, 5]} intensity={2.7} color="#ffffff" />
      <directionalLight position={[-4, 2, 1]} intensity={1.2} color="#8ebcff" />
      <Suspense fallback={null}>
        <NormalizedModel
          url={isVehicle ? assetUrl("models/route-vehicle.glb") : assetUrl("models/street-signal.glb")}
          rotation={isVehicle ? [0, 0.2, 0] : [0.08, -0.48, 0]}
          size={isVehicle ? 2.65 : 2.65}
        />
      </Suspense>
    </Canvas>
  );
}
