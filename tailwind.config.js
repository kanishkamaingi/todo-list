/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
    theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

