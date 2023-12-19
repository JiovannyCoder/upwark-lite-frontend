/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
        colors: {
            primary: "rgb(16, 185, 129)"
        }
    },
  },
  plugins: [],
}

