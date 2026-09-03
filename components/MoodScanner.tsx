"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScanHeart, Sparkles } from "lucide-react";

const moods = [
  { label: "37% Cute", value: 37, icon: "💗" },
  { label: "28% Sleepy", value: 28, icon: "😴" },
  { label: "21% \"Don't talk to me\"", value: 21, icon: "😤" },
  { label: "14% Secretly wants attention", value: 14, icon: "🥺" },
];

export function MoodScanner() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="w-full max-w-xl rounded-[28px] border border-white/70 bg-white/62 p-5 shadow-soft backdrop-blur-md sm:p-7"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 130, damping: 18 }}
      aria-labelledby="scanner-title"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-plum/70">Current mood detected</p>
          <h2 id="scanner-title" className="mt-1 text-2xl font-black text-cocoa sm:text-3xl">
            🧐 Analyzing...
          </h2>
        </div>
        <motion.div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-petal text-blush shadow-sm"
          animate={reduceMotion ? undefined : { rotate: [0, 4, -4, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ScanHeart className="h-6 w-6" aria-hidden="true" />
        </motion.div>
      </div>

      <div className="space-y-3">
        {moods.map((mood, index) => (
          <div key={mood.label} className="rounded-2xl bg-cream/75 p-3">
            <div className="mb-2 flex items-center justify-between gap-3 text-sm font-extrabold text-cocoa">
              <span>
                {mood.icon} {mood.label}
              </span>
              <Sparkles className="h-4 w-4 text-blush" aria-hidden="true" />
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blush via-lilac to-mint"
                initial={{ width: 0 }}
                animate={{ width: `${mood.value}%` }}
                transition={{ delay: 0.45 + index * 0.2, duration: reduceMotion ? 0 : 0.9, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <motion.p
        className="mt-5 rounded-2xl bg-white/70 px-4 py-3 text-center text-lg font-black text-cocoa"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.45, type: "spring", stiffness: 150, damping: 15 }}
      >
        Diagnosis: You need a smile. Immediately.
      </motion.p>
    </motion.section>
  );
}
