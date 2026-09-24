"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookmarkCheck, Coffee, Moon, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { october2Chapters } from "@/data/october2Memory";

type MemoryExperienceProps = {
  onClose: () => void;
};

const toneClasses = {
  night: "bg-[#2a1722] text-warm-white",
  light: "bg-warm-white text-cocoa",
  green: "bg-soft-green text-cocoa",
  festival: "bg-deep-red text-warm-white",
};

export function MemoryExperience({ onClose }: MemoryExperienceProps) {
  const [started, setStarted] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [coffeeAnswer, setCoffeeAnswer] = useState<"black" | "sugar" | null>(null);
  const [saved, setSaved] = useState(false);
  const [moonClicks, setMoonClicks] = useState(0);
  const reduceMotion = useReducedMotion();

  const isFinal = chapterIndex === october2Chapters.length;
  const chapter = october2Chapters[chapterIndex];
  const goTo = (next: number) => setChapterIndex(Math.max(0, Math.min(next, october2Chapters.length)));
  const relive = () => {
    setChapterIndex(0);
    setSaved(false);
    setCoffeeAnswer(null);
    setMoonClicks(0);
  };

  if (!started) {
    return <MemoryIntro onStart={() => setStarted(true)} onClose={onClose} />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-warm-white px-4 py-4 sm:px-6 sm:py-6">
      <MemoryParticles tone={isFinal ? "night" : chapter.tone} />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between gap-3">
          <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/15 bg-white/70 px-4 text-sm font-extrabold text-cocoa shadow-sm outline-none backdrop-blur transition hover:bg-white focus-visible:ring-4 focus-visible:ring-nina-red/30">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Home
          </button>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-plum">02.10 <span className="hidden sm:inline">· The evening it all began</span></p>
          <span className="w-[78px]" aria-hidden="true" />
        </header>

        <div className="mt-5 h-1 rounded-full bg-deep-red/10" aria-label={`Chapter ${Math.min(chapterIndex + 1, october2Chapters.length)} of ${october2Chapters.length}`} role="progressbar" aria-valuemin={1} aria-valuemax={october2Chapters.length} aria-valuenow={Math.min(chapterIndex + 1, october2Chapters.length)}>
          <motion.div className="h-full rounded-full bg-nina-red" animate={{ width: `${((Math.min(chapterIndex + 1, october2Chapters.length)) / october2Chapters.length) * 100}%` }} transition={reduceMotion ? { duration: 0 } : { duration: 0.45 }} />
        </div>

        <AnimatePresence mode="wait">
          {isFinal ? (
            <FinalMemory key="final" moonClicks={moonClicks} onMoonClick={() => setMoonClicks((count) => count + 1)} onRelive={relive} onSave={() => setSaved(true)} saved={saved} />
          ) : (
            <motion.section key={chapter.id} className={`my-5 flex flex-1 flex-col justify-center overflow-hidden rounded-2xl px-6 py-10 shadow-soft sm:px-12 sm:py-14 ${toneClasses[chapter.tone]}`} initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -16 }} transition={{ duration: 0.42, ease: "easeOut" }} aria-labelledby="memory-chapter-title">
              <div className="mx-auto w-full max-w-3xl">
                {chapter.id === "painting" ? <PaintingVisual /> : null}
                {chapter.id === "first-sight" ? <JourneyVisual /> : null}
                {chapter.id === "dasara" ? <FestivalVisual /> : null}
                {chapter.id === "coffee" ? <CoffeeVisual /> : null}
                <p className={`text-xs font-black uppercase tracking-[0.22em] ${chapter.tone === "night" || chapter.tone === "festival" ? "text-soft-green" : "text-nina-green"}`}>{chapter.eyebrow}</p>
                <h1 id="memory-chapter-title" className="mt-3 text-3xl font-black leading-tight sm:text-5xl">{chapter.title}</h1>
                <div className="mt-7 space-y-4 text-base font-bold leading-relaxed sm:text-lg">
                  {chapter.lines.map((line, index) => <motion.p key={line} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.08 }}>{line}</motion.p>)}
                </div>
                {chapter.id === "coffee" ? <CoffeeInteraction answer={coffeeAnswer} onAnswer={setCoffeeAnswer} /> : null}
                {chapter.id === "coffee" ? <CoffeeDebt /> : null}
                {chapter.id === "then-to-now" ? <MemoryTimeline /> : null}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {!isFinal ? <nav className="flex items-center justify-between gap-3" aria-label="Memory chapter navigation">
          <button type="button" onClick={() => goTo(chapterIndex - 1)} disabled={chapterIndex === 0} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-deep-red/15 bg-white px-4 text-sm font-black text-cocoa shadow-sm outline-none transition enabled:hover:border-nina-red/40 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-4 focus-visible:ring-nina-red/30">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
          </button>
          <p className="text-xs font-bold text-plum">{String(chapterIndex + 1).padStart(2, "0")} / {String(october2Chapters.length).padStart(2, "0")}</p>
          <button type="button" onClick={() => goTo(chapterIndex + 1)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-nina-red px-5 text-sm font-black text-white shadow-button outline-none transition hover:bg-deep-red focus-visible:ring-4 focus-visible:ring-nina-red/30">
            {chapterIndex === october2Chapters.length - 1 ? "Final memory" : "Continue"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav> : null}
      </div>
    </main>
  );
}

