import { Component, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { AnimationMixer, Color, LoopOnce } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { assetUrl } from "../utils/assetUrl.js";

const MAP_URL = assetUrl("models/phnom-penh-camera-scroll.glb");
const CAMERA_NAME = "Camera";
const BLENDER_FRAME_END = 500;
const BLENDER_FPS = 24;

function configureDraco(loader) {
  const draco = new DRACOLoader();
  draco.setDecoderPath(assetUrl("draco/"));
  draco.setDecoderConfig({ type: "wasm" });
  loader.setDRACOLoader(draco);
}

class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("Unable to render the Phnom Penh 3D map", error);
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function AnimatedMap({ reduceMotion, onReady }) {
  const gltf = useLoader(GLTFLoader, MAP_URL, configureDraco);
  const { set, size, invalidate } = useThree();
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const animatedCamera = useMemo(
    () =>
      scene.getObjectByName(CAMERA_NAME) ||
      scene.getObjectByProperty("isCamera", true) ||
      scene.getObjectByProperty("type", "PerspectiveCamera"),
    [scene],
  );
  const clip = gltf.animations[0];
  const mixer = useMemo(() => new AnimationMixer(scene), [scene]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    if (!animatedCamera || !clip) return undefined;

    const action = mixer.clipAction(clip);
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    if (animatedCamera.isPerspectiveCamera) {
      animatedCamera.near = 1;
      animatedCamera.far = 50000;
      animatedCamera.updateProjectionMatrix();
    }

    let frame = 0;
    const updateCamera = () => {
      frame = 0;
      const scrollRange = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = reduceMotion
        ? 0
        : Math.min(Math.max(window.scrollY / scrollRange, 0), 1);

      const timelineTime = progress * (BLENDER_FRAME_END / BLENDER_FPS);
      mixer.setTime(Math.min(timelineTime, clip.duration));
      scene.updateMatrixWorld(true);
      animatedCamera.updateMatrixWorld(true);
      invalidate();
    };
    const requestCameraUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateCamera);
    };

    updateCamera();
    set({ camera: animatedCamera });
    invalidate();
    window.addEventListener("scroll", requestCameraUpdate, { passive: true });
    window.addEventListener("resize", requestCameraUpdate);

    return () => {
      window.removeEventListener("scroll", requestCameraUpdate);
      window.removeEventListener("resize", requestCameraUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      action.stop();
      mixer.stopAllAction();
    };
  }, [
    animatedCamera,
    clip,
    invalidate,
    mixer,
    reduceMotion,
    scene,
    set,
  ]);

  useEffect(() => {
    if (!animatedCamera?.isPerspectiveCamera) return;
    animatedCamera.aspect = size.width / Math.max(size.height, 1);
    animatedCamera.updateProjectionMatrix();
    invalidate();
  }, [animatedCamera, invalidate, size.height, size.width]);

  return (
    <>
      <ambientLight intensity={1.05} />
      <hemisphereLight args={["#ffffff", "#7895aa", 1.2]} />
      <directionalLight
        position={[-250, 500, 300]}
        intensity={1.8}
        color="#ffffff"
      />
      <primitive object={scene} />
    </>
  );
}

export default function HeroMap3D({ reduceMotion = false }) {
  const [isMobile, setIsMobile] = useState(false);
  const [loadState, setLoadState] = useState("loading");
  const handleReady = useCallback(() => setLoadState("ready"), []);
  const handleError = useCallback(() => setLoadState("error"), []);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <div
      className={`hero-map-canvas is-${loadState}`}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <div
        className="map-load-poster"
        style={{ backgroundImage: `url(${assetUrl("images/phnom-penh-systems-map-v1.png")})` }}
      />
      {loadState !== "ready" && (
        <div className="map-load-status">
          {loadState === "error" ? "3D preview unavailable" : "Loading Phnom Penh 3D…"}
        </div>
      )}
      <MapErrorBoundary onError={handleError}>
        <Canvas
          frameloop="demand"
          dpr={isMobile ? [1, 1.15] : [1, 1.4]}
          camera={{ position: [0, 10, 20], fov: 50, near: 0.1, far: 2000 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <color attach="background" args={[new Color("#eaf5ff")]} />
          <Suspense fallback={null}>
            <AnimatedMap reduceMotion={reduceMotion} onReady={handleReady} />
          </Suspense>
        </Canvas>
      </MapErrorBoundary>
    </div>
  );
}

useLoader.preload(GLTFLoader, MAP_URL, configureDraco);
