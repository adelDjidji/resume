import { experience, graduation, type Experience as Exp } from "@/app/lib/data";
import Avatar from "./Avatar";
import Reveal from "./Reveal";
import { ArrowUpRight, ChevronDown, Pin, Sparkle } from "./icons";

function Role({ job, open }: { job: Exp; open: boolean }) {
  return (
    <details open={open} className="group/role card-lux overflow-hidden transition-shadow duration-500 hover:shadow-glow">
      <summary className="flex cursor-pointer items-start gap-4 p-5 sm:items-center sm:p-7">
        <Avatar name={job.company} src={job.logo} size={52} contain className="border border-ink/10 bg-white" />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500">{job.period}</p>
          <h3 className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-[1.7rem]">{job.role}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-600">
            <span className="font-semibold text-ink">{job.company}</span>
            <span className="inline-flex items-center gap-1.5">
              <Pin width={14} height={14} className="text-aqua" /> {job.location}
            </span>
          </p>
        </div>
        <span className="chevron mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 text-stone-500 transition-transform duration-500 sm:mt-0">
          <ChevronDown width={16} height={16} />
          <span className="sr-only">Toggle details</span>
        </span>
      </summary>

      <div className="border-t border-ink/[0.07] px-5 pb-7 pt-6 sm:px-7">
        <div className={`grid gap-6 ${job.highlights.length > 1 ? "md:grid-cols-3" : ""}`}>
          {job.highlights.map((h, i) => (
            <div key={h.title ?? i}>
              {h.title && <p className="mb-3 font-mono text-[11px] uppercase tracking-eyebrow text-aqua">{h.title}</p>}
              <ul className="space-y-2.5">
                {h.items.map((item) => (
                  <li key={item} className="relative pl-5 text-[15px] leading-relaxed text-stone-600">
                    <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-mint to-aqua" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-aqua/40 underline-offset-4 transition-colors hover:decoration-aqua"
        >
          Visit {job.company} <ArrowUpRight width={14} height={14} />
        </a>
      </div>
    </details>
  );
}

export default function Experience() {
  const gradIndex = experience.findIndex((e) => e.company === "Cevital");

  return (
    <section id="experience" className="section border-t border-ink/10 bg-ivory-200/60">
      <div className="container-page grid gap-14 lg:grid-cols-[0.75fr_1.6fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">Experience</p>
          <h2 className="display mt-6 text-5xl text-ink sm:text-6xl">
            A career built on <em className="text-gradient">shipping</em>.
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-stone-600">
            From enterprise platforms to startup MVPs — remote-first, across product, front-end and back-end.
          </p>
        </Reveal>

        <ol className="relative space-y-5 before:absolute before:bottom-4 before:left-[-1.4rem] before:top-4 before:hidden before:w-px before:bg-gradient-to-b before:from-aqua/60 before:via-ink/10 before:to-transparent lg:before:block">
          {experience.map((job, i) => [
            i === gradIndex && (
              <li key="graduation" className="relative">
                <span aria-hidden className="absolute left-[-1.4rem] top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua ring-4 ring-ivory lg:block" />
                <Reveal className="flex items-center gap-4 rounded-[28px] border border-dashed border-aqua/40 bg-white/50 px-6 py-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-mint to-aqua text-ink">
                    <Sparkle />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500">{graduation.date} · Graduation</p>
                    <p className="font-serif text-xl text-ink">{graduation.title}</p>
                  </div>
                </Reveal>
              </li>
            ),
            <li key={job.company + job.period} className="relative">
              <span
                aria-hidden
                className={`absolute left-[-1.4rem] top-10 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-ivory lg:block ${
                  i === 0 ? "bg-mint shadow-[0_0_0_6px_rgba(101,210,165,.25)]" : "bg-ink/25"
                }`}
              />
              <Reveal delay={60}>
                <Role job={job} open={i === 0} />
              </Reveal>
            </li>,
          ])}
        </ol>
      </div>
    </section>
  );
}
