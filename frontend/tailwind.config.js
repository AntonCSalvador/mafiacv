/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path according to your file structure
    './node_modules/@mantine/core/**/*.js', // To include Mantine components if needed
    './node_modules/@mantine/hooks/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        mafiaBlack: {
          default: "#1D1F27",
        },
        mafiaRed: {
          default: "#E94560",
        },
        mafiaGreen: {
          default: "#3E8E7E",
        },
      },
    },
  },
  plugins: [],
};

