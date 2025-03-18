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
        sidebar: "var(--sidebar)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        card: "var(--card)",
        border: "var(--border)",
        font: "var(--font)",
        subtext: "var(--subtext)",
        muted: "var(--muted)",
        accent: "var(--accent)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-bg": "var(--gradient-bg)",
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
          default: "1rem",
        },
      },
    },
  },
  plugins: [],
};
