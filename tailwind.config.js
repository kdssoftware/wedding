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
        'bg': "url('/img/bg-min.jpeg')",
      },
      fontFamily: {
        'font1': ['Caveat', 'cursive'],
        'font2': ['Cormorant Garamond', 'cursive'],
        'font3': ['Bentham', 'serif'],
        'font4': ['Gilda Display', 'serif'],
        'font5': ['Suravaram', 'serif'],
        'font6': ['Noto Serif JP', 'serif'],
        'font7': ['Junge', 'serif'],
        'font8': ['Baloo Tammudu 2', 'cursive'],
        'font9': ['Forum', 'cursive'],
        
        'symbol': ['Alex Brush','cursive'],
      },
      fontSize: {
        'maxxl': '12rem',
    },
    },
  },
  plugins: [],
}