"use client";

import { useRouter } from "next/navigation";
import { MemoryExperience } from "@/components/MemoryExperience";

export default function OctoberTwoPage() { const router = useRouter(); return <MemoryExperience onClose={() => router.push("/")} />; }
