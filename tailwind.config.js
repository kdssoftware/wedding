module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg': "url('/img/bg.jpeg')",
      },
      fontFamily: {
        'default': ['"Caveat"', 'cursive'],
        'datum': ['"Cormorant Garamond"', 'cursive'],
        'soon': ['"Italianno"', 'cursive'],
        'test': ['"League Script"', 'cursive'],
        'head': ['"Ms Madi"', 'cursive'],
      },
      fontSize: {
        'maxxl': '12rem',
    },
    },
  },
  plugins: [],
}