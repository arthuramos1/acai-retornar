/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '375px',
      'md': '768px',
      'desktop': '1280px'
    }
  },
  plugins: [],
};
