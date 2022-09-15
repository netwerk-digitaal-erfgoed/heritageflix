import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: [
    '@/assets/scss/transitions.scss'
  ],
  vite: {
    plugins: [svgLoader()]
  }
});
