module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          50: '#7d7d7d',
          100: '#0086D633',
          200: '#00436B',
          300: '#0086D6',
        },
        'yellow': {
          100: '#FCE100',
        },
        'orange': {
          100: '#E79A00',
          200: '#DA6E00',
        },
      },
    }
  },
  plugins: [],
}
