"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera, Heart, Mail, Moon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const experiences = [
  { href: "/october-2", label: "02.10", title: "The evening it all began", detail: "The day I first saw you.", icon: Moon, accent: "wine" },
  { href: "/mood-booster", label: "For you", title: "Open when you need me", detail: "A small mood lift, made with care.", icon: Mail, accent: "green" },
  { href: "/memories", label: "Our memories", title: "Little pieces of us", detail: "A shelf waiting for more moments.", icon: Camera, accent: "cream" },
  { href: "/just-because", label: "Just because", title: "A tiny surprise", detail: "Because I felt like making you smile.", icon: Sparkles, accent: "rose" },
];

export function NinaHome() {
  const reduceMotion = useReducedMotion();
  const [secretClicks, setSecretClicks] = useState(0);
  return <main className="relative min-h-screen overflow-hidden bg-warm-white px-5 py-8 text-cocoa sm:px-8"><AmbientBackground /><div className="relative z-10 mx-auto max-w-6xl"><header className="text-center"><motion.p className="font-serif text-xl italic text-deep-red/80 sm:text-2xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.7 }}>I made you a little place.</motion.p><motion.h1 className="mt-3 font-serif text-5xl font-semibold leading-none text-cocoa sm:text-7xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.65 }}>Nina<span className="text-nina-red">.</span></motion.h1><motion.p className="mx-auto mt-5 max-w-md text-base font-medium leading-relaxed text-plum sm:text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.38 }}>Come in. There are a few things I want you to see.</motion.p></header><section className="relative mx-auto mt-10 grid max-w-5xl items-center gap-5 lg:min-h-[470px] lg:grid-cols-[1fr_1.08fr_1fr]" aria-label="Nina's experiences"><div className="order-2 grid gap-4 lg:order-1">{experiences.slice(0, 2).map((experience, index) => <ExperienceBubble key={experience.href} experience={experience} index={index} />)}</div><PhotoFrame onSecret={() => setSecretClicks((count) => count + 1)} secretClicks={secretClicks} /><div className="order-3 grid gap-4">{experiences.slice(2).map((experience, index) => <ExperienceBubble key={experience.href} experience={experience} index={index + 2} />)}</div></section><motion.p className="mt-10 text-center text-sm font-medium italic text-plum/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.8 }}>Made with an unreasonable amount of thought.</motion.p></div></main>;
}

function PhotoFrame({ onSecret, secretClicks }: { onSecret: () => void; secretClicks: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return <motion.section className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }} onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setTilt({ x: (event.clientX - rect.left - rect.width / 2) / 35, y: (event.clientY - rect.top - rect.height / 2) / 35 }); }} onMouseLeave={() => setTilt({ x: 0, y: 0 })}><motion.div className="relative rotate-[-2deg] bg-[#fdf7ee] p-3 pb-10 shadow-[0_28px_55px_rgba(77,53,43,0.2)]" animate={{ rotateX: -tilt.y, rotateY: tilt.x }} transition={{ type: "spring", stiffness: 110, damping: 18 }}><div className="grid aspect-[4/5] place-items-center overflow-hidden bg-soft-green p-8 text-center"><div><Heart className="mx-auto h-9 w-9 text-nina-red" fill="currentColor" /><p className="mt-4 font-serif text-3xl italic text-nina-green">A place for your photo</p><p className="mt-3 text-sm font-medium text-nina-green/80">Add one in <code>public/images/nina-home.jpg</code></p></div></div><button type="button" onClick={onSecret} aria-label="A small heart in the photo corner" className="absolute bottom-3 right-3 text-nina-red/65 outline-none transition hover:scale-110 focus-visible:ring-4 focus-visible:ring-nina-red/30"><Heart className="h-4 w-4" fill="currentColor" /></button><p className="absolute bottom-3 left-4 font-serif text-lg italic text-deep-red/80">just you.</p></motion.div>{secretClicks >= 3 ? <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-4 max-w-xs text-center text-sm font-medium text-nina-green">You found something you&apos;re probably not supposed to find. There are more things hidden here. Maybe.</motion.p> : null}</motion.section>;
}

function ExperienceBubble({ experience, index }: { experience: (typeof experiences)[number]; index: number }) {
  const Icon = experience.icon;
  const accent = experience.accent === "green" ? "border-nina-green/25 bg-soft-green/70 hover:border-nina-green/50" : experience.accent === "wine" ? "border-nina-red/25 bg-[#f8e5e7] hover:border-nina-red/50" : experience.accent === "rose" ? "border-[#d9ae9e]/35 bg-[#f7eee5] hover:border-deep-red/40" : "border-[#d7c8b6] bg-[#fffaf3] hover:border-nina-green/40";
  return <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 + index * 0.1 }} whileHover={{ y: -4, scale: 1.015 }}><Link href={experience.href} className={`group block rounded-lg border p-5 shadow-[0_14px_30px_rgba(91,60,47,0.09)] outline-none transition focus-visible:ring-4 focus-visible:ring-nina-red/25 ${accent}`}><div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/70 text-deep-red shadow-sm transition group-hover:rotate-6"><Icon className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-deep-red/70">{experience.label}</p><h2 className="mt-1 font-serif text-xl font-semibold leading-tight text-cocoa">{experience.title}</h2><p className="mt-2 text-sm font-medium leading-relaxed text-plum">{experience.detail}</p></div></div></Link></motion.div>;
}

function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(232,216,195,0.75),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(220,230,216,0.62),transparent_30%)]" />{Array.from({ length: 11 }).map((_, index) => <motion.span key={index} className="absolute h-1 w-1 rounded-full bg-deep-red/25" style={{ left: `${7 + ((index * 23) % 84)}%`, top: `${10 + ((index * 17) % 78)}%` }} animate={reduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.25, 0.7, 0.25] }} transition={{ duration: 4 + (index % 3), repeat: Infinity, delay: index * 0.2 }} />)}</div>;
}
