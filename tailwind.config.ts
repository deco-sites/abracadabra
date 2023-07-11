import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    colors: {
      black: {
        base: "#000000",
        opacity80: "rgba(0, 0, 0, 0.08)",
      },
      white: "#ffffff",
      rosybrown: "#bc7cb2",
      "dark-gray": "#afafaf",
      gainsboro: "#E5E5E5",
      gold: "#ffd700",
      silver: "#C0C0C0",
      cyan: {
        dark: "#049091",
      },
      red: {
        base: "#bb0e4b",
        medium: "#C72144",
      },
      yellow: {
        base: "#ffbf00",
      },
      blue: {
        base: "#13c1cc",
        hover: "#11b0ba",
      },
      gray: {
        base: "#6d6e71",
        lighter: "#f6f6f6",
        light: "#D9D9D9",
        medium: "#B2B2B2",
        dark: "#9b999b",
        darker: "#9d9d9d",
      },
    },
  },
};
