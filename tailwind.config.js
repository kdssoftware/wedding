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
        'default': ['"Caveat"', 'cursive']
      }
    },
  },
  plugins: [],
}