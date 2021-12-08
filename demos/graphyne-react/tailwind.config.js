module.exports = {
  purge: ["./src/**/*.{html,tsx}"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },

    extend: {
      zIndex: {
        n10: -10,
      },
    },
  },
};
