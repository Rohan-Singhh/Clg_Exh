/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'cyber': {
            'primary': '#0ff',
            'secondary': '#f0f',
            'accent': '#ff0',
            'dark': '#0a0a0f',
            'light': '#e0e0ff',
          },
          'neon': {
            'blue': '#00f2ff',
            'pink': '#ff00ff',
            'purple': '#b000ff',
            'yellow': '#ffee00',
          },
        },
        boxShadow: {
          'neon': '0 0 5px #0ff, 0 0 20px #0ff', // Directly using color values
          'neon-strong': '0 0 10px #0ff, 0 0 30px #0ff, 0 0 50px #0ff',
        },
        backgroundImage: {
          'cyber-grid': 'linear-gradient(to right, #0ff 1px, transparent 1px), linear-gradient(to bottom, #0ff 1px, transparent 1px)',
        },
        animation: {
          'glow': 'glow 2s ease-in-out infinite alternate',
          'float': 'float 6s ease-in-out infinite',
        },
        keyframes: {
          glow: {
            '0%': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff' },
            '100%': { textShadow: '0 0 20px #fff, 0 0 30px #00f2ff, 0 0 40px #00f2ff' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
  