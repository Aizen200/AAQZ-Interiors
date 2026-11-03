"use client";

import { useEffect } from "react";

// Plays each text reveal once, when it scrolls into view (see .reveal in globals.css).
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );

    document
      .querySelectorAll(".reveal, .reveal-word")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
