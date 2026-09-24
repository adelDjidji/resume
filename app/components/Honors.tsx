"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { honors } from "@/app/lib/data";
import Reveal from "./Reveal";
import { ArrowLeft, ArrowRight, Close } from "./icons";

// Aligns the first card with the page container while letting the track bleed to the viewport edge
const GUTTER = "max(1.25rem, calc((100vw - 76rem) / 2 + 2.5rem))";

export default function Honors() {
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const show = (i: number) => {
    setOpen(i);
    dialog.current?.showModal();
  };

  const current = open !== null ? honors[open] : null;

  return (
    <section id="honors" className="section overflow-hidden border-t border-ink/10 bg-ivory-200/60">
      <div className="container-page">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Certificates &amp; honors</p>
            <h2 className="display mt-6 text-5xl text-ink sm:text-6xl">
              Recognition along <em className="text-gradient">the way</em>.
            </h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left" className="icon-btn border-ink/15 text-ink hover:border-ink/40">
              <ArrowLeft />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll right" className="icon-btn border-ink/15 text-ink hover:border-ink/40">
              <ArrowRight />
            </button>
          </div>
        </Reveal>
      </div>

      <ul
        ref={track}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6"
        style={{ paddingInline: GUTTER, scrollPaddingInline: GUTTER }}
      >
        {honors.map((h, i) => (
          <li
            key={h.src}
            className="w-[calc(16rem*var(--ar))] shrink-0 snap-start sm:w-[calc(18rem*var(--ar))]"
            style={{ "--ar": Math.max(h.w / h.h, 0.9) } as CSSProperties}
          >
            <button type="button" onClick={() => show(i)} className="group block w-full text-left" aria-label={`View ${h.title}`}>
              <div className="relative h-64 w-full overflow-hidden rounded-[22px] border border-ink/10 bg-white p-3 shadow-lux sm:h-72">
                <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                  <Image
                    src={h.src}
                    alt={h.title}
                    fill
                    sizes="28rem"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <p className="mt-4 font-serif text-xl text-ink">{h.title}</p>
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-stone-500">{h.caption}</p>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[90vh] max-w-[min(64rem,92vw)] overflow-visible bg-transparent p-0"
      >
        {current && (
          <figure className="relative">
            <Image
              src={current.src}
              alt={current.title}
              width={current.w}
              height={current.h}
              sizes="92vw"
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-white">
              <span className="font-serif text-2xl">{current.title}</span>
              <span className="ml-3 font-mono text-[11px] uppercase tracking-wider text-white/60">{current.caption}</span>
            </figcaption>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              autoFocus
              className="icon-btn absolute -right-3 -top-3 border-white/20 bg-ink text-white hover:border-mint"
            >
              <Close />
            </button>
          </figure>
        )}
      </dialog>
    </section>
  );
}
