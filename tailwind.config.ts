import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        blush: "#ff8fb8",
        petal: "#ffd8e8",
        lilac: "#d8c5ff",
        cream: "#fff6e9",
        cocoa: "#513b4c",
        plum: "#7e5a76",
        mint: "#bde8da",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(126, 90, 118, 0.18)",
        button: "0 12px 24px rgba(255, 143, 184, 0.28)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
