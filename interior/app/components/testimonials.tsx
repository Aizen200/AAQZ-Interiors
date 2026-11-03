"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { testimonials } from "../content";

const { items } = testimonials;

// Three copies of the slides let the carousel loop: whenever it settles outside
// the middle copy, it jumps to the matching slide inside it.
const slides = [...items, ...items, ...items];

const arrow =
  "grid size-11 cursor-pointer place-items-center rounded bg-white transition-colors hover:bg-clay";

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const start = (index: number) => {
      const slide = track.children[index] as HTMLElement;
      return slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    };

    let timer: ReturnType<typeof setTimeout>;
    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const first = start(items.length);
        const length = start(items.length * 2) - first;
        const offset = track.scrollLeft - first;
        if (offset < -1 || offset > length - 1) {
          const left = first + ((offset % length) + length) % length;
          track.scrollTo({ left, behavior: "instant" });
        }
      }, 150);
    };

    track.scrollTo({ left: start(items.length), behavior: "instant" });
    track.addEventListener("scroll", settle);
    return () => {
      clearTimeout(timer);
      track.removeEventListener("scroll", settle);
    };
  }, []);

  const move = (direction: 1 | -1) => {
    const track = trackRef.current;
    const [first, second] = track?.children ?? [];
    if (!track || !first || !second) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollBy({
      left:
        direction *
        ((second as HTMLElement).offsetLeft -
          (first as HTMLElement).offsetLeft),
      behavior: reduced ? "instant" : "smooth",
    });
  };

  return (
    <section id="testimonials" className="py-18 md:py-24">
      <div className="px-4 pb-9 text-center md:pb-15">
        <h2 className="reveal text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.1] tracking-[-0.035em]">
          {testimonials.title}
        </h2>
      </div>

      <div
        className="relative [--slide:88vw] md:[--slide:min(52vw,720px)]"
        style={{ "--i": 2 } as CSSProperties}
      >
        <ul
          ref={trackRef}
          className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none]"
        >
          {slides.map((item, index) => (
            <li
              key={index}
              aria-hidden={
                index < items.length || index >= items.length * 2 || undefined
              }
              className="flex w-(--slide) shrink-0 snap-center"
            >
              <figure className="flex min-h-[440px] w-full flex-col justify-between gap-10 rounded-lg bg-sand p-6 md:min-h-[500px] md:p-10">
                <span
                  aria-hidden
                  className="h-14 font-serif text-[6rem] font-bold leading-none text-clay"
                >
                  “
                </span>
                <blockquote className="text-[clamp(1.25rem,1.7vw,1.5rem)] leading-snug tracking-[-0.02em]">
                  {item.quote}
                </blockquote>
                <figcaption className="text-sm leading-relaxed text-neutral-600">
                  <span className="block">{item.name}</span>
                  {item.role}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="absolute right-[calc(50%-var(--slide)/2+1rem)] top-4 flex gap-1.5">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => move(-1)}
            className={arrow}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => move(1)}
            className={arrow}
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
