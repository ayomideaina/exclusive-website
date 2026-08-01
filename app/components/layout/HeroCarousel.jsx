"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { heroSlides } from "../../data/heroSlides";

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const autoplayRef = useRef(null);

  const goTo = useCallback((i) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    autoplayRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(autoplayRef.current);
  }, [next]);

  const pauseAutoplay = () => clearInterval(autoplayRef.current);
  const resumeAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, AUTOPLAY_MS);
  };

  const handleTouchStart = (e) => {
    pauseAutoplay();
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 50;
    if (deltaX > SWIPE_THRESHOLD) prev();
    else if (deltaX < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
    resumeAutoplay();
  };

  const slide = heroSlides[index];

  return (
    <div
      className="relative bg-black rounded overflow-hidden flex items-center justify-between px-8 md:px-16 py-10 min-h-75"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div className="flex flex-col gap-4 text-text-light">
        <div className="flex items-center gap-3">
          {slide.eyebrowIcon === "apple" && (
            <FaApple className="w-6 h-6 text-white" />
          )}
          <span className="text-sm">{slide.eyebrow}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          {slide.title[0]} <br /> {slide.title[1]}
        </h1>
        <Link href={slide.ctaHref} className="flex items-center gap-2 underline text-sm w-fit">
          {slide.ctaLabel} →
        </Link>
      </div>

      <Image
        src={slide.image}
        alt={slide.imageAlt}
        width={400}
        height={256}
        className="hidden md:block max-h-64 object-contain"
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
