/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // Default untuk body
        poppins: ['Poppins', 'sans-serif'], // Tambahkan kelas font-poppins
      },
    },
  },
};


