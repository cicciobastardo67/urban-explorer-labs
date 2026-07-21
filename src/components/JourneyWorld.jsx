import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Box3, CatmullRomCurve3, MathUtils, RepeatWrapping, SRGBColorSpace, TextureLoader, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const routePoints = [
  new Vector3(5.9, 0.12, 25),
  new Vector3(24.8, 0.12, 19.6),
  new Vector3(18.6, 0.12, 4.4),
  new Vector3(3.4, 0.12, 1.3),
  new Vector3(13.8, 0.12, -10.7),
  new Vector3(-3.4, 0.12, -22.8),
  new Vector3(-11, 0.12, -37.9),
  new Vector3(-9.3, 0.12, -54),
];

const routeCurve = new CatmullRomCurve3(routePoints, false, "catmullrom", 0.24);

function usePreparedModel(url, targetSize) {
  const gltf = useLoader(GLTFLoader, url);
  return useMemo(() => {
    const object = gltf.scene.clone(true);
    const box = new Box3().setFromObject(object);
    const dimensions = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const largest = Math.max(dimensions.x, dimensions.y, dimensions.z) || 1;
    object.position.set(-center.x, -box.min.y, -center.z);
    object.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return { object, scale: targetSize / largest };
  }, [gltf, targetSize]);
}

function Landmark({ url, position, rotation = [0, 0, 0], size }) {
  const model = usePreparedModel(url, size);
  return (
    <group position={position} rotation={rotation}>
      <primitive object={model.object} scale={model.scale} />
    </group>
  );
}

function CameraRig({ progress }) {
  const { camera } = useThree();
  const journey = useRef(null);
  const desired = useMemo(() => new Vector3(), []);
  const lookAt = useMemo(() => new Vector3(), []);
  const vehiclePoint = useMemo(() => new Vector3(), []);
  const travelDirection = useMemo(() => new Vector3(), []);

  useEffect(() => {
    journey.current = document.querySelector(".city-journey");
    camera.setFocalLength(35);
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame(() => {
    const element = journey.current;
    if (!element) return;
    const distance = Math.max(1, element.offsetHeight - window.innerHeight);
    const raw = MathUtils.clamp((window.scrollY - element.offsetTop) / distance, 0, 1);
    progress.current = MathUtils.lerp(progress.current, raw, .055);
    const p = progress.current;
    const vehicleProgress = MathUtils.clamp(p * .84 + .06, 0, 1);
    routeCurve.getPointAt(vehicleProgress, vehiclePoint);
    routeCurve.getTangentAt(vehicleProgress, travelDirection).normalize();
    desired.copy(vehiclePoint).addScaledVector(travelDirection, 40);
    desired.x += -travelDirection.z * Math.sin(p * Math.PI * 2) * 4;
    desired.z += travelDirection.x * Math.sin(p * Math.PI * 2) * 4;
    desired.y = 30;
    routeCurve.getPointAt(MathUtils.clamp(vehicleProgress - .1, 0, 1), lookAt);
    lookAt.y = .6;
    camera.position.lerp(desired, .045);
    camera.lookAt(lookAt);
  });
  return null;
}

function Vehicle({ progress }) {
  const model = usePreparedModel("/models/route-vehicle.glb", 3.2);
  const group = useRef(null);
  const point = useMemo(() => new Vector3(), []);
  const tangent = useMemo(() => new Vector3(), []);
  useFrame(() => {
    if (!group.current) return;
    const p = MathUtils.clamp(progress.current * .84 + .06, 0, 1);
    routeCurve.getPointAt(p, point);
    routeCurve.getTangentAt(p, tangent);
    group.current.position.set(point.x, .18, point.z);
    group.current.rotation.y = Math.atan2(tangent.x, tangent.z) - Math.PI / 2;
  });
  return (
    <group ref={group}>
      <mesh position={[0, .05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.55, 1.82, 32]} />
        <meshBasicMaterial color="#ff6559" transparent opacity={.72} />
      </mesh>
      <primitive object={model.object} scale={model.scale} />
    </group>
  );
}

function World() {
  const progress = useRef(0);
  const mapTexture = useLoader(TextureLoader, "/images/phnom-penh-square-map-v3.png");
  useMemo(() => {
    mapTexture.colorSpace = SRGBColorSpace;
    mapTexture.anisotropy = 8;
    mapTexture.wrapT = RepeatWrapping;
    mapTexture.repeat.y = -1;
    mapTexture.offset.y = 1;
    mapTexture.needsUpdate = true;
  }, [mapTexture]);
  return (
    <>
      <color attach="background" args={["#dcecf7"]} />
      <fog attach="fog" args={["#dcecf7", 70, 150]} />
      <ambientLight intensity={1.3} />
      <hemisphereLight args={["#eaf7ff", "#6f8290", 1.5]} />
      <directionalLight position={[12, 24, 16]} intensity={3.2} color="#fffdf7" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[0, 8, 20]} color="#386cff" intensity={12} distance={24} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[110, 110]} />
        <meshBasicMaterial map={mapTexture} color="#ffffff" />
      </mesh>
      <mesh>
        <tubeGeometry args={[routeCurve, 180, .12, 8, false]} />
        <meshStandardMaterial color="#ff6f63" emissive="#ff5144" emissiveIntensity={1.6} roughness={.38} />
      </mesh>
      <Landmark url="/models/logo-building.glb" position={[3, .15, 31]} rotation={[0, -.18, 0]} size={7.2} />
      <Landmark url="/models/central-market.glb" position={[-5, .15, 15]} rotation={[0, .55, 0]} size={5.5} />
      <Landmark url="/models/operations-office.glb" position={[7, .15, 8]} rotation={[0, -.3, 0]} size={5.2} />
      <Landmark url="/models/pagoda.glb" position={[-8, .15, 20]} rotation={[0, .4, 0]} size={4.5} />
      <Landmark url="/models/diamond-bridge.glb" position={[16, .15, 3]} rotation={[0, -1.05, 0]} size={7.5} />
      <Vehicle progress={progress} />
      <CameraRig progress={progress} />
    </>
  );
}

export default function JourneyWorld() {
  return (
    <Canvas
      className="journey-world-canvas"
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [-4, 30, 17], fov: 54.4, near: .08, far: 170 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}><World /></Suspense>
    </Canvas>
  );
}
