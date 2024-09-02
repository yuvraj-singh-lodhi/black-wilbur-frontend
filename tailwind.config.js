/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'custom': '73.8px',
      },
      lineHeight: {
        'custom': '77px',
      },
      colors: {
        'custom-gray': '#393939',
      },
      width: {
        'custom-width-product': '570px',
      },
      height: {
        'custom-height-product': '655px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          'overflow': 'hidden',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      }, ['responsive', 'hover']);
    },
  ],
};
