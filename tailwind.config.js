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
        'font1': ['Caveat', 'cursive'],
        'font2': ['Cormorant Garamond', 'cursive'],
        'font3': ['Italianno', 'cursive'],
        'font4': ['League Script', 'cursive'],
        'font5': ['Ms Madi', 'cursive'],
      },
      fontSize: {
        'maxxl': '12rem',
    },
    },
  },
  plugins: [],
}