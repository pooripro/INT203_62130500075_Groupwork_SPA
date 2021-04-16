const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brownycolors: '#D4C8BE', //[WhoRU] bg-color ,[Home & About] navbar-color, [Home] edit 
        cosmiclatte: '#FFF8EA', //[WhoRU] text-color ,[Home & About] text-navbar, bg-color
        carribeangreen: '#00CCA5' //[Home] checked
      },
      fontFamily: {
        chewy: ['Chewy']
      }
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
