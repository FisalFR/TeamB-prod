/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#012D5A',
        'bone-white': '#F1F1F1',
        'gold-yellow': '#F6BD38',
        'Ash-black': '#2F2F2F',
        'green-blue': '#0067B1',
        'white': '#FFFFFF'
      },
      fontFamily: {
        'HeadlandOne': ['Headland One', 'serif'],
        'OpenSans': ['Open Sans', 'sans-serif'],
      },
      spacing: {
        'databasetable': '47.2rem',
        '100' : '26.15rem',
        '50': '12.29rem',
        '9': '2.4rem',
      }
    },
  },
  plugins: [],
};

