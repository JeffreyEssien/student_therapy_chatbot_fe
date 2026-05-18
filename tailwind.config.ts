import type { Config } from "tailwindcss";

export default {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FDFDFD",
        ink: "#0A0A0A",
        smoke: "#F2F0EC",
        ash: "#A8A29E",
        emerald: {
          DEFAULT: "#1F4D3F",
          deep: "#143028",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        editorial: "-0.02em",
        caps: "0.14em",
      },
      transitionTimingFunction: {
        liquid: "cubic-bezier(0.16, 1, 0.3, 1)",
        weighted: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      fontSize: {
        display: ["clamp(2.5rem, 7vw + 1rem, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        eyebrow: ["0.72rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
