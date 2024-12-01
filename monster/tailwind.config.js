/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-50': "#f6f6f6",
        'gray-100': "#e7e7e7",
        'gray-200': "#d1d1d1",
        'gray-300': "#b0b0b0",
        'gray-400': "#888888",
        'gray-500': "#6d6d6d",
        'gray-600': "#5d5d5d",
        'gray-700': "#4f4f4f",
        'gray-800': "#454545",
        'gray-900': "#3d3d3d",
      },
    },
  },
  plugins: [],
}

