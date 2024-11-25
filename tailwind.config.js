/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",

  theme: {
    // colors: {
    //   spotify_green: "1ED760",
    //   spotify_black: "121212",
    // },
    fontFamily: {
      sans: ["Inter"],
    },
    extend: {},
  },
  plugins: [],
};
