"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { hero } from "../content";

const SLIDE_DURATION = 5000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  useEffect(() => {
    if (hovered || reducedMotion) return;
    const timer = setTimeout(() => {
      setPrevious(active);
      setActive((active + 1) % hero.slides.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [active, hovered, reducedMotion]);

  return (
    <section
      aria-label="Introduction"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      className="relative flex min-h-svh flex-col overflow-hidden bg-cocoa text-white"
    >
      {hero.slides.map((slide, index) => (
        <div
          key={slide.image}
          aria-hidden
          className={`absolute inset-0 motion-safe:transition-[clip-path] motion-safe:duration-[1200ms] motion-safe:ease-[cubic-bezier(0.76,0,0.24,1)] ${
            index === active
              ? "z-20 [clip-path:inset(0_0_0_0)]"
              : index === previous
                ? "z-10 [clip-path:inset(0_0_0_0)] transition-none!"
                : "z-0 [clip-path:inset(0_0_0_100%)] transition-none!"
          }`}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            sizes="(min-aspect-ratio: 16/9) 100vw, 178vh"
            preload={index === 0}
            loading={index === 0 ? undefined : "eager"}
            className={`object-cover motion-safe:transition-transform motion-safe:duration-[1400ms] motion-safe:ease-[cubic-bezier(0.76,0,0.24,1)] ${
              index === active || index === previous
                ? "scale-100"
                : "scale-110 transition-none!"
            }`}
          />
        </div>
      ))}
      <div
        aria-hidden
        className="absolute inset-0 z-30 bg-gradient-to-t from-black/70 via-black/30 to-black/25"
      />

      <div className="relative z-40 flex flex-1 flex-col px-4 pb-6 pt-21 md:px-16 md:pb-15 md:pt-[158px]">
        <div className="mt-auto">
          <h1
            key={active}
            className="hero-text max-w-5xl text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.08] tracking-[-0.035em]"
          >
            {hero.slides[active].title}
          </h1>

          <div className="intro-drop mt-10 flex lg:justify-end">
            <div className="flex w-full gap-1 sm:w-auto">
              <a
                href="#about"
                className="flex h-14 flex-1 items-center justify-center sm:flex-none bg-white/20 px-4 whitespace-nowrap uppercase sm:px-8 backdrop-blur-md transition-colors hover:bg-white/30"
              >
                Scroll
              </a>
              <a
                href="#projects"
                className="flex h-14 flex-1 items-center justify-center sm:flex-none bg-white px-4 whitespace-nowrap uppercase sm:px-8 text-ink transition-colors hover:bg-clay"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
