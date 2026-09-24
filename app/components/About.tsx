import { strengths } from "@/app/lib/data";
import Reveal from "./Reveal";
import { Quote } from "./icons";

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-page">
        <Reveal as="figure" className="mx-auto max-w-4xl text-center">
          <Quote className="mx-auto h-8 w-8 text-aqua/50" />
          <blockquote className="display mt-8 text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.12] text-ink">
            Coding is not just writing code that runs successfully; it&apos;s about creating something
            meaningful, adding real value to the world. It&apos;s about{" "}
            <em className="text-gradient">critical thinking</em>, <em className="text-gradient">problem-solving</em>{" "}
            and <em className="text-gradient">continuous learning</em>. Coding is an art — it&apos;s about
            advancing human life to the next level.
          </blockquote>
          <figcaption className="mt-8 font-mono text-xs uppercase tracking-eyebrow text-stone-500">— Adel</figcaption>
        </Reveal>

        <div className="mt-24 grid gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="group bg-ivory-100 p-8 transition-colors duration-500 hover:bg-white">
              <span className="font-mono text-[11px] text-stone-500">0{i + 1}</span>
              <h3 className="mt-10 font-serif text-2xl text-ink">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{s.body}</p>
              <span
                aria-hidden
                className="mt-8 block h-px w-10 bg-gradient-to-r from-mint to-aqua transition-all duration-500 group-hover:w-20"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
