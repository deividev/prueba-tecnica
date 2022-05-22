module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    flexGrow: {
      '2': 2
    },
    minWidth: {
      '0': '0',
      '100': '100px',
      '200': '200px',
      '300': '300px',
      '1/4': '25%',
      '1/3': '30%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    // screens: {
    //   'sm': {'min': '0px', 'max': '767px'},
    //   'md': {'min': '768px', 'max': '1023px'},
    //   'lg': {'min': '1224px' },
    // },
    extend: {},
  },
  plugins: [],
}
