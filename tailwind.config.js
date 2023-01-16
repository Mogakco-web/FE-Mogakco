module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      sky: '#00a8ff',
      dullSky: '#0097e6',
      purple: '#9c88ff',
      dullPurple: '#8c7ae6',
      yellow: '#fbc531',
      dullYellow: '#e1b12c',
      green: '#4cd137',
      dullGreen: '#44bd32',
      blue: '#487eb0',
      dullBlue: '#40739e',
      red: '#e84118',
      dullRed: '#c23616',
      while: '#f5f6fa',
      dullWhite: '#dcdde1',
      grey: '#7f8fa6',
      dullGrey: '#718093',
      navy: '#273c75',
      dullNavy: '#192a56',
      night: '#353b48',
      dullNight: '#2f3640',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
