import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        "nina-red": "#C6284A",
        "deep-red": "#8E1B3D",
        "nina-green": "#3F7D58",
        "soft-green": "#DCEBDD",
        "warm-white": "#FFFDF9",
        blush: "#C6284A",
        petal: "#F9E1E7",
        lilac: "#DCEBDD",
        cream: "#FFFDF9",
        cocoa: "#3B2630",
        plum: "#704354",
        mint: "#DCEBDD",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(91, 43, 59, 0.14)",
        button: "0 12px 24px rgba(198, 40, 74, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
