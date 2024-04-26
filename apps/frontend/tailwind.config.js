/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: theme => ({
        'fade-bottom': 'linear-gradient(to bottom, transparent, black)',
      }),

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
        'delete-button': '#7EBAE6',
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
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    addVariablesForColors,
    require("tailwindcss-animate"),
    require('@tailwindcss/postcss7-compat'),
    function ({addUtilities}) {
      const newUtilities = {
        '.mask-gradient': {
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }
      }
      addUtilities(newUtilities)
    }
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
