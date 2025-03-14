/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}', 
    "./src/App.css",
    "./src/index.css",
  ],
  darkMode: 'class', // Enable class-based dark mode toggle
  theme: {
    
    extend: {
      colors: {
        // Light Mode Colors
        'light-bg': '#F8FAFC',
        'light-sidebar': '#FFFFFF',
        'light-primary': '#007BFF',
        'light-secondary': '#FFB300',
        'light-card': '#FFFFFF',
        'light-border': '#E2E8F0',
        'light-font': '#1E293B',
        'light-subtext': '#4B5563',
        'light-muted': '#9CA3AF',
        'light-accent': '#007BFF',

        // Dark Mode Colors
        'dark-bg': '#0F172A',
        'dark-sidebar': '#1E293B',
        'dark-primary': '#1E88E5',
        'dark-secondary': '#FFC107',
        'dark-card': '#1E293B',
        'dark-border': '#334155',
        'dark-font': '#E0E0E0',
        'dark-subtext': '#9CA3AF',
        'dark-muted': '#4B5563',
        'dark-accent': '#1E88E5',

        // Gradient Colors
        'gradient-primary': 'linear-gradient(90deg, #1E88E5, #1565C0)',
        'gradient-secondary': 'linear-gradient(90deg, #007BFF, #005BB5)',
        'gradient-light': 'linear-gradient(135deg, #F8FAFC, #E2E8F0)',
        'gradient-dark': 'linear-gradient(135deg, #1E293B, #0F172A)',
      },
      fontFamily: {
        // Font Family
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      screens: {
        'xs': '480px', 
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      container: {
        center: true,
        padding: {
          default: '1rem',
        },
      },
    },
  },
  plugins: [
 
  ],
}