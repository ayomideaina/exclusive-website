"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SectionNavArrows({ onPrev, onNext }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrev}
        aria-label="Previous"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-background-light hover:bg-border-light"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <button
        onClick={onNext}
        aria-label="Next"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-background-light hover:bg-border-light"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
