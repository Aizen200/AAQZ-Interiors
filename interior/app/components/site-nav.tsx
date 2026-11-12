"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../content";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[400px] -translate-x-1/2 rounded-lg bg-cocoa/75 text-white ring-1 ring-white/15 backdrop-blur-md intro-drop"
    >
      <div className="flex h-12 items-center justify-between pl-[18px] pr-1.5">
        <a href="#top" onClick={close} className="flex items-center gap-3">
          <Image
            src="/images/brand/zs-mark.png"
            alt="ZS"
            width={167}
            height={240}
            preload
            className="h-8 w-auto"
          />
          <span className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Design Studio
          </span>
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="grid size-9 cursor-pointer place-items-center"
        >
          <span
            aria-hidden
            className={`grid grid-cols-2 gap-[3px] transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
          >
            <span className="size-[5px] bg-white" />
            <span className="size-[5px] bg-white" />
            <span className="size-[5px] bg-white" />
            <span className="size-[5px] bg-white" />
          </span>
        </button>
      </div>

      <div
        id="site-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="overflow-hidden px-[18px] text-sm uppercase tracking-wide">
          {navigation.map((item) => (
            <li key={item.href} className="first:pt-2 last:pb-5">
              <a
                href={item.href}
                onClick={close}
                className="block py-2 transition-colors hover:text-clay"
              >
                {item.label}
              </a>
              {item.children && (
                <ul className="pb-1 text-xs text-white/70">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <a
                        href={child.href}
                        onClick={close}
                        className="block py-1.5 transition-colors hover:text-clay"
                      >
                        • {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
