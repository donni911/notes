/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#9AE6B4",
        secondary: "",
        accent: "#C6F6D5",
        body: "#A0AEC0",
        "body-inner": "#EDF2F7",
        text: "#1A202C",
      },
    },
  },
};
