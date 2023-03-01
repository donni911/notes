/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#9AE6B4",
        secondary: "#2E382E",
        accent: "#C6F6D5",
        body: "#A0AEC0",
        article: "#ffebb2",
        "body-inner": "#EDF2F7",
        "text-color": "#1A202C",
        "text-muted": "#CBD5E0",
      },
    },
  },
};
