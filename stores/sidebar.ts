import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpenSidebar: false
  }),
  actions: {
    toggleSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar
    },
    openSidebar() {
      this.isOpenSidebar = true
    },
    closeSidebar() {
      this.isOpenSidebar = false
    }
  }
}) 