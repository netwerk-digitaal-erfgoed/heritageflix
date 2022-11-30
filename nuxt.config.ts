import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/transitions.scss'
  ],
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  vite: {
    plugins: [svgLoader()]
  },
  googleFonts: {
    families: {
      Roboto: true,
      Poppins: true
    }
  }
});
