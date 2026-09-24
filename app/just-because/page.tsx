import Link from "next/link";

export default function JustBecausePage() {
  return <main className="grid min-h-screen place-items-center bg-soft-green p-6 text-center text-cocoa"><section><p className="font-serif text-4xl italic text-nina-green">Just because</p><p className="mt-4 max-w-sm font-medium text-plum">This little corner is saving a surprise for a day that needs one.</p><Link className="mt-7 inline-flex rounded-full bg-nina-red px-5 py-3 text-sm font-black text-white" href="/">Back home</Link></section></main>;
}
