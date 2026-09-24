import Link from "next/link";

export default function MemoriesPage() {
  return <main className="grid min-h-screen place-items-center bg-warm-white p-6 text-center text-cocoa"><section><p className="font-serif text-4xl italic text-nina-green">Our memories</p><p className="mt-4 max-w-sm font-medium text-plum">A little shelf waiting for photos, dates, stories, and the moments that become ours.</p><Link className="mt-7 inline-flex rounded-full bg-nina-red px-5 py-3 text-sm font-black text-white" href="/">Back home</Link></section></main>;
}
