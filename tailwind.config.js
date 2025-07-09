/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/App.css",
    "./src/index.css",
  ],
  darkMode: "class", // Enable class-based dark mode toggle
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        subSurface: "var(--subSurface)",
        border: "var(--border)",
        inputBorder: "var(--inputBorder)",
        font: "var(--font)",
        subtext: "var(--subtext)",
        muted: "var(--muted)",
        primary: "var(--primary)",
        primaryHover: "var(--primaryHover)",
        secondary: "var(--secondary)",
        disabledText: "var(--disabledText)",
        toastSuccessBg: "var(--toastSuccessBg)",
        toastSuccessText: "var(--toastSuccessText)",
        toastErrorBg: "var(--toastErrorBg)",
        toastErrorText: "var(--toastErrorText)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-bg": "var(--gradient-bg)",
        "gradientN-bg": "var(--gradientN-bg)",
      },
      fontFamily: {
        // Font Family
        inter: ["Inter", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      container: {
        center: true,
        padding: {
          default: "15px",
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
