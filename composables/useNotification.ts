import { ref, readonly } from 'vue'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

const notifications = ref<Notification[]>([])

export const useNotification = () => {
  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000
    }
    
    notifications.value.push(newNotification)
    
    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }
  
  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  const clearAll = () => {
    notifications.value = []
  }
  
  // Convenience methods
  const showSuccess = (title: string, message?: string, duration?: number) => {
    return showNotification({ type: 'success', title, message, duration })
  }
  
  const showError = (title: string, message?: string, duration?: number) => {
    return showNotification({ type: 'error', title, message, duration })
  }
  
  const showWarning = (title: string, message?: string, duration?: number) => {
    return showNotification({ type: 'warning', title, message, duration })
  }
  
  const showInfo = (title: string, message?: string, duration?: number) => {
    return showNotification({ type: 'info', title, message, duration })
  }
  
  // Handle API errors
  const handleApiError = (error: any, defaultTitle = 'Có lỗi xảy ra') => {
    let title = defaultTitle
    let message = ''
    
    if (typeof error === 'string') {
      message = error
    } else if (error?.message) {
      message = error.message
    } else if (error?.error) {
      message = error.error
    } else if (error?.response?.data?.error) {
      message = error.response.data.error
    } else if (error?.response?.data?.message) {
      message = error.response.data.message
    } else if (error?.statusText) {
      message = error.statusText
    }
    
    // If we have a specific error message, use it as title
    if (message && message !== defaultTitle) {
      title = message
      message = ''
    }
    
    return showError(title, message, 8000) // Show error longer
  }
  
  // Handle API success
  const handleApiSuccess = (response: any, defaultTitle = 'Thành công') => {
    let title = defaultTitle
    let message = ''
    
    if (response?.message) {
      title = response.message
    } else if (response?.data?.message) {
      title = response.data.message
    }
    
    return showSuccess(title, message, 3000)
  }
  
  return {
    notifications: readonly(notifications),
    showNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    handleApiError,
    handleApiSuccess
  }
} 