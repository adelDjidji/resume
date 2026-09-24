import Image from "next/image";
import { projects } from "@/app/lib/data";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="container-page">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-6 text-5xl text-ink sm:text-6xl">
              Products I&apos;ve <em className="text-gradient">brought to life</em>.
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-stone-600">
            Platforms, dashboards and websites for startups, enterprises and public institutions.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const Tag = p.link ? "a" : "div";
            return (
              <Reveal as="li" key={p.name} delay={(i % 3) * 90}>
                <Tag
                  {...(p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-ink/10 bg-ivory-200 shadow-lux">
                    <Image
                      src={p.cover}
                      alt={`${p.name} screenshot`}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {p.link && (
                      <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight width={16} height={16} />
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl leading-tight text-ink">
                      {p.name}
                      {p.link && <span className="sr-only"> (opens in a new tab)</span>}
                    </h3>
                    <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-wider text-stone-500">{p.date}</span>
                  </div>
                  {p.description && <p className="mt-1.5 text-[15px] text-stone-600">{p.description}</p>}
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {p.skills.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Tag>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
