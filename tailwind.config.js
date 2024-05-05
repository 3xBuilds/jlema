/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        19: "repeat(19, minmax(0, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        secondary: "#F6F6F6",
        gray: "#545454",
        jel: {
          black: "#000000",
          gray: {
            1: "#F6F6F6",
            2: "#EEEEEE",
            3: "#E2E2E2",
            4: "#545454",
          },
          white: "#FFFFFF"
        }
      },
      boxShadow: {
          "jel-card": "2px 2px 4px 0px #0000001A",
          "jel-badge": "0px 0px 25px 0px #0000001A",
          "jel-nft": "0px 0px 25px 0px #0000001A",
          "jel-dropdown": "0px 0px 15px 0px #0000001A"

      }
    },
  },
  plugins: [],
};
