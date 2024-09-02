/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      monsterrat: ['"Montserrat"'],
    },
    scrollbar: {
      thin: {
        width: "8px",
        track: "#1b1b1b",
        thumb: "#6c6c6c",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
