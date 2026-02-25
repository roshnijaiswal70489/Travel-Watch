/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00', // Orange Accent
        dark: '#0F0F10',    // Main Background
        card: '#1A1A1B',    // Card Background
        nav: '#131314',     // Navbar Background
      }
    },
  },
  plugins: [],
}

