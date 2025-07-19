import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  
  getters: {
    currentTheme: (state) => state.isDark ? 'dark' : 'light',
    isDarkMode: (state) => state.isDark
  },
  
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.saveToLocalStorage()
      this.applyTheme()
    },
    
    setTheme(theme: 'dark' | 'light') {
      this.isDark = theme === 'dark'
      this.saveToLocalStorage()
      this.applyTheme()
    },
    
    initTheme() {
      // Kiểm tra localStorage trước
      if (process.client) {
        const savedTheme = localStorage.getItem('vilaw-theme')
        if (savedTheme) {
          this.isDark = savedTheme === 'dark'
        } else {
          // Kiểm tra system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          this.isDark = prefersDark
        }
        this.applyTheme()
      }
    },
    
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('vilaw-theme', this.isDark ? 'dark' : 'light')
      }
    },
    
    applyTheme() {
      if (process.client) {
        const html = document.documentElement
        if (this.isDark) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
      }
    }
  }
}) 