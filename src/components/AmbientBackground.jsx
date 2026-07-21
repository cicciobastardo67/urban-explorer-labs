import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientBackground() {
  const root = useRef(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const xTo = gsap.quickTo(node, "--pointer-x", { duration: 1.2, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "--pointer-y", { duration: 1.2, ease: "power3.out" });
    const handlePointer = (event) => {
      xTo(`${(event.clientX / window.innerWidth) * 100}%`);
      yTo(`${(event.clientY / window.innerHeight) * 100}%`);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    const drift = gsap.to(node.querySelectorAll(".ambient-orbit"), {
      rotation: (index) => (index % 2 ? -360 : 360),
      duration: (index) => 42 + index * 12,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      drift.kill();
    };
  }, []);

  return (
    <div className="ambient" ref={root} aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-glow" />
      <div className="ambient-orbit ambient-orbit-a" />
      <div className="ambient-orbit ambient-orbit-b" />
      <div className="ambient-noise" />
    </div>
  );
}
