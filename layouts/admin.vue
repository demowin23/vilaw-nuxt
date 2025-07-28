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

      <nav class="sidebar-nav">
        <NuxtLink to="/admin" class="nav-item" active-class="active">
          <span class="nav-icon">📊</span>
          <span v-if="!sidebarCollapsed" class="nav-text">Dashboard</span>
        </NuxtLink>

        <NuxtLink to="/admin/users" class="nav-item" active-class="active">
          <span class="nav-icon">👥</span>
          <span v-if="!sidebarCollapsed" class="nav-text">Tài khoản</span>
        </NuxtLink>

        <NuxtLink to="/admin/actions" class="nav-item" active-class="active">
          <span class="nav-icon">📋</span>
          <span v-if="!sidebarCollapsed" class="nav-text">Lịch sử Admin</span>
        </NuxtLink>

        <NuxtLink to="/admin/knowledge" class="nav-item" active-class="active">
          <span class="nav-icon">📚</span>
          <span v-if="!sidebarCollapsed" class="nav-text"
            >Kiến thức pháp luật</span
          >
        </NuxtLink>

        <NuxtLink to="/admin/documents" class="nav-item" active-class="active">
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
          <span v-if="!sidebarCollapsed" class="nav-text">Video pháp luật</span>
        </NuxtLink>

        <NuxtLink to="/admin/category" class="nav-item" active-class="active">
          <span class="nav-icon">🏷️</span>
          <span v-if="!sidebarCollapsed" class="nav-text">Danh mục</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <NuxtLink to="/" class="nav-item">
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
            <span class="user-name">Admin</span>
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
const sidebarCollapsed = ref(false);
const pageTitle = ref("Dashboard");

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const logout = () => {
  // Xử lý đăng xuất
  navigateTo("/dang-nhap");
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
}

.admin-sidebar {
  width: 280px;
  background: var(--bg-card);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
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
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-page);
}

.admin-header {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
