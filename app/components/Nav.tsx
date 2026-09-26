"use client";

import { useEffect, useState } from "react";
import { profile } from "@/app/lib/data";
import { ArrowUpRight } from "./icons";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#clients", label: "Clients" },
  { href: "#work", label: "Work" },
  { href: "#honors", label: "Honors" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex w-full max-w-page items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-ink/85 shadow-[0_10px_40px_-15px_rgba(0,0,0,.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 pl-2 text-white" aria-label="Adel Djidjik — back to top">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-mint to-aqua font-mono text-[13px] font-extrabold text-ink">
            &gt;_
          </span>
          <span className="hidden font-mono text-[15px] font-bold tracking-tight sm:inline">
            adel<span className="text-mint">.</span>djidjik
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary h-10 px-5 text-[13px]"
        >
          Résumé <ArrowUpRight width={15} height={15} />
        </a>
      </nav>
    </header>
  );
}
