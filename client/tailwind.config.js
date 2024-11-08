const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        custom: "1456px",
      },
      width: {
        carousel_card_width: "184px"
      },
      height:{
        carousel_card_height: "260px"
      } ,
      colors: {
        red: {
          default: "#ff6666",
        },
        white: {
          primary: "#fff",
          secondary: "#eeeeee",
        },
        gray: {
          primary: "#333",
          secondary: "#222222",
        },
        green: {
          default: "#2d985b",
        },
      },
    },
  },
  plugins: [],
});
