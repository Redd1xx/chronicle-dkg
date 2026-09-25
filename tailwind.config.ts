import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["'Geist'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        cinzel: ["'Cinzel'", "serif"],
        heading: ["'Geist'", "sans-serif"],
        sans: ["'Geist'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "carousel-left": "carousel-left 45s linear infinite",
        "carousel-right": "carousel-right 45s linear infinite",
      },
      keyframes: {
        "carousel-left": {
          "0%": { transform: "translate3d(0%, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        "carousel-right": {
          "0%": { transform: "translate3d(-50%, 0, 0)" },
          "100%": { transform: "translate3d(0%, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
