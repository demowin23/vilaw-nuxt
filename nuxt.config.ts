// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/global.css', '~/assets/css/responsive.css'],
  
  // Runtime config for API
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://14.225.17.139:4000'
    }
  },
  
  // Nitro config for proxy
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://14.225.17.139:4000',
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
  
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
