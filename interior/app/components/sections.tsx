import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import {
  callToAction,
  contact,
  elements,
  hero,
  navigation,
  projects,
  sectors,
  services,
  story,
  values,
} from "../content";
import { SpinCarousel } from "./spin-carousel";

const heading =
  "text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.1] tracking-[-0.035em]";
const eyebrow = "text-sm uppercase tracking-wide";
const body = "text-[15px] leading-relaxed text-neutral-600";

function flight(x: string, w: string, from: string, to: string) {
  return { "--x": x, "--w": w, "--from": from, "--to": to } as CSSProperties;
}

function Words({ text }: { text: string }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={index}>
      <span className="reveal-word" style={{ "--i": index } as CSSProperties}>
        {word}
      </span>{" "}
    </Fragment>
  ));
}

function Photo({
  src,
  alt,
  sizes,
  style,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div style={style} className={`relative overflow-clip ${className}`}>
      <div className="drift absolute inset-x-0 -inset-y-[10%]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

function ProjectCaption({
  name,
  location,
  category,
}: {
  name: string;
  location: string;
  category: string;
}) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
      />
      <span
        className={`${eyebrow} absolute right-4 top-4 rounded bg-black/30 px-2.5 py-1 text-xs text-white backdrop-blur-md md:right-6 md:top-6`}
      >
        {category}
      </span>
      <div className="absolute inset-x-4 bottom-4 text-white md:inset-x-6 md:bottom-6">
        <h3 className="text-2xl tracking-tight md:text-[32px]">{name}</h3>
        <p className="mt-1 text-sm text-white/85">{location}</p>
      </div>
    </>
  );
}

