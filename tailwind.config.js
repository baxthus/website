/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        custom: ['JetBrains Mono', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
