/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        friking: {
          red: '#E11D48',
          yellow: '#FACC15',
          black: '#0B0B0F',
          charcoal: '#14141B',
          cream: '#FFF7E6',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(250, 204, 21, 0.25), 0 10px 30px rgba(225, 29, 72, 0.18)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(1200px 600px at 20% 10%, rgba(225,29,72,.35), transparent 60%), radial-gradient(800px 500px at 85% 20%, rgba(250,204,21,.25), transparent 55%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
