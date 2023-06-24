/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        Outfit: ['"Outfit"', ...defaultTheme.fontFamily.Outfit]
      }
    },
  },
  plugins: [],
}

