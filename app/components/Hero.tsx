import Image from "next/image";
import { profile, techStack, projects, testimonials } from "@/app/lib/data";
import { ArrowRight, Github, Linkedin, Mail } from "./icons";

const years = new Date().getFullYear() - 2018;
const countries = new Set(testimonials.map((t) => t.place)).size;

const pad = (n: number) => String(n).padStart(2, "0");

const stats = [
  { value: pad(years), suffix: "+", label: "Years shipping" },
  { value: pad(projects.length), label: "Products delivered" },
  { value: pad(testimonials.length), label: "Client reviews" },
  { value: pad(countries), label: "Countries served" },
];

export default function Hero() {
  return (
    <section id="top" className="grain relative isolate overflow-hidden bg-ink text-white">
      {/* Ambient brand light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora left-[-10%] top-[-20%] h-[38rem] w-[38rem] bg-mint/40" />
        <div className="aurora right-[-15%] top-[10%] h-[34rem] w-[34rem] bg-aqua/40 [animation-delay:-6s]" />
        <div className="aurora bottom-[-30%] left-[30%] h-[30rem] w-[30rem] bg-aqua/20 [animation-delay:-12s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="container-page grid min-h-[100svh] items-center gap-16 pb-16 pt-32 lg:grid-cols-[1.2fr_0.8fr] lg:pt-28">
        <div>
          <p className="font-mono text-sm text-white/55">
            <span className="text-mint">adel@dev</span>:<span className="text-aqua">~</span>$ whoami
          </p>
          <h1 className="display mt-6 text-[clamp(3rem,9vw,6.75rem)]">
            Adel
            <br />
            <span className="text-gradient">Djidjik</span>
            <span className="cursor" aria-hidden />
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
            <span className="text-white">Software engineer &amp; full-stack JavaScript developer.</span>{" "}
            I design and build fast, scalable products — from the first wireframe to production.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              Let&apos;s work together <ArrowRight width={16} height={16} />
            </a>
            <a href="#work" className="btn-ghost">
              View selected work
            </a>
          </div>

          <ul className="mt-10 flex items-center gap-2" aria-label="Social profiles">
            {[
              { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
              { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: profile.github, label: "GitHub", Icon: Github },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="icon-btn border-white/10 text-white/70 hover:-translate-y-0.5 hover:border-mint/60 hover:text-mint"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Portrait with orbiting stack */}
        <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem]">
          <div aria-hidden className="absolute inset-0 rounded-full border border-white/10" />
          <div aria-hidden className="absolute inset-[9%] rounded-full border border-dashed border-white/10" />
          <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-mint to-aqua p-[3px] shadow-glow">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-ink">
              <Image
                src="/img/me.jpeg"
                alt="Portrait of Adel Djidjik"
                fill
                priority
                sizes="(min-width: 640px) 17rem, 15rem"
                className="object-cover"
              />
            </div>
          </div>
          <ul className="orbit absolute inset-0" aria-label="Core stack">
            {techStack.map((t, i) => {
              const angle = (i / techStack.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <li
                  key={t.alt}
                  className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * 50}% - 1.5rem)`,
                    top: `calc(50% + ${Math.sin(angle) * 50}% - 1.5rem)`,
                  }}
                  title={t.alt}
                >
                  <Image src={t.src} alt={t.alt} width={26} height={26} className="h-[26px] w-[26px] rounded-md object-contain" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="container-page pb-14">
        <dl className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 sm:py-8 ${i % 2 ? "pl-6" : ""} sm:pl-8 sm:first:pl-0 ${i ? "sm:border-l sm:border-white/10" : ""} ${i > 1 ? "border-t border-white/10 sm:border-t-0" : ""}`}
            >
              <dt className="font-mono text-[11px] uppercase tracking-eyebrow text-white/45">{s.label}</dt>
              <dd className="mt-3 flex items-start gap-1 text-white">
                <span className="lcd text-4xl text-mint sm:text-5xl" data-ghost={"8".repeat(s.value.length)}>
                  {s.value}
                </span>
                {s.suffix && <span className="font-mono text-2xl font-bold text-mint">{s.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
