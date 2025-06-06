/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // reference the lib only
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: "class",
    extend: {
      fontSize: {
        default: "0.95rem",
      },
      colors: {
        azure: {
          100: "#daeeff",
          200: "#bee1ff",
          300: "#7ac6ff",
          400: "#5db5fd",
          500: "#3794fa",
          600: "#2177ef", // default
          700: "#195fdc",
          800: "#1b4eb2",
        },
        purple: {
          tint: {
            100: "#EDDFF9",
            200: "#DAC6FB", // default
          },
        },
        leaf: {
          100: "#d5ffe8",
          200: "#aeffd1",
          250: "#bbf9b9",
          300: "#5cec8b",
          350: "#62e693",
          400: "#00e764",
          500: "#1ec956",
          550: "#0fd863",
          600: "#00c14f",
          700: "#009741",
          800: "#057637",
        },
        brick: {
          50: "#fdf4f3",
          100: "#fbdeda",
          200: "#fad3ce",
          300: "#fca5aa",
          400: "#ef887a",
          500: "#e36250",
          600: "#cf4633",
          700: "#ae3727",
          900: "#79153a",
        },
      },
      animation: {
        backdropEnter: "backdropEnter 0.3s ease",
        backdropExit: "backdropExit 0.3s ease-in forwards",
        fadeOut: "fadeOut 0.3s ease-out forwards",
        fadeIn: "fadeIn 0.3s ease-in forwards",
      },
      keyframes: {
        backdropEnter: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        backdropExit: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        fadeOut: {
          "0%": {
            opacity: 0,
            transform: "translateY(1rem) scale(0.95)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(1rem) scale(0.95)",
          },
        },
      },
    },
  },
  plugins: [],
  important: true,
};
