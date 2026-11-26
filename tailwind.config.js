/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#102355',
          dark: '#0A1638',
          light: '#1B367A',
        },
        gold: {
          DEFAULT: '#D2A058',
          bronze: '#B88346',
          soft: '#EFE4D0',
        },
        cream: '#FAF8F4',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
