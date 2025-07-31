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
      apiBase: process.env.BASE_URL || 'http://vilaw.net.vn/api/v1'
    }
  },
  
  // Nitro config for proxy
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.BASE_URL || 'http://vilaw.net.vn/api/v1',
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