function MemoryIntro({ onStart, onClose }: { onStart: () => void; onClose: () => void }) {
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#2a1722] px-5 py-8 text-warm-white"><MemoryParticles tone="night" /><button type="button" onClick={onClose} className="absolute left-5 top-5 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-bold outline-none transition hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-white/30"><ArrowLeft className="h-4 w-4" /> Home</button><motion.section className="relative z-10 max-w-xl text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><Moon className="mx-auto h-12 w-12 text-warm-white" fill="currentColor" aria-hidden="true" /><p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-soft-green">02 October 2025</p><h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">I thought it was going to be just another evening.</h1><p className="mt-8 text-2xl font-black text-[#f4c7d4]">I was wrong.</p><button type="button" onClick={onStart} className="mt-12 inline-flex min-h-14 items-center gap-2 rounded-full bg-nina-red px-7 text-base font-black text-white shadow-[0_0_36px_rgba(198,40,74,0.55)] outline-none transition hover:bg-[#d7375c] focus-visible:ring-4 focus-visible:ring-white/35">Take me back <ArrowRight className="h-5 w-5" /></button></motion.section></main>;
}

function PaintingVisual() { return <div className="mb-8 overflow-hidden rounded-xl border border-white/15 bg-[#1c2a26] p-5 shadow-2xl"><div className="relative h-44 overflow-hidden rounded-lg bg-[radial-gradient(circle_at_72%_25%,#fffdf9_0_10%,transparent_11%),linear-gradient(180deg,#283a40_0%,#1c2a26_58%,#18221c_100%)]"><span className="absolute left-[14%] top-[22%] text-soft-green/70">✦</span><span className="absolute left-[45%] top-[13%] text-warm-white/75">✦</span><span className="absolute left-[84%] top-[46%] text-soft-green/70">·</span><div className="absolute bottom-0 left-[28%] h-24 w-12 rounded-t-[100%] border-x-4 border-t-4 border-[#b88e70]" /><div className="absolute bottom-16 left-[27%] h-9 w-9 rounded-full bg-[#b88e70]" /><div className="absolute bottom-[5.2rem] left-[24%] h-8 w-1 rotate-[-25deg] bg-[#b88e70]" /><div className="absolute bottom-[5.2rem] left-[31%] h-8 w-1 rotate-[25deg] bg-[#b88e70]" /></div><p className="mt-3 text-xs font-bold text-soft-green">A painting placeholder, ready for your actual October 2nd photo.</p></div>; }
function JourneyVisual() { return <div className="mb-8 flex h-24 items-end justify-center gap-8 rounded-xl border border-white/10 bg-white/5 p-4"><div className="h-12 w-24 rounded-t-full border-4 border-soft-green/80 border-b-0" /><div className="h-3 w-3 rounded-full bg-warm-white" /><div className="h-3 w-3 rounded-full bg-warm-white" /></div>; }
function FestivalVisual() { return <div className="mb-8 flex h-20 items-end justify-around overflow-hidden rounded-xl bg-[#6f1633] px-5"><Sparkles className="mb-10 h-5 w-5 text-soft-green" /><span className="mb-8 text-warm-white">✦</span><Sparkles className="mb-7 h-4 w-4 text-warm-white" /><span className="mb-12 text-soft-green">✦</span></div>; }
function CoffeeVisual() { return <div className="mb-8 flex justify-center"><motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} className="relative grid h-24 w-28 place-items-center rounded-b-[2rem] rounded-t-xl bg-[#3d2921] text-4xl shadow-lg"><span aria-hidden="true">☕</span><span className="absolute -right-7 top-5 h-11 w-8 rounded-r-full border-8 border-[#3d2921]" /></motion.div></div>; }
function CoffeeInteraction({ answer, onAnswer }: { answer: "black" | "sugar" | null; onAnswer: (answer: "black" | "sugar") => void }) { return <section className="mt-8 rounded-xl border border-nina-red/15 bg-white/75 p-5 text-cocoa"><p className="text-sm font-black uppercase tracking-[0.16em] text-nina-red">What would Gagan normally choose?</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => onAnswer("black")} className="min-h-12 rounded-lg border border-deep-red/15 px-4 font-black outline-none transition hover:border-nina-red focus-visible:ring-4 focus-visible:ring-nina-red/25">Black coffee</button><button type="button" onClick={() => onAnswer("sugar")} className="min-h-12 rounded-lg bg-nina-green px-4 font-black text-white outline-none transition hover:bg-[#316746] focus-visible:ring-4 focus-visible:ring-nina-green/25">Coffee + sugar</button></div>{answer ? <p className="mt-4 font-bold" aria-live="polite">{answer === "sugar" ? "Exactly. You know me." : "Bold choice. Unfortunately, historically inaccurate."}</p> : null}</section>; }
function CoffeeDebt() { return <aside className="mt-5 rounded-xl border border-nina-green/25 bg-soft-green p-5 text-cocoa"><div className="flex items-start gap-3"><Coffee className="mt-1 h-5 w-5 text-nina-green" /><div><p className="font-black">Coffee Debt</p><p className="text-sm font-bold">1 proper cup · Status: still pending</p><p className="mt-2 text-sm">I am still waiting for my proper cup of coffee from you.</p></div></div></aside>; }
function MemoryTimeline() { return <ol className="mt-8 space-y-3 border-l-2 border-nina-red/30 pl-5 text-sm font-bold"><li><span className="text-nina-red">02.10.2025</span> · The first time I saw you.</li><li><span className="text-nina-red">Coffee</span> · The first coffee.</li><li><span className="text-nina-red">Moon</span> · The first walk through Dasara.</li><li><span className="text-nina-red">24.09.2026</span> · Today.</li></ol>; }
function FinalMemory({ moonClicks, onMoonClick, onRelive, onSave, saved }: { moonClicks: number; onMoonClick: () => void; onRelive: () => void; onSave: () => void; saved: boolean }) { return <motion.section className="my-5 flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[#2a1722] px-6 py-12 text-center text-warm-white shadow-soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="max-w-2xl"><button type="button" onClick={onMoonClick} aria-label="A small moon" className="mx-auto rounded-full p-2 text-warm-white/80 outline-none transition hover:text-white focus-visible:ring-4 focus-visible:ring-white/35"><Moon className="h-10 w-10" fill="currentColor" /></button>{moonClicks >= 3 ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-xl bg-white/10 p-4"><p className="font-black text-soft-green">You found the moon.</p><p className="mt-2 text-sm font-bold">Funny how a painting I made before I knew what was coming ended up feeling like a tiny preview of the evening I met you. Maybe coincidence. Either way, I am glad it happened.</p></motion.div> : null}<p className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-soft-green">All the Dasaras yet to come</p><h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">I hope I get to experience them all with you.</h1><div className="mx-auto mt-8 max-w-lg space-y-3 text-base font-bold leading-relaxed sm:text-lg"><p>When I look back at that evening now, I remember the first time I saw you, the first coffee you gave me, and the first walk we took together.</p><p>Many more evenings. Many more Dasaras. Many more walks. Countless cups of coffee, preferably with sugar this time.</p><p>And a lifetime of memories together.</p></div>{saved ? <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-soft-green px-5 py-3 font-black text-cocoa"><BookmarkCheck className="h-5 w-5 text-nina-green" /> Memory saved.</p> : <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={onRelive} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-5 font-black outline-none transition hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-white/30"><RotateCcw className="h-4 w-4" /> Relive October 2nd</button><button type="button" onClick={onSave} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-nina-red px-5 font-black outline-none transition hover:bg-[#d7375c] focus-visible:ring-4 focus-visible:ring-white/30"><BookmarkCheck className="h-4 w-4" /> Keep this memory</button></div>}</div></motion.section>; }
function MemoryParticles({ tone }: { tone: "night" | "light" | "green" | "festival" }) { const reduceMotion = useReducedMotion(); const color = tone === "night" || tone === "festival" ? "text-warm-white/50" : "text-nina-red/20"; return <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">{Array.from({ length: 9 }).map((_, index) => <motion.span key={index} className={`absolute text-sm ${color}`} style={{ left: `${8 + ((index * 17) % 84)}%`, top: `${8 + ((index * 29) % 80)}%` }} animate={reduceMotion ? undefined : { y: [0, -12, 0], opacity: [0.22, 0.8, 0.22] }} transition={{ duration: 3.5 + (index % 3), repeat: Infinity, delay: index * 0.25 }}>✦</motion.span>)}</div>; }
