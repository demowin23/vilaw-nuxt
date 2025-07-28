# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:4000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Trang quản lý Category (Admin)

- Đường dẫn: `/admin/category`
- Chức năng: Quản lý danh mục (category) cho hệ thống. Cho phép admin xem, thêm, sửa, xóa (soft delete) các category.
- Giao diện: Tương tự các trang quản lý khác (users, knowledge, news, videos).
- API sử dụng:
  - `GET    /api/v1/category` — Lấy tất cả category
  - `GET    /api/v1/category/:id` — Lấy chi tiết category
  - `POST   /api/v1/category` — Thêm category mới
  - `PUT    /api/v1/category/:id` — Cập nhật category
  - `DELETE /api/v1/category/:id` — Xóa category (soft delete)
- Cấu trúc dữ liệu category:
  ```json
  {
    "value": "ten_khong_dau_gach_duoi",
    "label": "Tên hiển thị",
    "description": "Mô tả (có thể bỏ trống)"
  }
  ```
