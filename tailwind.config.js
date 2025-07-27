/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        'dark-blue-elements': 'hsl(209, 23%, 22%)',
        'very-dark-blue-background': 'hsl(207, 26%, 17%)',
        'very-dark-blue-text': 'hsl(200, 15%, 8%)',
        'dark-gray-input': 'hsl(0, 0%, 52%)',
        'very-light-gray-background': 'hsl(0, 0%, 98%)',
        'white-elements': 'hsl(0, 0%, 100%)',
      }
    },
  },
  plugins: [],
}
