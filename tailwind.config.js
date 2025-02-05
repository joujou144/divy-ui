/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // reference the lib only
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#3A3A3A",
          light: "#6D6D6D",
          lighter: "#9E9E9E",
          dark: "#0D0D0D",
        },
        blue: {
          DEFAULT: "#256FF2",
          light: "#E9F1FE",
          lighter: "#F6F9FF",
        },
        purple: {
          DEFAULT: "#8E48E7",
          light: "#EDDFF9",
        },
        green: {
          DEFAULT: "#3AA03E",
          light: "#DDF6DE",
          dark: "#CCE9D8",
        },
        brown: {
          DEFAULT: "#89652E",
          light: "#FFEDD1",
        },
        teal: {
          DEFAULT: "#1F8FA7",
          light: "#D1F7FF",
        },
        gray: {
          dark: "#3A3A3A",
          DEFAULT: "#D9D9D9",
          light: "#E4E4E4",
          lighter: "#F7F7F7",
        },
        yellow: {
          DEFAULT: "#FFC337",
          dark: "#BB9B29",
          light: "#F9F2DB",
        },
        red: {
          light: "#FFDDDD",
          DEFAULT: "#DE3C3C",
          lighter: "#FCECEC",
          dark: "#C83636",
        },
        mint: {
          dark: "#3C7E56",
          DEFAULT: "#56B57C",
          light: "#88CBA3",
        },
        mustard: {
          DEFAULT: "#DABD54",
          light: "#F3D35E",
        },
        neutral: {
          DEFAULT: "#6D6D6D",
          light: "#E4E4E4",
          lighter: "#F7F7F7",
        },
        incident: {
          yellow: {
            DEFAULT: "#FFEDCB",
            dark: "#A77F32",
            darker: "#785A21",
          },
          red: {
            DEFAULT: "#FFDDD0",
            dark: "#7A3C25",
          },
          green: {
            DEFAULT: "#DCFAE8",
            dark: "#207040",
          },
          teal: {
            DEFAULT: "#D1F5FA",
            dark: "#165B63",
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
