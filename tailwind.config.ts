import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#081114",
          900: "#081114",
          800: "#0d1a1e",
          700: "#13252a",
          600: "#1d3439",
        },
        ivory: {
          DEFAULT: "#f7f6f2",
          100: "#fbfaf7",
          200: "#efede6",
          300: "#e4e1d8",
        },
        mint: "#65d2a5",
        aqua: "#2fbcd8",
        stone: {
          500: "#6f7a7c",
          600: "#51595b",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "76rem",
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      boxShadow: {
        lux: "0 1px 0 rgba(255,255,255,.6) inset, 0 20px 50px -24px rgba(8,17,20,.28), 0 2px 6px -2px rgba(8,17,20,.08)",
        glow: "0 0 0 1px rgba(101,210,165,.25), 0 10px 40px -10px rgba(47,188,216,.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;
