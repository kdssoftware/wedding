module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "olive-100":"#F1FFE5",
        "olive-200":"#DFFAC8",
        "olive-300":"#bccfab",
        "olive-400":"#AABB9C",
        "olive-500":"#98A58D",
        "olive-600":"#86937C",
        "olive-700":"#74806A",
        "olive-800":"#606A57",
        "olive-900":"#3B4435",
      },
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