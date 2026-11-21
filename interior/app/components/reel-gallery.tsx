"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AUTOPLAY = 3800; // Milliseconds each photo holds the centre.
const RESUME = 5000; // Quiet time after a swipe before autoplay picks up again.
const COPIES = 3; // The list repeats so the reel can loop in both directions.

// Phones: a snapping reel. The centred photo sits full size, its neighbours
// shrink and fade, and each image drifts inside its frame as it travels.
export function ReelGallery({ images }: { images: string[] }) {
  const reelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const cards = Array.from({ length: COPIES }, () => images).flat();
  const count = images.length;

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    const items = [...reel.children] as HTMLElement[];
    if (count === 0 || items.length < 2) return;

    // When the reel is hidden (e.g. display:none on larger screens) every
    // offset is 0, so all the measurements below must tolerate that.
    const isLaidOut = () => reel.clientWidth > 0 && items[1].offsetLeft !== items[0].offsetLeft;
    const step = () => items[1].offsetLeft - items[0].offsetLeft || 1;
    const centreOf = (index: number) => {
      const item = items[Math.max(0, Math.min(items.length - 1, index))];
      return item.offsetLeft + item.offsetWidth / 2 - reel.clientWidth / 2;
    };

    const nearest = () => {
      const index = Math.round((reel.scrollLeft - centreOf(0)) / step());
      return Number.isFinite(index) ? index : 0;
    };

    let current = 0;
    const paint = () => {
      if (!isLaidOut()) return;
      const middle = reel.scrollLeft + reel.clientWidth / 2;
      const size = step();
      items.forEach((item) => {
        const d = (item.offsetLeft + item.offsetWidth / 2 - middle) / size;
        const near = Math.min(Math.abs(d), 1);
        const frame = item.firstElementChild as HTMLElement;
        const photo = frame.firstElementChild as HTMLElement;
        frame.style.transform = `scale(${1 - near * 0.14})`;
        frame.style.opacity = `${1 - near * 0.55}`;
        photo.style.transform = `translateX(${Math.max(-1.5, Math.min(1.5, d)) * -9}%) scale(1.2)`;
      });
      current = ((nearest() % count) + count) % count;
      setActive(current);
    };

    // Keep the scroll position inside the middle copy, jumping by a whole copy
    // when it strays. The photos line up exactly, so the jump is invisible.
    const recentre = () => {
      if (!isLaidOut()) return;
      const index = nearest();
      if (index >= count && index < count * 2) return;
      const shift = (index < count ? count : -count) * step();
      reel.style.scrollSnapType = "none";
      reel.scrollLeft += shift;
      reel.style.scrollSnapType = "";
      paint();
    };

    let frame = 0;
    let settle = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
      clearTimeout(settle);
      settle = window.setTimeout(recentre, 160);
    };

    const goTo = (index: number) =>
      reel.scrollTo({ left: centreOf(index), behavior: "smooth" });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false;
    let resumeAt = 0;
    const timer = window.setInterval(() => {
      if (reduced || !visible || document.hidden || !isLaidOut()) return;
      if (performance.now() < resumeAt) return;
      goTo(nearest() + 1);
    }, AUTOPLAY);

    const hold = () => (resumeAt = performance.now() + RESUME);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    const onResize = () => {
      if (!isLaidOut()) return;
      reel.scrollLeft = centreOf(count + current);
      paint();
    };

    reel.scrollLeft = centreOf(count);
    paint();
    observer.observe(reel);
    reel.addEventListener("scroll", onScroll, { passive: true });
    reel.addEventListener("pointerdown", hold);
    reel.addEventListener("touchstart", hold, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      clearInterval(timer);
      observer.disconnect();
      reel.removeEventListener("scroll", onScroll);
      reel.removeEventListener("pointerdown", hold);
      reel.removeEventListener("touchstart", hold);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <div>
      <div
        ref={reelRef}
        aria-hidden
        className="reel flex snap-x snap-mandatory overflow-x-auto px-[18vw]"
      >
        {cards.map((image, index) => (
          <div key={index} className="w-[64vw] max-w-80 shrink-0 snap-center">
            <div className="relative aspect-4/5 overflow-hidden rounded will-change-transform">
              <div className="absolute inset-0 will-change-transform">
                <Image
                  src={image}
                  alt=""
                  fill
                  draggable={false}
                  sizes="64vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex w-[64vw] max-w-80 items-center gap-4 text-xs tracking-wide text-neutral-500 tabular-nums">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <span className="relative h-px flex-1 bg-neutral-300">
          <span
            className="absolute inset-y-0 left-0 bg-cocoa transition-[width] duration-500 ease-out"
            style={{ width: `${((active + 1) / count) * 100}%` }}
          />
        </span>
        <span>{String(count).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
