"use client";

import { useState } from "react";
import { profile } from "@/app/lib/data";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Phone, Pin, Upwork } from "./icons";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="grain relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora bottom-[-40%] left-[-10%] h-[36rem] w-[36rem] bg-mint/30" />
        <div className="aurora right-[-10%] top-[-30%] h-[30rem] w-[30rem] bg-aqua/25 [animation-delay:-9s]" />
      </div>

      <div className="container-page py-24 sm:py-32">
        <Reveal>
          <p className="eyebrow text-white/50">Contact</p>
          <h2 className="display mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)]">
            Let&apos;s build something <em className="text-gradient">remarkable</em>.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn-primary">
            <Mail width={16} height={16} /> {profile.email}
          </a>
          <button type="button" onClick={copy} className="btn-ghost" aria-live="polite">
            {copied ? <Check width={16} height={16} className="text-mint" /> : <Copy width={16} height={16} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/40">Phone</p>
            <a href={`tel:${profile.phoneHref}`} className="mt-3 flex items-center gap-2 text-lg text-white/85 hover:text-mint">
              <Phone width={16} height={16} /> {profile.phone}
            </a>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/40">Based in</p>
            <p className="mt-3 flex items-center gap-2 text-lg text-white/85">
              <Pin width={16} height={16} /> {profile.location}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/40">Elsewhere</p>
            <ul className="mt-3 flex gap-2">
              {[
                { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: profile.github, label: "GitHub", Icon: Github },
                { href: profile.upwork, label: "Upwork", Icon: Upwork },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
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
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 text-sm text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Adel Djidjik. Crafted with Next.js &amp; Three.js.</p>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
            Download résumé <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
