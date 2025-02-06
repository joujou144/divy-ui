/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // reference the lib only
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
            100: "#4DA370",
            200: "#459163",
            300: "#3C7F57",
            400: "#346D4A",
            500: "#2B5B3E",
            600: "#224832",
            700: "#1A3625",
            800: "#112419",
            900: "#09120C",
          },
        },
        orange: {
          tint: {
            300: "#FF6F4F", // default
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 300ms ease-in-out",
        fadeOut: "fadeOut 300ms ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
            visibility: "hidden",
            transform: "translateY(2rem)",
          },
          "100%": {
            opacity: 1,
            visibility: "visible",
            transform: "translateY(0)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: 1,
            visibility: "visible",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 0,
            visibility: "hidden",
            transform: "translateY(2rem)",
          },
        },
      },
    },
  },
  plugins: [],
};
