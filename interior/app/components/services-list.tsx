"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Service = {
  title: string;
  text: string;
  details: string[];
  image: string;
};

// Each service opens like a drop-down to show its fuller description.
export function ServicesList({ items }: { items: Service[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <ol className="border-b border-white/10">
      {items.map((service, index) => {
        const expanded = open === index;
        const panel = `${id}-${index}`;

        return (
          <li key={service.title} className="border-t border-white/10">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                onClick={() => setOpen(expanded ? null : index)}
                className="group grid w-full cursor-pointer gap-4 px-4 py-6 text-left md:px-16 lg:grid-cols-[80px_minmax(0,320px)_1fr_auto] lg:items-center lg:gap-8 lg:py-7.5"
              >
                <span className="text-xl text-white/50">/0{index + 1}</span>
                <span className="order-last text-[15px] leading-relaxed text-white/70 lg:order-none">
                  {service.text}
                </span>
                <span className="flex items-center justify-between gap-6 lg:col-span-2 lg:justify-end">
                  {/* The colour lives on a wrapper: re-rendering the reveal element's
                      class list would drop its "in" class and hide the title. */}
                  <span
                    className={`transition-colors duration-300 group-hover:text-white ${
                      expanded ? "text-white" : "text-white/80"
                    }`}
                  >
                    <span className="reveal inline-block text-[clamp(2rem,4.2vw,3.75rem)] leading-tight tracking-[-0.03em]">
                      {service.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`grid size-11 shrink-0 place-items-center rounded-full border border-white/25 text-2xl leading-none transition-transform duration-300 ${
                      expanded ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </span>
              </button>
            </h3>

            <div
              id={panel}
              inert={!expanded}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-8 px-4 pb-10 md:px-16 lg:grid-cols-[80px_minmax(0,1fr)_minmax(0,420px)] lg:gap-8">
                  <div className="space-y-4 text-[15px] leading-relaxed text-white/75 lg:col-start-2 lg:max-w-2xl">
                    {service.details.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 420px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
