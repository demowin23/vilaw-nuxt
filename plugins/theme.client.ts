export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()
  
  // Initialize theme on app start
  themeStore.initTheme()
  
  // Listen for system theme changes
  if (process.client) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('vilaw-theme')) {
        themeStore.setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  }
}) 