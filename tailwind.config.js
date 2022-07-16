const tw = require('tailwindcss/defaultConfig');
const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
      },

      maxWidth: {
        ...tw.theme.spacing,
      },
    },
  },

  plugins: [],

  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
