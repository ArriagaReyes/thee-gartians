/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/success.html",
    "./src/**/*.{js,html}"
  ],
  theme: {
    extend: {
        fontFamily: {
            'display': ["Basment", "sans-serif"]
        }
    },
  },
  plugins: [],
}

