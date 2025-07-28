# Hướng dẫn sử dụng hệ thống Authentication VILAW

## Tổng quan

Hệ thống authentication của VILAW hỗ trợ đăng ký và đăng nhập bằng OTP và password, tuân theo API documentation đã cung cấp.

## Các tính năng chính

### 1. Đăng ký tài khoản

- Gửi OTP xác thực số điện thoại
- Đăng ký với thông tin cá nhân
- Xác thực OTP để hoàn tất đăng ký

### 2. Đăng nhập

- Đăng nhập bằng mật khẩu
- Đăng nhập bằng OTP
- Ghi nhớ đăng nhập

### 3. Quản lý tài khoản

- Xem thông tin cá nhân
- Cập nhật hồ sơ
- Đăng xuất

## Cấu trúc thư mục

```
├── composables/
│   └── useAuth.ts          # Composable quản lý authentication
├── middleware/
│   └── auth.ts             # Middleware bảo vệ routes
├── plugins/
│   └── auth.client.ts      # Plugin khởi tạo auth state
├── utils/
│   └── config.ts           # Cấu hình API và app
├── pages/
│   ├── dang-ky.vue         # Trang đăng ký
│   └── dang-nhap.vue       # Trang đăng nhập
└── components/
    └── Header.vue          # Header với user menu
```

## API Endpoints

### 1. Gửi OTP đăng ký

```
POST /api/v1/auth/send-registration-otp
Body: { "phone": "0123456789" }
```

### 2. Đăng ký tài khoản

```
POST /api/v1/auth/register
Body: {
  "phone": "0123456789",
  "otp": "123456",
  "fullName": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123"
}
```

### 3. Gửi OTP đăng nhập

```
POST /api/v1/auth/send-login-otp
Body: { "phone": "0123456789" }
```

### 4. Đăng nhập bằng OTP

```
POST /api/v1/auth/login-otp
Body: {
  "phone": "0123456789",
  "otp": "123456"
}
```

### 5. Đăng nhập bằng password

```
POST /api/v1/auth/login
Body: {
  "phone": "0123456789",
  "password": "password123"
}
```

### 6. Lấy thông tin user hiện tại

```
GET /api/v1/auth/me
Headers: Authorization: Bearer <token>
```

### 7. Cập nhật profile

```
PUT /api/v1/auth/update-profile
Headers: Authorization: Bearer <token>
Body: {
  "fullName": "Nguyễn Văn B",
  "email": "newemail@example.com",
  "address": "Hà Nội",
  "dateOfBirth": "1990-01-01",
  "gender": "male"
}
```

### 8. Đăng xuất

```
POST /api/v1/auth/logout
Headers: Authorization: Bearer <token>
```

## Cách sử dụng

### 1. Sử dụng composable useAuth

```typescript
// Trong component
const {
  user,
  isAuthenticated,
  isLoading,
  sendRegistrationOTP,
  register,
  sendLoginOTP,
  loginWithOTP,
  loginWithPassword,
  logout,
} = useAuth();

// Kiểm tra trạng thái đăng nhập
if (isAuthenticated.value) {
  console.log("User đã đăng nhập:", user.value);
}

// Đăng nhập bằng password
const handleLogin = async () => {
  try {
    const response = await loginWithPassword(phone, password);
    if (response.success) {
      // Đăng nhập thành công
      await navigateTo("/");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
```

### 2. Bảo vệ routes với middleware

```typescript
// Trong page component
definePageMeta({
  middleware: "auth",
});

// Hoặc trong nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    "/admin/**": { middleware: "auth" },
  },
});
```

### 3. Cấu hình API URL

```typescript
// Trong utils/config.ts
export const API_CONFIG = {
  BASE_URL:
    process.env.NODE_ENV === "production"
      ? "https://your-production-api.com/api/v1"
      : "http://localhost:4000/api/v1",
};
```

## Luồng hoạt động

### Đăng ký

1. User nhập thông tin cá nhân
2. Gửi OTP đến số điện thoại
3. User nhập OTP để xác thực
4. Hoàn tất đăng ký và tự động đăng nhập

### Đăng nhập

1. User chọn phương thức đăng nhập (password/OTP)
2. Nếu chọn OTP: gửi OTP → nhập OTP → đăng nhập
3. Nếu chọn password: nhập password → đăng nhập
4. Lưu token và thông tin user vào localStorage

### Bảo vệ routes

1. Middleware kiểm tra token trong localStorage
2. Nếu không có token → chuyển về trang đăng nhập
3. Nếu có token nhưng không hợp lệ → xóa token và chuyển về trang đăng nhập
4. Nếu truy cập trang admin nhưng không có quyền → chuyển về trang chủ

## Lưu ý quan trọng

1. **API URL**: Cần cập nhật `API_CONFIG.BASE_URL` trong `utils/config.ts` theo backend thực tế
2. **CORS**: Backend cần cấu hình CORS để cho phép frontend gọi API
3. **HTTPS**: Trong production, nên sử dụng HTTPS cho bảo mật
4. **Token Storage**: Token được lưu trong localStorage, có thể cân nhắc sử dụng httpOnly cookies cho bảo mật cao hơn
5. **Error Handling**: Hệ thống đã có xử lý lỗi cơ bản, có thể mở rộng thêm

## Troubleshooting

### Lỗi CORS

- Kiểm tra cấu hình CORS trên backend
- Đảm bảo API URL đúng

### Token không hợp lệ

- Kiểm tra format token từ backend
- Kiểm tra logic xử lý token trong useAuth

### OTP không nhận được

- Kiểm tra cấu hình SMS service trên backend
- Kiểm tra format số điện thoại

## Mở rộng

Hệ thống có thể mở rộng thêm:

- Đăng nhập bằng Google/Facebook
- Xác thực 2 yếu tố (2FA)
- Quản lý session
- Refresh token
- Password reset
