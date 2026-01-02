import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class", // dark mode class-based
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"], // light & dark themes
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary1: '#1E40AF', // blue
        primary2: '#F59E0B', // yellow/orange
        primary3: '#10B981', // green
        neutral: {
          100: '#F3F4F6', // light gray
          500: '#6B7280', // medium gray
          900: '#111827', // dark gray
        },
      },
    },
  },
  plugins: [],
};
