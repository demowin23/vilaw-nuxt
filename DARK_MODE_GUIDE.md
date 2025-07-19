# Hướng dẫn sử dụng Dark Mode

## Tổng quan

Dự án VILAW đã được tích hợp chế độ Dark Mode hoàn chỉnh với khả năng chuyển đổi mượt mà giữa chế độ sáng và tối.

## Tính năng

### 1. Toggle Theme Button

- **Vị trí**: Trong sidebar (cả khi mở rộng và thu gọn)
- **Chức năng**: Chuyển đổi giữa chế độ sáng và tối
- **Icon**:
  - 🌙 Moon icon khi ở chế độ sáng
  - ☀️ Sun icon khi ở chế độ tối

### 2. Lưu trữ tùy chọn

- Tự động lưu tùy chọn vào localStorage
- Ghi nhớ lựa chọn của người dùng giữa các phiên làm việc

### 3. System Preference

- Tự động phát hiện cài đặt hệ thống (light/dark)
- Cập nhật theo thay đổi cài đặt hệ thống (nếu chưa có tùy chọn thủ công)

## Cấu trúc kỹ thuật

### Store Management

```typescript
// stores/theme.ts
export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  actions: {
    toggleTheme() // Chuyển đổi theme
    setTheme(theme: 'dark' | 'light') // Đặt theme cụ thể
    initTheme() // Khởi tạo theme
  }
})
```

### Component Toggle

```vue
<!-- components/ThemeToggle.vue -->
<template>
  <button @click="themeStore.toggleTheme()">
    <!-- Icon thay đổi theo theme -->
  </button>
</template>
```

### CSS Classes

- Sử dụng Tailwind CSS với `dark:` prefix
- Transition mượt mà với `transition-colors duration-300`
- Global CSS trong `assets/css/global.css`

## Cách sử dụng

### 1. Chuyển đổi theme

- Click vào nút toggle trong sidebar
- Theme sẽ thay đổi ngay lập tức với animation mượt mà

### 2. Tùy chỉnh theme

- Theme được lưu tự động
- Có thể reset bằng cách xóa localStorage

### 3. Responsive

- Hoạt động trên mọi thiết bị
- Tối ưu cho mobile và desktop

## Các component đã được cập nhật

### Layout & Navigation

- ✅ `layouts/default.vue` - Layout chính
- ✅ `components/Header.vue` - Header
- ✅ `components/Footer.vue` - Footer
- ✅ `components/ThemeToggle.vue` - Nút toggle

### Pages

- ✅ `pages/index.vue` - Trang chủ
- ✅ `pages/van-ban/[id].vue` - Chi tiết văn bản
- ✅ `pages/tin-tuc.vue` - Tin tức
- ✅ `pages/lien-he.vue` - Liên hệ
- ✅ `pages/phap-luat-doi-song/index.vue` - Pháp luật đời sống

### Components

- ✅ `components/HotVideo.vue` - Video nổi bật
- ✅ `components/VideoItem.vue` - Item video
- ✅ `components/VideoList.vue` - Danh sách video

## Cấu hình Tailwind

```typescript
// nuxt.config.ts
tailwindcss: {
  config: {
    darkMode: 'class', // Sử dụng class thay vì media query
    // ...
  }
}
```

## Best Practices

### 1. Thêm dark mode cho component mới

```vue
<template>
  <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
    <!-- Content -->
  </div>
</template>
```

### 2. Sử dụng transition

```vue
<div class="transition-colors duration-300">
  <!-- Content with smooth transitions -->
</div>
```

### 3. Kiểm tra contrast

- Đảm bảo độ tương phản đủ cao trong cả hai mode
- Sử dụng công cụ kiểm tra accessibility

## Troubleshooting

### 1. Theme không lưu

- Kiểm tra localStorage có hoạt động không
- Xem console có lỗi JavaScript không

### 2. Transition không mượt

- Đảm bảo đã import `global.css`
- Kiểm tra CSS classes có đúng không

### 3. Icon không thay đổi

- Kiểm tra logic trong `ThemeToggle.vue`
- Xem store có cập nhật đúng không

## Tương lai

### Tính năng có thể thêm

- [ ] Auto-switch theo thời gian
- [ ] Custom color schemes
- [ ] High contrast mode
- [ ] Reduced motion mode

### Cải tiến

- [ ] Performance optimization
- [ ] Better accessibility
- [ ] More color variations
