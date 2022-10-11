import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '~/assets/scss/main.scss',
    '@/assets/scss/transitions.scss'
  ],
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  vite: {
    build: {
      target: 'es2020'
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
          })
        ],
        target: 'es2020'
      }
    },
    plugins: [svgLoader()],
    resolve: {
      alias: {
        util: 'rollup-plugin-node-polyfills/polyfills/util',
      }
    }
  },
  googleFonts: {
    families: {
      Roboto: true,
      Poppins: true
    }
  }
});
