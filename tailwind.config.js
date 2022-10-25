/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#31255a",
          secondary: "#ffe963",
          accent: "#ff6d6d",
          neutral: "#1F2937",
          "neutral-content": "#1F2937",
          "primary-content": "#ffffff",
          "secondary-content": "#ffffff",
          "accent-content": "#163835",
          "base-100": "#ffffff",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1f2937",
        },
      },
    ],
  },
}
