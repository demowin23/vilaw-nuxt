import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpenSidebar: true,
    currentTitle: 'Dân sự – Thừa kế – Hôn nhân và gia đình'
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
    },
    setTitle(title: string) {
      this.currentTitle = title
    }
  }
}) 