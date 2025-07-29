import { STORAGE_KEYS } from '~/utils/config'

export default defineNuxtRouteMiddleware((to, from) => {
  // Chỉ chạy trên client side
  if (process.server) return

  // Lấy token và user từ localStorage
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  const user = localStorage.getItem(STORAGE_KEYS.AUTH_USER)
  
  // Kiểm tra nếu đang truy cập trang admin
  if (to.path.startsWith('/admin')) {
    if (!token || !user) {
      // Chưa đăng nhập -> chuyển về trang đăng nhập
      return navigateTo('/dang-nhap')
    }
    
    try {
      const userData = JSON.parse(user)
      
      // Các trang chỉ dành cho admin
      const adminOnlyRoutes = ['/admin/users', '/admin/actions']
      
      if (adminOnlyRoutes.some(route => to.path.startsWith(route))) {
        if (userData.role !== 'admin') {
          // Không phải admin -> chuyển về trang chủ
          return navigateTo('/')
        }
      }
      
      // Kiểm tra quyền truy cập admin nói chung
      if (!["admin", "lawyer", "collaborator"].includes(userData.role)) {
        // Không có quyền truy cập admin -> chuyển về trang chủ
        return navigateTo('/')
      }
    } catch (error) {
      // Token không hợp lệ -> chuyển về trang đăng nhập
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
      return navigateTo('/dang-nhap')
    }
  }
}) 