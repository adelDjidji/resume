"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  as?: "div" | "li" | "figure";
  delay?: number;
  className?: string;
  children: ReactNode;
};

/** Fades/slides its children in the first time they enter the viewport. */
export default function Reveal({ as = "div", delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
