import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        "nina-red": "#A52D58",
        "deep-red": "#4A1635",
        "nina-green": "#8E2457",
        "soft-green": "#E7B6C7",
        "warm-white": "#FFF7F2",
        gold: "#B58A45",
        champagne: "#E8D2B0",
        blush: "#B13D70",
        petal: "#E7B6C7",
        lilac: "#E7B6C7",
        cream: "#FFF7F2",
        cocoa: "#301525",
        plum: "#6C294C",
        mint: "#E8D2B0",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(74, 22, 53, 0.16)",
        button: "0 12px 24px rgba(142, 36, 87, 0.24)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
