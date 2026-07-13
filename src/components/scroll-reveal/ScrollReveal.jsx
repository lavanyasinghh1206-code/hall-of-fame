import { motion } from "motion/react";
import "./ScrollReveal.css";

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 0.75;
const DELAY = 0.1;

export default function ScrollReveal({ children }) {
  return (
    <div className="scroll-reveal">
      <motion.div
        className="scroll-rod scroll-rod--top"
        initial={{ top: "50%", opacity: 0 }}
        animate={{ top: "0%", opacity: 1 }}
        transition={{ duration: DURATION, ease: EASE, delay: DELAY }}
        aria-hidden="true"
      />

      <motion.div
        className="scroll-content"
        initial={{ clipPath: "inset(50% 0% 50% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: DURATION, ease: EASE, delay: DELAY }}
      >
        {children}
      </motion.div>

      <motion.div
        className="scroll-rod scroll-rod--bottom"
        initial={{ bottom: "50%", opacity: 0 }}
        animate={{ bottom: "0%", opacity: 1 }}
        transition={{ duration: DURATION, ease: EASE, delay: DELAY }}
        aria-hidden="true"
      />
    </div>
  );
}
