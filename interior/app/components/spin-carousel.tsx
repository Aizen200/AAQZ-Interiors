"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SPACING = 238 / 260; // Distance between cards, in card widths.
const SPEED = 0.454; // Spacings travelled per second.
const HOVER_SPEED = 0.19; // The same, while the pointer is over the carousel.
const ANGLE = "rotateY(90deg)";
const FLIP_TIME = 400; // Matches the .spin-face transition, in milliseconds.

// Every card stays at 90 degrees, and the track's perspective alone makes them
// open up away from the centre. Hovering flips a card flat (see .spin-face).
export function SpinCarousel({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cards = [...images, ...images];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = [...track.children] as HTMLElement[];
    let offset = 0;
    let speed = SPEED;
    let hovered = false;
    let dragX: number | null = null;
    let pointer: { x: number; y: number } | null = null;
    let open: Element | null = null;
    let pinned: Element | null = null; // A card opened by a tap, on touch screens.
    let dragStart: number | null = null;
    let openedAt = 0;

    const spacing = () => items[0].offsetWidth * SPACING;

    const place = () => {
      const step = spacing();
      const total = step * items.length;

      items.forEach((item, index) => {
        const x = (((index + offset) * step) % total + total) % total;
        item.style.transform = `translateX(${x - total / 2}px) ${ANGLE}`;
      });
    };

    // :hover only updates when the mouse moves, so a card drifting under a resting
    // pointer would never open. Check what is under the pointer ourselves instead.
    const updateOpen = () => {
      const under =
        pointer &&
        document.elementFromPoint(pointer.x, pointer.y)?.closest(".spin-face");
      const next = under && track.contains(under) ? under : pinned;
      if (next === open) return;
      // Let a card finish flipping first, or it can swing off the pointer and flicker.
      if (open && pointer && performance.now() - openedAt < FLIP_TIME) return;
      open?.classList.remove("open");
      next?.classList.add("open");
      open = next;
      openedAt = performance.now();
    };

    // Touch screens have no hover, so a tap opens a card and keeps it open.
    const tap = (event: PointerEvent) => {
      const face = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest(".spin-face");
      pinned = face && face !== pinned ? face : null;
      updateOpen();
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = true;
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      hovered = false;
      pointer = null;
      updateOpen();
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        pointer = { x: event.clientX, y: event.clientY };
      }
      dragX = dragStart = event.clientX;
      track.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        pointer = { x: event.clientX, y: event.clientY };
        updateOpen();
      }
      if (dragX === null) return;
      offset += (event.clientX - dragX) / spacing();
      dragX = event.clientX;
      place();
    };
    const onUp = (event: PointerEvent) => {
      const moved = dragStart === null ? 0 : Math.abs(event.clientX - dragStart);
      if (event.pointerType !== "mouse" && moved < 8) tap(event);
      dragX = dragStart = null;
    };
    const onCancel = () => (dragX = dragStart = null);
    const onOutside = (event: PointerEvent) => {
      if (!pinned || track.contains(event.target as Node)) return;
      pinned = null;
      updateOpen();
    };

    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onCancel);
    window.addEventListener("pointerdown", onOutside);
    window.addEventListener("resize", place);
    place();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Only animate while the carousel is on screen.
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const elapsed = Math.min((now - last) / 1000, 0.1);
      last = now;
      speed += ((hovered ? HOVER_SPEED : SPEED) - speed) * Math.min(elapsed * 8, 1);
      if (dragX === null) offset += elapsed * speed;
      place();
      updateOpen();
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting && !reduced) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(track);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("resize", place);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="spin-track relative h-[calc(var(--card)*300/260)] cursor-grab touch-pan-y select-none active:cursor-grabbing"
    >
      {cards.map((image, index) => (
        <div
          key={index}
          style={{
            transform: `translateX(${(index - (cards.length - 1) / 2) * SPACING * 100}%) ${ANGLE}`,
          }}
          className="absolute left-[calc(50%-var(--card)/2)] top-0 h-full w-(--card) [transform-style:preserve-3d]"
        >
          <div className="spin-face relative size-full">
            <div className="absolute inset-0 overflow-hidden rounded">
              <Image
                src={image}
                alt=""
                fill
                draggable={false}
                sizes="520px"
                className="pointer-events-none -scale-x-100 object-cover"
              />
            </div>
            {/* A flipped card lifts up: this keeps the pointer on it near the bottom. */}
            <span className="absolute inset-x-0 top-full h-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
