import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        "nina-red": "#B94A5A",
        "deep-red": "#8F263D",
        "nina-green": "#3F5A45",
        "soft-green": "#DCE6D8",
        "warm-white": "#FFF9F2",
        blush: "#B94A5A",
        petal: "#F4DEE0",
        lilac: "#DCE6D8",
        cream: "#F5EBDD",
        cocoa: "#352A27",
        plum: "#725951",
        mint: "#DCE6D8",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(77, 53, 43, 0.14)",
        button: "0 12px 24px rgba(143, 38, 61, 0.22)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
