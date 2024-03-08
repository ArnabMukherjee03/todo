/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        primary: ['EB Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}