export function Story() {
  return (
    <section
      id="about"
      className="story scroll-mt-20 px-4 py-18 md:px-16 md:py-24"
    >
      <div className="story-stage grid grid-cols-12 items-start gap-x-4 gap-y-10 lg:gap-x-6">
        <div className="story-heading order-first col-span-12 text-center lg:order-none lg:col-start-1 lg:row-start-2">
          <p className={`${eyebrow} text-neutral-500`}>{story.eyebrow}</p>
          <h2 className={`${heading} mt-4`}>
            <Words text={story.title} />
          </h2>
        </div>

        <Photo
          src={story.images.tall}
          alt="Basin and round mirror against a warm plaster wall"
          sizes="(min-width: 1024px) 25vw, 58vw"
          style={flight("4.5vw", "21vw", "0%", "42%")}
          className="story-fly col-span-7 aspect-[300/338] lg:col-span-3 lg:row-start-1"
        />
        <Photo
          src={story.images.small}
          alt="Console with a vase of dried grasses"
          sizes="(min-width: 1024px) 17vw, 42vw"
          style={flight("80vw", "15vw", "8%", "50%")}
          className="story-fly col-span-5 mt-16 aspect-[200/227] lg:col-span-2 lg:col-start-11 lg:row-start-1 lg:mt-0"
        />
        <p
          className={`${body} story-text-a reveal col-span-12 max-w-xs lg:col-span-3 lg:col-start-4 lg:row-start-1 lg:self-center`}
        >
          {story.first}
        </p>

        <Photo
          src={story.images.wide}
          alt="Living room with a stone-panelled TV wall at Oberoi Goregaon"
          sizes="(min-width: 1024px) 60vw, 120vw"
          style={flight("29vw", "42vw", "26%", "70%")}
          className="story-fly col-span-12 aspect-[600/335] lg:col-span-6 lg:col-start-4 lg:row-start-3"
        />
        <Photo
          src={story.images.bedroom}
          alt="Bedroom with a tufted headboard at Octacrest Lokhandwala Kandivali"
          sizes="50vw"
          style={flight("6vw", "19vw", "52%", "92%")}
          className="story-fly hidden aspect-[4/5]"
        />
        <Photo
          src={story.images.dining}
          alt="Dining area with a yellow feature wall at Octacrest Lokhandwala Kandivali"
          sizes="50vw"
          style={flight("72vw", "22vw", "58%", "100%")}
          className="story-fly hidden aspect-[4/5]"
        />
        <div className="story-text-b reveal col-span-12 max-w-xs lg:col-span-3 lg:col-start-10 lg:row-start-3">
          <p className={body}>{story.second}</p>
          <p className={`${body} mt-4`}>{story.third}</p>
          <a
            href="#services"
            className="mt-6 inline-block border-b border-ink pb-1 text-sm uppercase tracking-wide transition-colors hover:border-umber hover:text-umber"
          >
            Discover more
          </a>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-cocoa py-18 text-white md:py-24"
    >
      <div className="px-4 pb-7.5 md:px-16">
        <p className={`${eyebrow} text-white/60`}>{services.eyebrow}</p>
        <h2 className="mt-3 text-2xl tracking-tight">{services.title}</h2>
      </div>

      <ol className="border-b border-white/10">
        {services.items.map((service, index) => (
          <li
            key={service.title}
            className="group grid gap-4 border-t border-white/10 px-4 py-6 md:px-16 lg:grid-cols-[80px_minmax(0,320px)_1fr_auto] lg:items-center lg:gap-8 lg:py-7.5"
          >
            <span className="text-xl text-white/50">/0{index + 1}</span>
            <p className="order-last text-[15px] leading-relaxed text-white/70 lg:order-none">
              {service.text}
            </p>
            <div className="relative hidden h-24 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 xl:block xl:w-40 xl:justify-self-end">
              <Image
                src={service.image}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <h3 className="text-[clamp(2rem,4.2vw,3.75rem)] leading-tight tracking-[-0.03em] reveal text-white/80 transition-colors duration-300 group-hover:text-white lg:text-right">
              {service.title}
            </h3>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Projects() {
  const { octacrest, oberoi } = projects;

  return (
    <section id="projects" className="scroll-mt-20 bg-sand pb-1 pt-18 md:pt-24">
      <div className="px-4 pb-12 text-center md:pb-18 lg:sticky lg:top-[30vh]">
        <p className={`${eyebrow} text-neutral-500`}>{projects.eyebrow}</p>
        <h2 className={`${heading} mt-4`}>
          <Words text={projects.title} />
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-1 bg-sand px-1 lg:grid-cols-3">
        <article className="grow group relative aspect-[4/3] overflow-hidden lg:col-span-3 lg:aspect-[16/7]">
          <Image
            src={octacrest.image}
            alt={`${octacrest.name} ${octacrest.location} living room`}
            fill
            sizes="(min-width: 1024px) 100vw, 134vw"
            className="object-cover object-[50%_80%] transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <ProjectCaption {...octacrest} />
        </article>

        <article className="grow group relative aspect-[4/3] overflow-hidden lg:col-span-2 lg:aspect-auto">
          <Image
            src={oberoi.image}
            alt={`${oberoi.name} ${oberoi.location} living room`}
            fill
            sizes="(min-width: 1024px) 80vw, 134vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <ProjectCaption {...oberoi} />
        </article>
        <div className="grow relative hidden aspect-[3/4] overflow-hidden lg:block">
          <Image
            src={oberoi.detail}
            alt={`Leather sofa against a dark stone wall at ${oberoi.name} ${oberoi.location}`}
            fill
            sizes="80vw"
            className="object-cover object-[75%_50%]"
          />
        </div>
      </div>
    </section>
  );
}

export function Elements() {
  return (
    <section id="elements" className="overflow-x-clip py-18 md:py-24">
      <div className="mx-auto w-fit max-w-full px-4">
        <p className={`${eyebrow} text-neutral-500`}>{elements.eyebrow}</p>
        <h2 className={`${heading} mt-4`}>
          <Words text={elements.title} />
        </h2>
        <p className="reveal mt-4 text-right text-lg text-neutral-600">
          {elements.text}
        </p>
      </div>

      <div className="mt-12 md:mt-18">
        <SpinCarousel images={elements.images} />
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section className="relative flex min-h-svh items-center overflow-clip bg-cocoa px-4 pb-36 pt-24 text-white md:px-16">
      <div className="drift-strong absolute inset-x-0 -inset-y-[15%]">
        <Image
          src={callToAction.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 100vw, 275vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 via-60% to-cocoa to-90%"
      />
      <div className="relative mx-auto w-full max-w-[880px]">
        <h2 className={`${heading} text-center`}>
          <Words text={callToAction.title} />
        </h2>
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-[15px] leading-relaxed text-white/80">
            <Words text={callToAction.text} />
          </p>
          <a
            href="#contact"
            style={{ "--i": 6 } as CSSProperties}
            className="reveal flex h-14 shrink-0 items-center justify-center bg-white px-8 text-ink transition-colors hover:bg-clay"
          >
            Start my project
          </a>
        </div>
      </div>
    </section>
  );
}

export function Values() {
  return (
    <section id="skills" className="bg-sand px-4 py-18 md:px-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-6">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className={`${eyebrow} text-neutral-500`}>{values.eyebrow}</p>
          <h2 className={`${heading} mt-4 max-w-lg`}>
            <Words text={values.title} />
          </h2>
        </div>

        <ol className="flex flex-col gap-4 lg:gap-6">
          {values.items.map((value, index) => (
            <li
              key={value.title}
              style={{ top: `${96 + index * 16}px` }}
              className="flex min-h-64 flex-col justify-between gap-12 rounded-lg bg-white p-6 shadow-[0_-8px_24px_rgba(47,32,27,0.05)] md:p-8 lg:sticky lg:min-h-[340px]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight tracking-tight">
                  {value.title}
                </h3>
                <span className="text-2xl text-neutral-400">/0{index + 1}</span>
              </div>
              <p className="max-w-md text-base leading-relaxed text-neutral-600">
                {value.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const columnTitle = "text-sm uppercase tracking-wide text-white";
  const link =
    "transition-colors duration-400 ease-[cubic-bezier(0.44,0,0.56,1)] hover:text-white";

  return (
    <footer
      id="contact"
      className="relative -mt-px scroll-mt-20 bg-cocoa px-4 pb-7.5 text-sm text-white/64 md:px-16"
    >
      <div className="-mx-4 mb-12 border-t border-white/10 md:-mx-16" />
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr]">
        <div>
          <p className="text-base font-medium uppercase tracking-[0.14em] text-clay">
            AAQZ Interiors
          </p>
          <p className="mt-6 max-w-xs text-2xl leading-snug tracking-tight text-white">
            {hero.slides[0].title}
          </p>
        </div>

        <div>
          <h2 className={columnTitle}>Index</h2>
          <ul className="mt-6 space-y-4 uppercase">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={columnTitle}>Services</h2>
          <ul className="mt-6 space-y-4 uppercase">
            {sectors.map((sector) => (
              <li key={sector}>
                <a href="#services" className={link}>
                  {sector}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={columnTitle}>Contact Us</h2>
          <ul className="mt-6 space-y-4">
            {contact.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className={link}>
                  {phone.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} className={link}>
                {contact.email}
              </a>
            </li>
            <li className="max-w-xs leading-relaxed">{contact.address}</li>
            <li>
              <a
                href={contact.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-b border-white/40 pb-0.5 uppercase tracking-wide text-white transition-colors hover:border-white"
              >
                Get directions
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-12 border-t border-white/10 pt-6">
        © 2026 AAQZ Interiors. All rights reserved.
      </p>
    </footer>
  );
}
