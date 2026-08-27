import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFDF9",
        alabaster: "#F7F4EF",
        brown: {
          DEFAULT: "#3B2A20",
          deep: "#241108",
        },
        gold: {
          DEFAULT: "#C6A664",
          soft: "#E7D8B8",
        },
        charcoal: "#1A1A1A",
        taupe: "#6B6560",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -18px rgba(59,42,32,0.20)",
        lift: "0 22px 60px -22px rgba(59,42,32,0.30)",
        gold: "0 8px 30px -12px rgba(198,166,100,0.45)",
      },
      maxWidth: {
        shell: "1280px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        fadeUp: "fadeUp .6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
