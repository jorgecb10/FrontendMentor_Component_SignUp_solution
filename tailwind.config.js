/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'red-pink': 'hsl(0, 100%, 74%)',
        'green-hsl': 'hsl(154, 59%, 51%)',
        'green-hsla': 'hsla(154, 59%, 51%, 0.8)',
        'blue-hsl': 'hsl(248, 32%, 49%)',
        'dark-blue': 'hsl(249, 10%, 26%)',
        'grayish-blue': 'hsl(246, 25%, 77%)',
      },
      fontFamily: {
        'body': ['Popins', 'sans-serif'],
      },
      boxShadow: {
        'sombra': '0px 10px 0px 0px hsla(249, 10%, 26%, 0.2)',
      }
    },
  },
  plugins: [],
}

