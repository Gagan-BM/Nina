"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw, Sparkles } from "lucide-react";
import type { Prescription } from "@/data/prescriptions";

type PrescriptionCardProps = {
  prescription: Prescription | null;
  onAnother: () => void;
};

export function PrescriptionCard({ prescription, onAnother }: PrescriptionCardProps) {
  return (
    <AnimatePresence mode="wait">
      {prescription ? (
        <motion.section
          key={prescription.id}
          className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/80 bg-white/70 p-6 text-center shadow-soft backdrop-blur-md sm:p-8"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 150, damping: 18 }}
          aria-live="polite"
        >
          <motion.div
            aria-hidden="true"
            className="absolute left-5 top-4 text-blush"
            initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1.4, 0.9], rotate: 15 }}
            transition={{ duration: 1.1 }}
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
          <p className="mx-auto mb-4 inline-flex rounded-full bg-petal px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-plum">
            {prescription.category} prescription
          </p>
          <p className="text-2xl font-black leading-snug text-cocoa sm:text-3xl">{prescription.message}</p>
          <motion.button
            type="button"
            onClick={onAnother}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-white shadow-button outline-none transition focus-visible:ring-4 focus-visible:ring-blush/35"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            ✨ Give me another
          </motion.button>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
