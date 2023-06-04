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
      redCadabra: "#bb0e4b",
      yellowCadabra: "#ffbf00",
      blueCadabra: "#13c1cc",
      gray: {
        "1": "#9d9d9d",
        "2": "#9b999b",
        "3": "#6d6e71",
        "4": "#B2B2B2",
        "5": "#D9D9D9",
      },
    },
  },
};
