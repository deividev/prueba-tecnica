module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    minWidth: {
      '0': '0',
      '100': '100px',
      '200': '200px',
      '300': '300px',
      '1/2': '50%',
      'full': '100%',
    },
    screens: {
      'sm': {'min': '0px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1224px' },
    },
    extend: {},
  },
  plugins: [],
}
