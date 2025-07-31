import { STORAGE_KEYS } from '~/utils/config'

export default defineNuxtRouteMiddleware((to, from) => {
  // Chỉ chạy trên client side
  if (process.server) return

  // Lấy token từ localStorage
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  const user = localStorage.getItem(STORAGE_KEYS.AUTH_USER)
  
  // Kiểm tra nếu đang truy cập trang admin
  if (to.path.startsWith('/admin')) {
    if (!token || !user) {
      // Chưa đăng nhập -> chuyển về trang đăng nhập
      return navigateTo('/admin/dang-nhap')
    }
    
    try {
      const userData = JSON.parse(user)
      if (!["admin", "lawyer", "collaborator"].includes(userData.role)) {
        // Không có quyền truy cập admin -> chuyển về trang chủ
        return navigateTo('/')
      }
    } catch (error) {
      // Token không hợp lệ -> chuyển về trang đăng nhập admin
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
      return navigateTo('/admin/dang-nhap')
    }
  }
  
  // Kiểm tra các trang cần authentication khác
  const protectedRoutes = ['/profile', '/settings']
  if (protectedRoutes.some(route => to.path.startsWith(route))) {
    if (!token || !user) {
      return navigateTo('/dang-nhap')
    }
  }
  
  // Nếu đã đăng nhập và truy cập trang đăng nhập -> chuyển về trang chủ
  if (to.path === '/dang-nhap' && token && user) {
    return navigateTo('/')
  }
}) 