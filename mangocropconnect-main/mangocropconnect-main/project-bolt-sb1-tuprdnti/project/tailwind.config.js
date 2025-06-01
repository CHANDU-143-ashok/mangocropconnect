/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mango: {
          50: '#fff9eb',
          100: '#ffefc2',
          200: '#ffe094',
          300: '#ffd066',
          400: '#ffc038',
          500: '#ffb01a', // primary mango color
          600: '#e69000',
          700: '#b36e00',
          800: '#804d00',
          900: '#4d2d00',
        },
        leaf: {
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#b8e1b8',
          300: '#94d294',
          400: '#70c370',
          500: '#4caf4c', // primary leaf color
          600: '#3e8c3e',
          700: '#306930',
          800: '#224622',
          900: '#142314',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};