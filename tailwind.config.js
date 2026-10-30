/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B3D91",
          dark: "#082B66",
          light: "#2563EB",
        },
        secondary: {
          DEFAULT: "#FFD600",
          dark: "#E6C000",
          light: "#FFEB66",
        },
        accent: {
          DEFAULT: "#E11D2E",
          dark: "#B91C2C",
          light: "#F87171",
        },
        neutral: {
          white: "#FFFFFF",
          light: "#F8FAFC",
          DEFAULT: "#1F2937",
          dark: "#111827",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        xxl: '1320px',
      },
    },
  },
  plugins: [],
}

