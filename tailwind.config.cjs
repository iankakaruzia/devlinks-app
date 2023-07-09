// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-instrument)", ...fontFamily.sans],
      },
      boxShadow: {
        sm: "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
      },
      colors: {
        red: {
          500: "#FF3939",
        },
        gray: {
          50: "#FAFAFA",
          300: "#D9D9D9",
          700: "#737373",
          900: "#333333",
        },
        purple: {
          100: "#EFEBFF",
          300: "#BEADFF",
          600: "#633CFF",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
