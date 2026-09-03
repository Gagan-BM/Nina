"use client";

import { motion } from "framer-motion";
import { Gift, HeartHandshake, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { FinalQuestion } from "@/components/FinalQuestion";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MoodBoostCounter } from "@/components/MoodBoostCounter";
import { MoodScanner } from "@/components/MoodScanner";
import { PrescriptionCard } from "@/components/PrescriptionCard";
import { SecretMessage } from "@/components/SecretMessage";
import { prescriptions, type Prescription } from "@/data/prescriptions";

const FINAL_THRESHOLD = 5;

export default function Home() {
  const [boostCount, setBoostCount] = useState(0);
  const [secretClicks, setSecretClicks] = useState(0);
  const [selected, setSelected] = useState<Prescription | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [showFinal, setShowFinal] = useState(false);

  const secretUnlocked = secretClicks >= 7;

  const generatePrescription = () => {
    const nextCount = boostCount + 1;
    const choices = prescriptions.filter((item) => item.id !== lastId);
    const next = choices[Math.floor(Math.random() * choices.length)];

    setSelected(next);
    setLastId(next.id);
    setBoostCount(nextCount);

    if (nextCount >= FINAL_THRESHOLD) {
      window.setTimeout(() => setShowFinal(true), 650);
    }
  };

  const resetMachine = () => {
    setBoostCount(0);
    setSelected(null);
    setLastId(null);
    setShowFinal(false);
  };

  const decorativeStars = useMemo(() => Array.from({ length: 10 }), []);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-7 sm:px-6 sm:py-10">
      <FloatingHearts />
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        {decorativeStars.map((_, index) => (
          <span
            key={index}
            className="absolute text-sm text-plum/20"
            style={{
              left: `${6 + ((index * 19) % 88)}%`,
              top: `${8 + ((index * 23) % 78)}%`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-5xl flex-col items-center justify-center gap-6">
        <header className="max-w-3xl text-center">
          <motion.div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-plum shadow-sm backdrop-blur sm:text-sm"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="h-4 w-4 text-blush" aria-hidden="true" />
            ✨ GAGAN&apos;S CERTIFIED MOOD BOOSTER™ ✨
          </motion.div>
          <motion.h1
            className="text-balance text-4xl font-black leading-tight text-cocoa sm:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            Dear Nina
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-xl text-lg font-bold text-plum sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
          >
            Because apparently your happiness needed technical support.
          </motion.p>
        </header>

        <MoodScanner />

        <div className="flex flex-col items-center gap-4">
          <motion.button
            type="button"
            onClick={generatePrescription}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blush via-[#f3a8d7] to-lilac px-7 py-4 text-base font-black text-white shadow-button outline-none transition focus-visible:ring-4 focus-visible:ring-blush/35 sm:text-lg"
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
          >
            <Gift className="h-5 w-5" aria-hidden="true" />
            🎀 Press for your prescription
          </motion.button>
          <MoodBoostCounter count={boostCount} />
        </div>

        <PrescriptionCard prescription={selected} onAnother={generatePrescription} />

        <footer className="flex items-center gap-2 pb-4 pt-2 text-center text-sm font-bold text-plum/75">
          <HeartHandshake className="h-4 w-4 text-blush" aria-hidden="true" />
          Built with suspiciously high boyfriend effort.
        </footer>
      </div>

      <SecretMessage unlocked={secretUnlocked} onHeartClick={() => setSecretClicks((count) => count + 1)} />
      <FinalQuestion show={showFinal} onReset={resetMachine} />
    </main>
  );
}
