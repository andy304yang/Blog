"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function StockPetMotion() {
  useScrollReveal([], {
    once: false,
    threshold: 0.12,
    rootMargin: "-5% 0px -12%",
  });

  return null;
}
