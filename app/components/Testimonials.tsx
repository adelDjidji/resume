"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { HOME, testimonials } from "@/app/lib/data";
import Avatar from "./Avatar";
import Reveal from "./Reveal";
import { ArrowLeft, ArrowRight, Linkedin, Pin, Quote, Upwork } from "./icons";
import type { DragState, GlobeMarker } from "./globe/Globe";

const Globe = dynamic(() => import("./globe/Globe"), { ssr: false });

const AUTOPLAY_MS = 7000;

const formatDate = (ym: string) =>
  new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(`${ym}-01T00:00:00`));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);
  const section = useRef<HTMLElement>(null);
  const drag = useRef<DragState>({ dragging: false, dx: 0, dy: 0, lastInteraction: 0 });
  const last = useRef({ x: 0, y: 0 });
  const markerEls = useRef<Record<string, HTMLElement | null>>({});

  const t = testimonials[active];

  // One marker per place; reviews from the same place share it
  const places = useMemo(() => {
    const map = new Map<string, { place: string; lat: number; lng: number; reviews: number[] }>();
    testimonials.forEach((r, i) => {
      const g = map.get(r.place) ?? { place: r.place, lat: r.lat, lng: r.lng, reviews: [] };
      g.reviews.push(i);
      map.set(r.place, g);
    });
    return [...map.values()];
  }, []);

  useEffect(() => {
    setWebgl(hasWebGL());
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = section.current;
    if (!el) return;
    const nearIO = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px" });
    const viewIO = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    nearIO.observe(el);
    viewIO.observe(el);
    return () => {
      nearIO.disconnect();
      viewIO.disconnect();
    };
  }, []);

  const go = useCallback((dir: 1 | -1) => setActive((i) => (i + dir + testimonials.length) % testimonials.length), []);

  const selectPlace = useCallback(
    (reviews: number[]) =>
      setActive((cur) => {
        const at = reviews.indexOf(cur);
        return at === -1 ? reviews[0] : reviews[(at + 1) % reviews.length];
      }),
    [],
  );

  const markers: GlobeMarker[] = useMemo(() => places.map((p) => ({ id: p.place, lat: p.lat, lng: p.lng })), [places]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current.dragging = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    setPaused(true);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging) return;
    drag.current.dx += e.clientX - last.current.x;
    drag.current.dy += e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
  };
  const endDrag = () => {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    drag.current.lastInteraction = performance.now();
    setPaused(false);
  };

  const autoplay = inView && !paused && !reduced;

  return (
    <section
      ref={section}
      id="clients"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="grain relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full bg-aqua/10 blur-[120px]" />
      </div>

      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-white/50">Client voices</p>
          <h2 className="display mt-6 text-4xl sm:text-5xl">
            Trusted by founders &amp; teams <em className="text-gradient">worldwide</em>.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          {/* Review panel */}
          <div
            className="order-2 lg:order-1"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <figure
              key={active}
              aria-live="polite"
              className="animate-[fadeIn_.7s_var(--ease-lux)_both] rounded-[28px] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm sm:p-10"
            >
              <div className="flex items-center justify-between">
                <Quote className="h-7 w-7 text-mint/60" />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white/60">
                  <Pin width={12} height={12} className="text-mint" /> {t.place}
                </span>
              </div>
              <blockquote className="mt-7 min-h-[9rem] font-sans text-[1.15rem] leading-[1.6] text-white/90 sm:text-[1.3rem]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <Avatar name={t.name} src={t.avatar} size={52} className="ring-2 ring-white/10" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{t.name}</p>
                  <p className="truncate text-sm text-white/55">{t.role}</p>
                </div>
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn shrink-0 border-white/10 text-white/70 hover:border-mint/60 hover:text-mint"
                  aria-label={`${t.name} on ${t.source === "linkedin" ? "LinkedIn" : "Upwork"}`}
                  title={`${formatDate(t.date)} · ${t.source === "linkedin" ? "LinkedIn" : "Upwork"}`}
                >
                  {t.source === "linkedin" ? <Linkedin /> : <Upwork />}
                </a>
              </figcaption>
              <p className="mt-4 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-white/35">
                {formatDate(t.date)} · via {t.source === "linkedin" ? "LinkedIn" : "Upwork"}
              </p>
            </figure>

            <div className="mt-6 flex items-center gap-4">
              <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="icon-btn border-white/15 text-white hover:border-mint hover:text-mint">
                <ArrowLeft />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next review" className="icon-btn border-white/15 text-white hover:border-mint hover:text-mint">
                <ArrowRight />
              </button>
              <div className="ml-2 flex-1">
                <div className="h-px w-full overflow-hidden bg-white/10">
                  <div
                    key={active}
                    className="h-full origin-left bg-gradient-to-r from-mint to-aqua"
                    style={{
                      animation: reduced ? "none" : `progress ${AUTOPLAY_MS}ms linear both`,
                      animationPlayState: autoplay ? "running" : "paused",
                      transform: reduced ? `scaleX(${(active + 1) / testimonials.length})` : undefined,
                    }}
                    onAnimationEnd={() => go(1)}
                  />
                </div>
              </div>
              <span className="flex items-baseline gap-2 text-white/40" aria-label={`Review ${active + 1} of ${testimonials.length}`}>
                <span className="lcd text-lg text-mint" data-ghost="88">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs">/</span>
                <span className="lcd text-sm" data-ghost="88">
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </span>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Review locations">
              {places.map((p) => {
                const on = p.place === t.place;
                return (
                  <li key={p.place}>
                    <button
                      type="button"
                      onClick={() => selectPlace(p.reviews)}
                      aria-pressed={on}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-300 ${
                        on ? "border-mint/60 bg-mint/10 text-white" : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {p.place}
                      <span className="font-mono text-[10px] text-white/40">{p.reviews.length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Globe */}
          <div className="order-1 lg:order-2">
            <div
              className="relative mx-auto aspect-square w-full max-w-[40rem] cursor-grab select-none active:cursor-grabbing"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
            >
              {near && webgl ? (
                <>
                  <Globe markers={markers} home={HOME} focus={t} drag={drag} markerEls={markerEls} active={inView} />
                  <div className="pointer-events-none absolute inset-0">
                    {places.map((p) => {
                      const isActive = p.place === t.place;
                      const face = isActive ? t : testimonials[p.reviews[0]];
                      return (
                        <div
                          key={p.place}
                          ref={(el) => {
                            markerEls.current[p.place] = el;
                          }}
                          className="invisible absolute left-0 top-0 will-change-transform"
                        >
                          <button
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => selectPlace(p.reviews)}
                            aria-label={`${p.place}: ${p.reviews.length} review${p.reviews.length > 1 ? "s" : ""}`}
                            className="group absolute -translate-x-1/2 -translate-y-1/2"
                          >
                            {isActive && <span className="absolute inset-[-6px] animate-ping rounded-full bg-mint/30" />}
                            <span
                              className={`relative block rounded-full p-[2px] transition-transform duration-500 ${
                                isActive
                                  ? "scale-110 bg-gradient-to-br from-mint to-aqua"
                                  : "bg-white/25 group-hover:scale-110 group-hover:bg-white/60"
                              }`}
                            >
                              <Avatar key={face.name} name={face.name} src={face.avatar} size={isActive ? 38 : 30} className="ring-2 ring-ink" />
                            </span>
                            {p.reviews.length > 1 && (
                              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 font-mono text-[10px] font-medium text-ink shadow">
                                {p.reviews.length}
                              </span>
                            )}
                          </button>

                          {isActive && (
                            <div
                              key={active}
                              aria-hidden
                              className="pointer-events-none absolute left-7 top-3 hidden w-64 origin-top-left animate-[pop_.5s_var(--ease-lux)_both] rounded-2xl border border-white/15 bg-ink/75 p-4 text-left shadow-2xl backdrop-blur-xl md:block"
                            >
                              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                                <Pin width={12} height={12} /> {t.place}
                              </p>
                              <p className="mt-2 text-sm font-semibold text-white">{t.name}</p>
                              <p className="mt-1.5 line-clamp-3 font-mono text-[12.5px] leading-relaxed text-white/75">“{t.quote}”</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(47,188,216,.25),rgba(8,17,20,.9)_65%)] shadow-[0_0_120px_-20px_rgba(47,188,216,.5)]" />
              )}
              <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-eyebrow text-white/30">
                Drag to explore · Home base {HOME.place}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
