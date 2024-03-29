/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '460px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1612px',
    },
    extend: {
      colors: {
        // add colors
        primary: '#1774FF',
        'primary-light': '#2563eb',
        secondary: '#353535',
        black: '#090909',
        white: '#FFFFFF',
        'light-gray': '#A9A9A9',
        landing: '#040309',
        cyan: '#1FCFF1',
        yellow: '#F9D413',
        purple: '#8F2DBD',
        default: '#000000',
        layout: '#040a0f',
        drawer: '#011018',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
        custom1: ['CustomFontOne', 'sans-serif'],
        custom2: ['CustomFontTwo', 'serif'],
        // Add as many custom fonts as needed
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(var(--mt))' }, // Using CSS variables
        },
      },
      animation: {
        slide: 'slide 10s ease-in-out forwards', // Define the total animation time here
      },
    },
  },
  plugins: [],
};
