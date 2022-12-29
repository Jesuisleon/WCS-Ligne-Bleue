/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    color: {
      black: "#3c3c3c",
      grey: "#4A4A4A",
      grey10: "#f7f7f7",
      white: "#FFFFFF",
      red: "#ce5353",
      blue: "#4962be",
      blue10: "#3B6CC8",
      yellow: "#ffc928",
    },
    fontFamily: {
      body: ["Roboto", "sans-serif"],
      button: ["Roboto", "sans-serif"],
      title: ["Montserrat", "Arial", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
