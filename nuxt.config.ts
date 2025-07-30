// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/global.css', '~/assets/css/responsive.css'],
  vite: {
    server: {
      fs: {
        strict: false
      }
    },
    ssr: {
      noExternal: ['@vueup/vue-quill']
    }
  },
  tailwindcss: {
    config: {
      darkMode: 'class',
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue'
      ]
    }
  },
});
