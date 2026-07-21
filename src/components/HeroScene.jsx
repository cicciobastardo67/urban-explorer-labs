import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";

const HeroLandmark = lazy(() => import("./HeroLandmark.jsx"));
const HeroMap3D = lazy(() => import("./HeroMap3D.jsx"));

const locations = [
  { name: "Wat Phnom", x: 47, y: 20 },
  { name: "Central Phnom Penh", x: 66.5, y: 43 },
  { name: "Royal Palace", x: 83, y: 42 },
  { name: "Independence Monument", x: 53, y: 51 },
  { name: "Koh Pich", x: 86, y: 79 },
];

export default function HeroScene() {
  const root = useRef(null);
  const frame = useRef(null);

  useEffect(() => {
    const node = root.current;
    const art = frame.current;
    if (!node || !art) return undefined;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(art, "x", { duration: 1.1, ease: "power3.out" });
      const yTo = gsap.quickTo(art, "y", { duration: 1.1, ease: "power3.out" });
      const rotateXTo = gsap.quickTo(art, "rotationX", { duration: 1.2, ease: "power3.out" });
      const rotateYTo = gsap.quickTo(art, "rotationY", { duration: 1.2, ease: "power3.out" });

      const move = (event) => {
        const bounds = node.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width - 0.5;
        const py = (event.clientY - bounds.top) / bounds.height - 0.5;
        xTo(px * -12);
        yTo(py * -8);
        rotateXTo(py * -0.9);
        rotateYTo(px * 1.2);
      };

      node.addEventListener("pointermove", move, { passive: true });
      const drift = gsap.to(art, { y: "+=5", duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      const nodes = gsap.fromTo(node.querySelectorAll(".map-node"), { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.55, stagger: 0.1, delay: 0.8, ease: "back.out(1.5)" });

      return () => {
        node.removeEventListener("pointermove", move);
        drift.kill();
        nodes.kill();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div className="hero-scene hero-map-scene" ref={root} aria-label="Interactive systems map of Phnom Penh">
      <div className="map-art-frame" ref={frame}>
        <img src="/images/phnom-penh-systems-map-v1.png" alt="Stylized architectural map of Phnom Penh and its river confluence" />
        <Suspense fallback={null}>
          <HeroMap3D />
        </Suspense>
        <div className="map-vignette" aria-hidden="true" />
        <Suspense fallback={null}>
          <HeroLandmark
            className="hero-landmark-logo"
            url="/models/hero-logo-house.glb"
            rotation={[-Math.PI / 2, 0, 0]}
            targetSize={2.25}
            cameraPosition={[0, 1.6, 7]}
          />
          <HeroLandmark
            className="hero-landmark-wat"
            url="/models/hero-wat-phnom-stupa.glb"
            rotation={[0, .35, 0]}
            targetSize={2.1}
            cameraPosition={[3.8, 3, 6.8]}
          />
        </Suspense>
        {locations.map((location) => (
          <button
            className="map-node"
            type="button"
            key={location.name}
            style={{ "--node-x": `${location.x}%`, "--node-y": `${location.y}%` }}
            aria-label={location.name}
          >
            <span>{location.name}</span>
          </button>
        ))}
      </div>
      <span className="scene-label">PHNOM PENH / PRIVATE SYSTEMS / 2026</span>
    </div>
  );
}
