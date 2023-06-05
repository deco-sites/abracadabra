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
      red: {
        base: "#bb0e4b",
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
        // light: '#d1d1d1',
        medium: "#B2B2B2",
        dark: "#9b999b",
        darker: "#9d9d9d",
      },
    },
  },
};
