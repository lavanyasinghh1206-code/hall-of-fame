import { useCallback, useState } from "react";
import PortalTransitionContext from "./portalTransitionContext";

// Timings must match the motion transitions in PortalOverlay.jsx
const OPEN_MS = 700;
const CLOSE_MS = 650;
const PARTICLE_COUNT = 26;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 160 + Math.random() * 260;
    return {
      id: i,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      delay: Math.random() * 0.18,
      size: 3 + Math.random() * 6,
    };
  });
}

export function PortalTransitionProvider({ children }) {
  const [portal, setPortal] = useState(null); // { x, y, phase, particles }

  const play = useCallback((origin, onCovered) => {
    setPortal({
      x: origin.x,
      y: origin.y,
      phase: "opening",
      particles: generateParticles(),
    });

    window.setTimeout(() => {
      onCovered?.();
      setPortal((prev) => (prev ? { ...prev, phase: "closing" } : prev));

      window.setTimeout(() => {
        setPortal(null);
      }, CLOSE_MS);
    }, OPEN_MS);
  }, []);

  return (
    <PortalTransitionContext.Provider value={{ portal, play }}>
      {children}
    </PortalTransitionContext.Provider>
  );
}
