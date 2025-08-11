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
      apiBase: process.env.BASE_URL || 'https://vilaw.net.vn/api/v1'
    },
    // SSL configuration
    ssl: {
      key: process.env.SSL_KEY_PATH || '/etc/ssl/private/vilaw.key',
      cert: process.env.SSL_CERT_PATH || '/etc/ssl/certs/vilaw.crt',
      ca: process.env.SSL_CA_PATH || null
    }
  },
  
  // Nitro config for proxy
  nitro: {
    devProxy: {
      '/api/v1': {
        target: process.env.BASE_URL || 'https://vilaw.net.vn/api/v1',
        changeOrigin: true,
        prependPath: false,
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
  // Removed incorrect isCustomElement config that treated RouterLink as a custom element
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
  }
});
