/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{hbs,html,js}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        azureish: '#d9e7ff',
        nyanza: '#e3ffe7',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
