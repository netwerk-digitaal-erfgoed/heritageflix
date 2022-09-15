import { Config } from 'tailwindcss'
export default <Config> {
  content: [],
  theme: {
    colors: {
      'black': '#000000',
      'gray': '#2E2E2E',
      'white': '#FFFFFF',
      'blue': '#F2F5FF'
    },
    container: {
      center: true,
      padding: '0.75rem',
    },
    extend: {
      screens: {
        'sm': '576px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
      },
    }
  },
  plugins: []
}
