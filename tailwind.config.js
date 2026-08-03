/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "480px",
      },
      colors: {
        ivory: { DEFAULT: "#FAF7F1", 2: "#F2ECDF" },
        sapphire: { DEFAULT: "#14213D", 2: "#1E3054" },
        amethyst: { DEFAULT: "#6E3AA8", light: "#9A6BD1" },
        emerald: { DEFAULT: "#1F7A5C" },
        ruby: { DEFAULT: "#A8203D" },
        gold: { DEFAULT: "#C6A15B", light: "#E4C989" },
        ink: "#1B1B1F",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        lux: "0 24px 60px -20px rgba(20,33,61,0.35)",
      },
    },
  },
  plugins: [],
};
