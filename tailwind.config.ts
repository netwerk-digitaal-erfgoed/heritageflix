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
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gridRowStart: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
      },
      gridRowEnd: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12'
      },
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
