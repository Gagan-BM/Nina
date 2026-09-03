"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

type SecretMessageProps = {
  unlocked: boolean;
  onHeartClick: () => void;
};

export function SecretMessage({ unlocked, onHeartClick }: SecretMessageProps) {
  return (
    <>
      <motion.button
        type="button"
        aria-label="Tiny secret heart"
        onClick={onHeartClick}
        className="fixed bottom-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/55 text-blush shadow-sm backdrop-blur outline-none transition hover:bg-white/80 focus-visible:ring-4 focus-visible:ring-blush/35"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <Heart className="h-4 w-4" fill="currentColor" aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {unlocked ? (
          <motion.aside
            className="fixed bottom-16 right-4 z-20 max-w-[calc(100vw-2rem)] rounded-3xl border border-white/80 bg-white/85 p-5 text-cocoa shadow-soft backdrop-blur sm:max-w-sm"
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 170, damping: 17 }}
          >
            <p className="text-sm font-black uppercase tracking-[0.16em] text-plum">🔓 Secret message unlocked</p>
            <p className="mt-3 whitespace-pre-line text-lg font-extrabold leading-relaxed">
              {"Okay, this wasn't supposed to be discovered.\n\nBut since you're here...\n\nI really, really like seeing you happy. ❤️"}
            </p>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
