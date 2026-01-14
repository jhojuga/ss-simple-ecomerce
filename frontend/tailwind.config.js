/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ps5-blue': '#003087',
        'xbox-green': '#107C10',
        'switch-red': '#E60012',
      }
    },
  },
  plugins: [],
}
