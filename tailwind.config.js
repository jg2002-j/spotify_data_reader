/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Use class-based dark mode
  theme: {
    fontFamily: {
      sans: ["Cabinet Grotesk"],
    },
    extend: {
      colors: {
        spotify_green: "#1ED760", // Add the custom Spotify green color
        spotify_black: "#121212", // Add the custom Spotify black color
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
