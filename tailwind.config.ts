import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      'sans': ['Roboto', 'arial', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Roboto"'],
    },
    colors: {
      black: {
        base: "#000000",
        opacity80: "rgba(0, 0, 0, 0.08)",
      },
      white: "#ffffff",
      red: "#bb0e4b",
      yellow: "#ffbf00",
      blue: {
        "1": "#13c1cc",
        "2": "#11b0ba",
      },
      text: {
        graffiti: '#6d6e71',
        red: "#bb0e4b",
        yellow: "#ffbf00",
        blue: {
          "1": "#13c1cc",
          "2": "#11b0ba",
        },
      },
      grayBorder: {
        light: '#9d9d9d',
        medium: '#9b999b',
      },
      grayBG: {
        light: '#f6f6f6',
        medium: '#d1d1d1',
        heavy: "#B2B2B2",
        heavier: "#D9D9D9",
      },
    },
  },
};
