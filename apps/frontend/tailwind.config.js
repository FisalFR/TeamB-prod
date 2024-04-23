//const defaultTheme = require("tailwindcss/defaultTheme");
//const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#012D5A',
        'bone-white': '#F1F1F1',
        'gold-yellow': '#F6BD38',
        'Ash-black': '#2F2F2F',
        'green-blue': '#0067B1',
        'white': '#FFFFFF',
        'bwh-cyan': '#009CA6',
        'light-white': '#FAFAFA',
        'graphite': '#212121',
      },
      fontFamily: {
        'HeadlandOne': ['Headland One', 'serif'],
        'OpenSans': ['Open Sans', 'sans-serif'],
        'Colfax': ["Colfax", "sans-serif"],
        'ProximaNova': ["Proxima Nova", "sans-serif"],
      },
      spacing: {
        'databasetable': '40rem',
        '100' : '26.15rem',
        '50': '12.29rem',
        '9': '2.4rem',
        'medicineFormHeight': '50rem',
        'medicineFormWidth': '45rem',
      }
    },
  },

  plugins: [
    addVariablesForColors,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

