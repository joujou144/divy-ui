/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // reference the lib only
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          shade: {
            100: "#daeeff",
            200: "#bee1ff",
            300: "#7ac6ff",
            400: "#5db5fd",
            500: "#3794fa",
            600: "#2177ef",
            700: "#195fdc",
            800: "#1b4eb2",
          },
        },
        gray: {
          tint: {
            100: "#F7F7F7",
            200: "#E4E4E4",
            300: "#D9D9D9",
            400: "#9E9E9E",
            500: "#6D6D6D",
            600: "#3A3A3A", // default
            700: "#0D0D0D",
          },
        },
        purple: {
          tint: {
            100: "#EDDFF9",
            200: "#DAC6FB", // default
          },
        },
        red: {
          DEFAULT: "#DE3C3C",
          tint: {
            100: "#FCECEC",
            200: "#F8D8D8",
            300: "#F5C5C5",
            400: "#F2B1B1",
            500: "#EF9E9E",
            600: "#EB8A8A",
            700: "#E87777",
            800: "#E56363",
            900: "#E15050",
          },
          shade: {
            100: "#C83636",
            200: "#B23030",
            300: "#9B2A2A",
            400: "#852424",
            500: "#7A6A2F",
            600: "#615426",
            700: "#493F1C",
            800: "#312A13",
            900: "#181509",
          },
        },
        green: {
          regular: "#029C54", // default
          light: "#DCFAE8",
          dark: "#207040",
          tint: {
            100: "#EEF8F2",
            200: "#DDF0E5",
            300: "#CCE9D8",
            400: "#BBE1CB",
            500: "#ABDABE",
            600: "#9AD3B0",
            700: "#89CBA3",
            800: "#78C496",
            900: "#67BC89",
          },
          shade: {
            100: "#d7ffd8",
            200: "#b1ffb3",
            300: "#74ff79",
            400: "#31f737",
            500: "#06e10e",
            600: "#00bb06",
            700: "#039209",
            800: "#08730e",
          },
        },
        orange: {
          tint: {
            300: "#FF6F4F", // default
          },
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
};
