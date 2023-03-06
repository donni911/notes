/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#9AE6B4",
        secondary: "#2E382E",
        accent: "#C6F6D5",
        body: "#A0AEC0",
        article: "#ffebb2",
        muted: "#CBD5E0",
        "body-inner": "#EDF2F7",
        "text-color": "#1A202C",

        "body-dark": "#2E4F4F",
        "body-dark-inner": "#2C3333",
        "body-dark-side": "#0E8388",
        "dark-text": "#CBE4DE",
        "dark-input": "#e4e4e4",

        error: "#cc3300",
        warning: "#fa9967",
        success: "#41b883",
      },

      fontFamily: {
        sans: "Ubuntu, sans-serif",
      },

      screens: {
        betterhover: { raw: "(hover: hover)" },

        "-2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        "-xl": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        "-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }

        "-sm": { max: "575px" },
        // => @media (max-width: 575px) { ... }

        sm: "576px",
        // => @media (min-width: 576px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
};
