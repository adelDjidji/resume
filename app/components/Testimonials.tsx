"use client";

import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { HOME, testimonials } from "@/app/lib/data";
import Avatar from "./Avatar";
import Reveal from "./Reveal";
import { ArrowLeft, ArrowRight, Linkedin, Pin, Quote, Upwork } from "./icons";
import type { DragState, GlobeMarker, ZoomState } from "./globe/Globe";

const Globe = dynamic(() => import("./globe/Globe"), { ssr: false });
const DEFAULT_ZOOM = 3.7;
const MIN_ZOOM = 2.4;
const MAX_ZOOM = 5.5;

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

// Spread offset in degrees for expanded markers - keep tight so all fit in zoomed view
const SPREAD_RADIUS = 2.5;

function getSpreadOffset(index: number, total: number): { lat: number; lng: number } {
  if (total === 1) return { lat: 0, lng: 0 };
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    lat: Math.sin(angle) * SPREAD_RADIUS,
    lng: Math.cos(angle) * SPREAD_RADIUS * 1.2,
  };
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [expandedPlace, setExpandedPlace] = useState<string | null>(null);
  const section = useRef<HTMLElement>(null);
  const drag = useRef<DragState>({ dragging: false, dx: 0, dy: 0, lastInteraction: 0 });
  const zoom = useRef<ZoomState>({ target: DEFAULT_ZOOM, velocity: 0 });
  const last = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef<number | null>(null);
  const markerEls = useRef<Record<string, HTMLElement | null>>({});
  const pendingZoomPlace = useRef<string | null>(null);
  const globeContainer = useRef<HTMLDivElement>(null);

  // Embla carousel for swipeable testimonials
  const autoplayPlugin = useRef(Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: true, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false }, [autoplayPlugin.current]);

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

  const go = useCallback(
    (dir: 1 | -1) => {
      if (!emblaApi) return;
      if (dir === 1) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  // Sync embla's selected slide with active state
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Scroll to active when it changes externally (e.g., from globe marker click)
  useEffect(() => {
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() !== active) {
      emblaApi.scrollTo(active);
    }
  }, [emblaApi, active]);

  const selectPlace = useCallback(
    (place: string, lat: number, lng: number, reviews: number[]) => {
      const z = zoom.current;

      if (reviews.length > 1 && expandedPlace !== place) {
        // First click on a group: zoom in close and expand to show all markers
        z.target = MIN_ZOOM;
        z.focusLat = lat;
        z.focusLng = lng;
        pendingZoomPlace.current = place;
        drag.current.lastInteraction = 0;
        setExpandedPlace(place);
        setActive(reviews[0]);
      } else if (expandedPlace === place) {
        // Already expanded: clicking the group marker again collapses it
        // Individual markers are handled separately
        setExpandedPlace(null);
        z.target = DEFAULT_ZOOM;
        z.focusLat = undefined;
        z.focusLng = undefined;
      } else {
        // Single marker: just select it
        setActive(reviews[0]);
      }
    },
    [expandedPlace],
  );

  const selectReview = useCallback((reviewIndex: number) => {
    setActive(reviewIndex);
  }, []);

  // Build markers: when a place is expanded, show individual review markers spread out
  const markers: GlobeMarker[] = useMemo(() => {
    const result: GlobeMarker[] = [];
    for (const p of places) {
      if (p.place === expandedPlace && p.reviews.length > 1) {
        // Add individual spread markers for expanded place
        p.reviews.forEach((reviewIdx, i) => {
          const offset = getSpreadOffset(i, p.reviews.length);
          result.push({
            id: `${p.place}__${reviewIdx}`,
            lat: p.lat + offset.lat,
            lng: p.lng + offset.lng,
          });
        });
      } else {
        // Add single marker for the place
        result.push({ id: p.place, lat: p.lat, lng: p.lng });
      }
    }
    return result;
  }, [places, expandedPlace]);

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

  // Attach wheel listener with passive: false to allow preventDefault
  useEffect(() => {
    const el = globeContainer.current;
    if (!el) return;
    const handleWheel = (e: globalThis.WheelEvent) => {
      e.preventDefault();
      const z = zoom.current;
      const delta = e.deltaY * 0.003;
      z.target = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z.target + delta));
      z.velocity = delta;
      z.focusLat = undefined;
      z.focusLng = undefined;
      drag.current.lastInteraction = performance.now();
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDist.current = Math.hypot(dx, dy);
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && lastPinchDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const delta = (lastPinchDist.current - dist) * 0.015;
      const z = zoom.current;
      z.target = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z.target + delta));
      z.velocity = delta;
      z.focusLat = undefined;
      z.focusLng = undefined;
      lastPinchDist.current = dist;
      drag.current.lastInteraction = performance.now();
    }
  };

  const onTouchEnd = () => {
    lastPinchDist.current = null;
  };

  // Control autoplay based on view state
  useEffect(() => {
    if (!emblaApi) return;
    const plugin = autoplayPlugin.current;
    if (inView && !paused && !reduced) {
      plugin.play();
    } else {
      plugin.stop();
    }
  }, [emblaApi, inView, paused, reduced]);

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
            className="order-2 lg:order-1 min-w-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div ref={emblaRef} className="overflow-hidden rounded-[28px]">
              <div className="flex touch-pan-y">
                {testimonials.map((review, idx) => (
                  <figure
                    key={idx}
                    aria-live={idx === active ? "polite" : "off"}
                    className="min-w-0 flex-[0_0_100%] rounded-[28px] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm sm:p-10"
                  >
                    <div className="flex items-center justify-between">
                      <Quote className="h-7 w-7 text-mint/60" />
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white/60">
                        <Pin width={12} height={12} className="text-mint" /> {review.place}
                      </span>
                    </div>
                    <blockquote className="mt-7 min-h-[9rem] font-sans text-[1.15rem] leading-[1.6] text-white/90 sm:text-[1.3rem]">
                      {review.quote}
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                      <Avatar name={review.name} src={review.avatar} size={52} className="ring-2 ring-white/10" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{review.name}</p>
                        <p className="truncate text-sm text-white/55">{review.role}</p>
                      </div>
                      <a
                        href={review.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-btn shrink-0 border-white/10 text-white/70 hover:border-mint/60 hover:text-mint"
                        aria-label={`${review.name} on ${review.source === "linkedin" ? "LinkedIn" : "Upwork"}`}
                        title={`${formatDate(review.date)} · ${review.source === "linkedin" ? "LinkedIn" : "Upwork"}`}
                      >
                        {review.source === "linkedin" ? <Linkedin /> : <Upwork />}
                      </a>
                    </figcaption>
                    <p className="mt-4 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-white/35">
                      {formatDate(review.date)} · via {review.source === "linkedin" ? "LinkedIn" : "Upwork"}
                    </p>
                  </figure>
                ))}
              </div>
            </div>

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
                      animationPlayState: inView && !paused && !reduced ? "running" : "paused",
                      transform: reduced ? `scaleX(${(active + 1) / testimonials.length})` : undefined,
                    }}
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
                      onClick={() => selectPlace(p.place, p.lat, p.lng, p.reviews)}
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
          <div className="order-1 lg:order-2 min-w-0">
            <div
              ref={globeContainer}
              className="relative mx-auto aspect-square w-full max-w-[40rem] cursor-grab select-none active:cursor-grabbing"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {near && webgl ? (
                <>
                  <Globe markers={markers} home={HOME} focus={t} drag={drag} zoom={zoom} markerEls={markerEls} active={inView} />
                  <div className="pointer-events-none absolute inset-0">
                    {places.flatMap((p) => {
                      const isExpanded = p.place === expandedPlace && p.reviews.length > 1;

                      if (isExpanded) {
                        // Render individual markers for expanded place
                        return p.reviews.map((reviewIdx) => {
                          const review = testimonials[reviewIdx];
                          const isThisActive = active === reviewIdx;
                          const markerId = `${p.place}__${reviewIdx}`;
                          return (
                            <div
                              key={markerId}
                              ref={(el) => {
                                markerEls.current[markerId] = el;
                              }}
                              className="invisible absolute left-0 top-0 will-change-transform"
                            >
                              <button
                                type="button"
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => selectReview(reviewIdx)}
                                aria-label={`${review.name} from ${p.place}`}
                                className="group absolute -translate-x-1/2 -translate-y-1/2"
                              >
                                {isThisActive && <span className="absolute inset-[-6px] animate-ping rounded-full bg-mint/30" />}
                                <span
                                  className={`relative block rounded-full p-[2px] transition-transform duration-500 ${
                                    isThisActive
                                      ? "scale-110 bg-gradient-to-br from-mint to-aqua"
                                      : "bg-white/25 group-hover:scale-110 group-hover:bg-white/60"
                                  }`}
                                >
                                  <Avatar name={review.name} src={review.avatar} size={isThisActive ? 38 : 30} className="ring-2 ring-ink" />
                                </span>
                              </button>

                              {isThisActive && (
                                <div
                                  aria-hidden
                                  className="pointer-events-none absolute left-7 top-3 hidden w-64 origin-top-left animate-[pop_.5s_var(--ease-lux)_both] rounded-2xl border border-white/15 bg-ink/75 p-4 text-left shadow-2xl backdrop-blur-xl md:block"
                                >
                                  <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                                    <Pin width={12} height={12} /> {p.place}
                                  </p>
                                  <p className="mt-2 text-sm font-semibold text-white">{review.name}</p>
                                  <p className="mt-1.5 line-clamp-3 font-mono text-[12.5px] leading-relaxed text-white/75">&ldquo;{review.quote}&rdquo;</p>
                                </div>
                              )}
                            </div>
                          );
                        });
                      }

                      // Render single grouped marker
                      const isActive = p.place === t.place;
                      const face = isActive ? t : testimonials[p.reviews[0]];
                      return [
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
                            onClick={() => selectPlace(p.place, p.lat, p.lng, p.reviews)}
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
                              aria-hidden
                              className="pointer-events-none absolute left-7 top-3 hidden w-64 origin-top-left animate-[pop_.5s_var(--ease-lux)_both] rounded-2xl border border-white/15 bg-ink/75 p-4 text-left shadow-2xl backdrop-blur-xl md:block"
                            >
                              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                                <Pin width={12} height={12} /> {t.place}
                              </p>
                              <p className="mt-2 text-sm font-semibold text-white">{t.name}</p>
                              <p className="mt-1.5 line-clamp-3 font-mono text-[12.5px] leading-relaxed text-white/75">&ldquo;{t.quote}&rdquo;</p>
                            </div>
                          )}
                        </div>,
                      ];
                    })}
                  </div>
                </>
              ) : (
                <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(47,188,216,.25),rgba(8,17,20,.9)_65%)] shadow-[0_0_120px_-20px_rgba(47,188,216,.5)]" />
              )}
              <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-eyebrow text-white/30">
                Drag to explore · Scroll to zoom · Home base {HOME.place}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
