import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    colors: {
      'black': '#000000',
      'gray': '#2E2E2E',
      'white': '#FFFFFF',
      'blue': '#F2F5FF'
    },
    fontFamily: {
      poppins: ['Poppins'],
    },
    container: {
      center: true,
      padding: '0.75rem',
    },
    extend: {
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'base': ['1rem', '1.43'],
        'xl': ['1.25rem', '1'],
        '2xl': ['1.5rem', '1.25'],
        '3xl': ['2rem', '1.25'],
        '4xl': ['2.5rem', '1.25'],
        '5xl': ['2.625rem', '1.25'],
      },
      screens: {
        'sm': '576px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
      },
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /^grid-cols-/
    }
  ]
}
