"use client";

import { useEffect, useRef } from "react";

// The small square that trails the pointer across the whole site.
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      const follow = 1 - Math.exp(-(now - last) * 0.008);
      last = now;
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      cursor.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!frame) {
        x = targetX;
        y = targetY;
        cursor.style.opacity = "1";
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] size-3 rounded-[2px] bg-black/48 opacity-0"
    />
  );
}
