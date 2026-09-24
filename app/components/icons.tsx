import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 18,
  height: 18,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ArrowLeft = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);
export const ChevronDown = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const Copy = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </svg>
);
export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);
export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}>
    <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6" />
  </svg>
);
export const Linkedin = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
export const Github = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden {...p}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
  </svg>
);
export const Upwork = (p: P) => (
  <svg viewBox="0 0 32 24" width={20} height={16} fill="currentColor" aria-hidden {...p}>
    <path d="M24.74 2.52c-3.43.01-6.03 2.28-7.01 5.9-1.64-2.52-2.92-5.4-3.65-7.84l-3.61.02.05 9.57a3.43 3.43 0 0 1-6.86.03L3.61.63 0 .65l.05 9.57A7.1 7.1 0 0 0 7.12 17.3a7.1 7.1 0 0 0 7-7.16l-.01-1.62c.73 1.44 1.64 2.97 2.64 4.32l-2.2 10.57h3.7l1.59-7.68a8.9 8.9 0 0 0 4.97 1.42A7.3 7.3 0 0 0 32 9.7a7.24 7.24 0 0 0-7.26-7.19Zm.06 10.92a6.7 6.7 0 0 1-4.07-1.6l.35-1.46v-.1c.27-1.53 1.07-4.15 3.77-4.16a3.6 3.6 0 0 1 3.63 3.6 3.72 3.72 0 0 1-3.68 3.72Z" />
  </svg>
);
export const Quote = (p: P) => (
  <svg viewBox="0 0 36 35" width={36} height={35} fill="currentColor" aria-hidden {...p}>
    <path d="M32.625 17.5H27v-5c0-2.758 2.018-5 4.5-5h.563c.935 0 1.687-.836 1.687-1.875v-3.75C33.75.836 32.998 0 32.062 0H31.5c-6.216 0-11.25 5.594-11.25 12.5v18.75c0 2.07 1.512 3.75 3.375 3.75h9c1.863 0 3.375-1.68 3.375-3.75v-10c0-2.07-1.512-3.75-3.375-3.75Zm-20.25 0H6.75v-5c0-2.758 2.018-5 4.5-5h.563c.935 0 1.687-.836 1.687-1.875v-3.75C13.5.836 12.748 0 11.812 0H11.25C5.034 0 0 5.594 0 12.5v18.75C0 33.32 1.512 35 3.375 35h9c1.863 0 3.375-1.68 3.375-3.75v-10c0-2.07-1.512-3.75-3.375-3.75Z" />
  </svg>
);
