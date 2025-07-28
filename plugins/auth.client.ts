export default defineNuxtPlugin(() => {
  // Khởi tạo auth state khi ứng dụng khởi động
  // useAuth() sẽ tự động khởi tạo khi được gọi
  useAuth()
}) 