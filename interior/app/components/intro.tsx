// Page-load curtain. Pure CSS (see globals.css) so it covers the page from the
// very first paint, before React hydrates.
const layers = [
  { color: "var(--color-tan)", delay: "1.7s" },
  { color: "var(--color-umber)", delay: "1.6s" },
  { color: "var(--color-cocoa)", delay: "1.5s" },
];

// Runs before first paint so a reload always starts at the top of the page,
// including after a menu link has left a #section in the URL.
const startAtTop = `
document.documentElement.classList.add("js");
history.scrollRestoration = "manual";
if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
  if (location.hash) {
    history.replaceState(history.state, "", location.pathname + location.search);
  }
  scrollTo({ top: 0, behavior: "instant" });
}
`;

export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: startAtTop }} />
      <div aria-hidden className="intro">
        {layers.flatMap(({ color, delay }) =>
          ["intro-top", "intro-bottom"].map((side) => (
            <div
              key={color + side}
              className={`intro-panel ${side}`}
              style={{ background: color, animationDelay: delay }}
            />
          )),
        )}
        <div className="intro-line" />
      </div>
    </>
  );
}
