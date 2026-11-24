import { CustomCursor } from "./components/custom-cursor";
import { Hero } from "./components/hero";
import { Intro } from "./components/intro";
import {
  CallToAction,
  Elements,
  Projects,
  Services,
  SiteFooter,
  Story,
  Values,
} from "./components/sections";
import { RevealObserver } from "./components/reveal-observer";
import { SiteNav } from "./components/site-nav";
import { Testimonials } from "./components/testimonials";
import { testimonials } from "./content";

export default function Home() {
  return (
    <>
      <Intro />
      <CustomCursor />
      <RevealObserver />
      <SiteNav />
      <main id="top">
        <Hero />
        <Story />
        <Services />
        <Projects />
        <Values />
        <Elements />
        {testimonials.items.length > 0 && <Testimonials />}
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  );
}
