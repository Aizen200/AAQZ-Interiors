import { Fragment, type CSSProperties } from "react";

export const heading =
  "text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.1] tracking-[-0.035em]";
export const eyebrow = "text-sm uppercase tracking-wide";

export function Words({ text }: { text: string }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={index}>
      <span className="reveal-word" style={{ "--i": index } as CSSProperties}>
        {word}
      </span>{" "}
    </Fragment>
  ));
}

// The shared eyebrow, heading and short description that opens each section.
// "split" puts the description on the right of the heading on large screens,
// "center" stacks everything in the middle, "stack" stacks it on the left.
export function SectionIntro({
  label,
  title,
  description,
  layout = "split",
  dark = false,
  className = "",
}: {
  label?: string;
  title: string;
  description?: string;
  layout?: "split" | "center" | "stack";
  dark?: boolean;
  className?: string;
}) {
  const muted = dark ? "text-white/60" : "text-neutral-500";
  const body = dark ? "text-white/75" : "text-neutral-600";

  const titleBlock = (
    <div>
      {label && <p className={`${eyebrow} ${muted}`}>{label}</p>}
      <h2 className={`${heading} mt-4 text-balance`}>
        <Words text={title} />
      </h2>
    </div>
  );

  const text = description && (
    <p
      className={`reveal max-w-md text-pretty text-base leading-relaxed md:text-lg ${body} ${
        layout === "center" ? "mx-auto" : ""
      }`}
    >
      {description}
    </p>
  );

  if (layout === "split") {
    return (
      <div
        className={`grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-6 ${className}`}
      >
        {titleBlock}
        <div className="lg:justify-self-end">{text}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-6 ${layout === "center" ? "text-center" : ""} ${className}`}
    >
      {titleBlock}
      {text}
    </div>
  );
}
