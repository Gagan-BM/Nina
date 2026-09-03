"use client";

import { HeartPulse } from "lucide-react";

type MoodBoostCounterProps = {
  count: number;
};

export function MoodBoostCounter({ count }: MoodBoostCounterProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-extrabold text-plum shadow-sm backdrop-blur">
      <HeartPulse aria-hidden="true" className="h-4 w-4 text-blush" />
      Mood boosts administered: {count}
    </div>
  );
}
