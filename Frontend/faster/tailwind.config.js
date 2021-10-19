module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        headercolor: '#c3d3e0',
        buttoncolor: '#5dd3e8', 
        buttonclick: '#f9cb9c',
        bordercl: '#6a885e',
        bordertable: '#0b5394',
        tablecolor: '#f6b26b',
        tableblue: '#6fa8dc',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}