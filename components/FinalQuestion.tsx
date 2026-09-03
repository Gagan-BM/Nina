"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { useState } from "react";

type FinalQuestionProps = {
  show: boolean;
  onReset: () => void;
};

export function FinalQuestion({ show, onReset }: FinalQuestionProps) {
  const [answer, setAnswer] = useState<"yes" | "maybe" | null>(null);

  const reset = () => {
    setAnswer(null);
    onReset();
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-30 grid place-items-center bg-cocoa/35 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="final-title"
        >
          <motion.section
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/80 bg-white/88 p-6 text-center shadow-soft sm:p-8"
            initial={{ y: 28, scale: 0.94, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
            {answer === "yes" ? <Celebration /> : null}

            {!answer ? (
              <>
                <p className="text-3xl font-black text-cocoa" id="final-title">
                  Okay, enough. 😌
                </p>
                <p className="mt-3 text-lg font-bold text-plum">You&apos;ve received sufficient happiness for today.</p>
                <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-plum/75">But I have one final question...</p>
                <h2 className="mt-3 text-3xl font-black text-cocoa sm:text-4xl">Did I make you smile? 🥺</h2>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <AnswerButton onClick={() => setAnswer("yes")}>YES ❤️</AnswerButton>
                  <AnswerButton onClick={() => setAnswer("maybe")}>MAYBE 😏</AnswerButton>
                </div>
              </>
            ) : null}

            {answer === "yes" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                <h2 id="final-title" className="text-4xl font-black text-cocoa">
                  Knew it. 😌❤️
                </h2>
                <p className="mt-4 text-xl font-extrabold text-plum">My work here is done.</p>
                <p className="mt-5 rounded-2xl bg-cream/80 p-4 text-lg font-bold text-cocoa">
                  Although... you can always come back whenever you need another one.
                </p>
              </motion.div>
            ) : null}

            {answer === "maybe" ? <MaybeAnswer onReset={reset} /> : null}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function AnswerButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="min-h-12 rounded-full bg-gradient-to-r from-blush to-lilac px-4 py-3 text-sm font-black text-white shadow-button outline-none focus-visible:ring-4 focus-visible:ring-blush/35"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

function MaybeAnswer({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
      <h2 id="final-title" className="text-3xl font-black text-cocoa">
        Wow. Tough audience. 😤
      </h2>
      <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-plum/75">Increasing boyfriend effort...</p>
      <div className="mt-4 h-4 overflow-hidden rounded-full bg-cream">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blush via-lilac to-mint"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.7, ease: "easeInOut" }}
        />
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        <p className="mt-5 text-2xl font-black text-cocoa">Effort increased by 200%.</p>
        <p className="mt-2 text-lg font-extrabold text-plum">Try smiling again, madam. ❤️</p>
        <motion.button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-white shadow-button outline-none focus-visible:ring-4 focus-visible:ring-blush/35"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Fine, try again 😌
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function Celebration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute text-xl"
          style={{ left: `${8 + ((index * 11) % 85)}%`, top: "-1rem" }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: 330, opacity: [0, 1, 0.2], rotate: 260 }}
          transition={{ duration: 2.2 + (index % 4) * 0.25, delay: index * 0.05, ease: "easeOut" }}
        >
          {index % 3 === 0 ? "❤️" : index % 3 === 1 ? "✦" : "♡"}
        </motion.span>
      ))}
      <Heart className="absolute left-1/2 top-5 h-8 w-8 -translate-x-1/2 text-blush" fill="currentColor" />
    </div>
  );
}
