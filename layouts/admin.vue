<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside
      class="admin-sidebar"
      :class="{ 'sidebar-collapsed': sidebarCollapsed }"
    >
      <div class="sidebar-header">
        <h2 v-if="!sidebarCollapsed">ViLaw Admin</h2>
        <button @click="toggleSidebar" class="sidebar-toggle">
          {{ sidebarCollapsed ? "☰" : "✕" }}
        </button>
      </div>

      <nav class="sidebar-nav no-scrollbar">
        <!-- 1. Quản lý website -->
        <div class="menu-section">
          <div class="section-header" @click="toggleWebsiteSection">
            <span class="section-title">Quản lý website</span>
            <span
              class="section-toggle"
              :class="{ collapsed: !websiteSectionOpen }"
            >
              {{ websiteSectionOpen ? "▼" : "▶" }}
            </span>
          </div>

          <div
            class="section-content"
            :class="{ collapsed: !websiteSectionOpen }"
          >
            <NuxtLink to="/admin" class="nav-item" active-class="active">
              <span class="nav-icon">📊</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Dashboard</span>
            </NuxtLink>

            <NuxtLink
              v-if="isAdmin"
              to="/admin/users"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">👥</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Tài khoản</span>
            </NuxtLink>

            <NuxtLink
              to="/admin/knowledge"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">📚</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Kiến thức pháp luật</span
              >
            </NuxtLink>

            <NuxtLink
              to="/admin/documents"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">📄</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Văn bản pháp luật</span
              >
            </NuxtLink>

            <NuxtLink to="/admin/news" class="nav-item" active-class="active">
              <span class="nav-icon">📰</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Tin tức pháp luật</span
              >
            </NuxtLink>

            <NuxtLink to="/admin/videos" class="nav-item" active-class="active">
              <span class="nav-icon">🎥</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Video pháp luật</span
              >
            </NuxtLink>

            <NuxtLink
              to="/admin/gioi-thieu"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">ℹ️</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Trang Giới thiệu</span
              >
            </NuxtLink>

            <NuxtLink
              to="/admin/lien-he"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">☎️</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Trang Liên hệ</span
              >
            </NuxtLink>

            <NuxtLink
              to="/admin/category"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">🏷️</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Danh mục</span>
            </NuxtLink>

            <NuxtLink to="/admin/chat" class="nav-item" active-class="active">
              <span class="nav-icon">💬</span>
              <span v-if="!sidebarCollapsed" class="nav-text">Chat hỗ trợ</span>
            </NuxtLink>
          </div>
        </div>

        <!-- 2. Quản lý dịch vụ -->
        <div class="menu-section">
          <div class="section-header" @click="toggleServiceSection">
            <span class="section-title">Quản lý dịch vụ</span>
            <span
              class="section-toggle"
              :class="{ collapsed: !serviceSectionOpen }"
            >
              {{ serviceSectionOpen ? "▼" : "▶" }}
            </span>
          </div>

          <div
            class="section-content"
            :class="{ collapsed: !serviceSectionOpen }"
          >
            <NuxtLink
              to="/admin/service-usage"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">🔍</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Tra cứu sử dụng dịch vụ</span
              >
            </NuxtLink>

            <NuxtLink
              to="/admin/service-config"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">⚙️</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Cài đặt dịch vụ</span
              >
            </NuxtLink>

            <NuxtLink
              to="/admin/reports"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">📈</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Báo cáo thống kê</span
              >
            </NuxtLink>

            <NuxtLink
              to="/admin/service-info"
              class="nav-item"
              active-class="active"
            >
              <span class="nav-icon">ℹ️</span>
              <span v-if="!sidebarCollapsed" class="nav-text"
                >Thông tin dịch vụ</span
              >
            </NuxtLink>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <NuxtLink to="/" class="">
          <span class="nav-icon">🏠</span>
          <span v-if="!sidebarCollapsed" class="nav-text">Về trang chủ</span>
        </NuxtLink>
      </div>
    </aside>

    <!-- Main content -->
    <main class="admin-main">
      <!-- Header -->
      <header class="admin-header">
        <div class="header-left">
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <div class="user-menu">
            <span class="user-name">{{ userName }}</span>
            <button @click="logout" class="logout-btn">Đăng xuất</button>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <div class="admin-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";

