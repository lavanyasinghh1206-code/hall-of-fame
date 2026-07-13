import { AnimatePresence, motion } from "motion/react";
import { usePortalTransition } from "../../context/usePortalTransition";
import "./PortalOverlay.css";

export default function PortalOverlay() {
  const { portal } = usePortalTransition();
  const particles = portal?.particles ?? [];

  return (
    <AnimatePresence>
      {portal && (
        <motion.div
          className="portal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        >
          <motion.div
            className="portal-ring"
            style={{ left: portal.x, top: portal.y }}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={
              portal.phase === "opening"
                ? { scale: 30, opacity: 0 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="portal-ring portal-ring--inner"
            style={{ left: portal.x, top: portal.y }}
            initial={{ scale: 0, opacity: 0.7, rotate: 0 }}
            animate={
              portal.phase === "opening"
                ? { scale: 18, opacity: 0, rotate: 90 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="portal-glow"
            style={{ left: portal.x, top: portal.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              portal.phase === "opening"
                ? { scale: 1, opacity: 1 }
                : { scale: 1.5, opacity: 0 }
            }
            transition={{ duration: 0.55, ease: "easeOut" }}
          />

          <motion.div
            className="portal-veil"
            style={{
              "--veil-x": `${portal.x}px`,
              "--veil-y": `${portal.y}px`,
            }}
            initial={{ opacity: 0 }}
            animate={
              portal.phase === "opening" ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{
              duration: 0.45,
              delay: portal.phase === "opening" ? 0.32 : 0,
            }}
          />

          {portal.phase === "opening" &&
            particles.map((p) => (
              <motion.span
                key={p.id}
                className="portal-particle"
                style={{
                  left: portal.x,
                  top: portal.y,
                  width: p.size,
                  height: p.size,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.2 }}
                transition={{ duration: 0.75, delay: p.delay, ease: "easeOut" }}
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
