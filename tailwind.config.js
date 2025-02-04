/** @type {import('tailwindcss').Config} */
export default {
  content: ["./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // This helps avoid conflicts with the consuming app
  },
};