const { isAdmin, user } = useAuth();
const sidebarCollapsed = ref(false);
const pageTitle = ref("Dashboard");

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};
const userName = computed(() => {
  switch (user.value?.role) {
    case "admin":
      return "Admin";
    case "lawyer":
      return "Luật sư";
    case "collaborator":
      return "Cộng tác viên";
    default:
      return "Admin";
  }
});
const logout = async () => {
  try {
    // Gọi API đăng xuất
    const { logout: logoutApi } = useAuth();
    await logoutApi();

    // Chuyển đến trang đăng nhập admin
    await navigateTo("/admin/dang-nhap");
  } catch (error) {
    console.error("Logout error:", error);
    // Vẫn chuyển đến trang đăng nhập ngay cả khi API lỗi
    await navigateTo("/admin/dang-nhap");
  }
};

// Collapsible sections
const websiteSectionOpen = ref(true);
const serviceSectionOpen = ref(true);

const toggleWebsiteSection = () => {
  websiteSectionOpen.value = !websiteSectionOpen.value;
};
const toggleServiceSection = () => {
  serviceSectionOpen.value = !serviceSectionOpen.value;
};

// Cập nhật title dựa trên route
const route = useRoute();
watch(
  () => route.path,
  (newPath) => {
    const titles = {
      "/admin": "Dashboard",
      "/admin/users": "Quản lý tài khoản",
      "/admin/actions": "Lịch sử Admin Actions",
      "/admin/knowledge": "Quản lý kiến thức pháp luật",
      "/admin/documents": "Quản lý văn bản pháp luật",
      "/admin/news": "Quản lý tin tức pháp luật",
      "/admin/videos": "Quản lý video pháp luật",
      "/admin/gioi-thieu": "Quản trị trang Giới thiệu",
      "/admin/lien-he": "Quản trị trang Liên hệ",
      "/admin/chat": "Chat hỗ trợ",
      "/admin/service-usage": "Tra cứu sử dụng dịch vụ",
      "/admin/service-history": "Lịch sử sử dụng",
      "/admin/service-config": "Cấu hình dịch vụ",
      "/admin/service-packages": "Gói dịch vụ",
      "/admin/service-pricing": "Bảng giá",
      "/admin/reports/overview": "Báo cáo tổng quan",
      "/admin/reports/revenue": "Báo cáo doanh thu",
      "/admin/reports/users": "Báo cáo người dùng",
      "/admin/reports/services": "Báo cáo dịch vụ",
      "/admin/subscribers": "Danh sách thuê bao",
      "/admin/subscriber-search": "Tìm kiếm thuê bao",
      "/admin/subscriber-status": "Trạng thái thuê bao",
      "/admin/service-info": "Thông tin dịch vụ",
      "/admin/service-support": "Hỗ trợ dịch vụ",
      "/admin/service-faq": "Câu hỏi thường gặp",
    };
    pageTitle.value = titles[newPath] || "Dashboard";
  },
  { immediate: true }
);
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
}

.admin-sidebar {
  width: 280px;
  background: var(--bg-card);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar-header h2 {
  margin: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.sidebar-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-primary);
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.sidebar-toggle:hover {
  background: var(--bg-hover);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
  min-height: 0;
}

.menu-section {
  margin-bottom: 1.5rem;
}

.section-header {
  padding: 0.5rem 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-toggle {
  font-size: 0.75rem;
  color: var(--text-primary);
  transition: transform 0.3s ease;
}

.section-content {
  overflow: hidden;
  transition: all 0.3s ease-out;
  max-height: 1000px;
}

.section-content.collapsed {
  max-height: 0;
  opacity: 0;
}

.section-header:hover {
  background: var(--bg-hover);
  border-radius: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0rem 0.75rem 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.2s;
  gap: 0.75rem;
}

.nav-item:hover {
  background: var(--bg-hover);
  color: var(--primary-color);
}

.nav-item.active {
  background: var(--primary-light);
  color: var(--primary-color);
  border-right: 3px solid var(--primary-color);
}

.nav-icon {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.nav-text {
  font-weight: 500;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-page);
  min-height: 0;
  overflow: hidden;
}

.admin-header {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.header-left h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  color: var(--text-primary);
  font-weight: 500;
}

.logout-btn {
  background: var(--danger-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background: var(--danger-dark);
}

.admin-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 2rem;
}

@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar-collapsed {
    transform: translateX(0);
  }

  .admin-main {
    margin-left: 0;
  }
}
</style>
