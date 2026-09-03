"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = ["♡", "✦", "♥", "✧", "✶", "♡", "✦", "♥", "✧", "♡", "✶", "♥"];

export function FloatingHearts() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle, index) => {
        const left = `${8 + ((index * 17) % 86)}%`;
        const delay = index * 0.7;
        const duration = 9 + (index % 5);

        return (
          <motion.span
            key={`${particle}-${index}`}
            className="absolute bottom-[-3rem] text-lg text-blush/45 sm:text-2xl"
            style={{ left }}
            initial={{ y: 0, opacity: 0, rotate: -8 }}
            animate={
              reduceMotion
                ? { opacity: 0.22 }
                : { y: "-110vh", opacity: [0, 0.45, 0], rotate: [0, 12, -10] }
            }
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {particle}
          </motion.span>
        );
      })}
    </div>
  );
}
