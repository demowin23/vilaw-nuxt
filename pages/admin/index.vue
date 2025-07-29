<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Bảng điều khiển Admin</h1>
      <p>Quản lý hệ thống ViLaw</p>
    </div>

    <!-- Thống kê tổng quan -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>{{ stats.users }}</h3>
          <p>Tài khoản</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>{{ stats.knowledge }}</h3>
          <p>Kiến thức pháp luật</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-content">
          <h3>{{ stats.documents }}</h3>
          <p>Văn bản pháp luật</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📰</div>
        <div class="stat-content">
          <h3>{{ stats.news }}</h3>
          <p>Tin tức pháp luật</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎥</div>
        <div class="stat-content">
          <h3>{{ stats.videos }}</h3>
          <p>Video pháp luật</p>
        </div>
      </div>
    </div>

    <!-- Menu quản lý -->
    <div class="management-grid">
      <NuxtLink to="/admin/users" class="management-card">
        <div class="card-icon">👥</div>
        <h3>Quản lý tài khoản</h3>
        <p>Thêm, sửa, xóa và xem danh sách người dùng</p>
      </NuxtLink>

      <NuxtLink to="/admin/knowledge" class="management-card">
        <div class="card-icon">📚</div>
        <h3>Quản lý kiến thức pháp luật</h3>
        <p>Quản lý các bài viết kiến thức pháp luật</p>
      </NuxtLink>

      <NuxtLink to="/admin/documents" class="management-card">
        <div class="card-icon">📄</div>
        <h3>Quản lý văn bản pháp luật</h3>
        <p>Quản lý các văn bản pháp luật</p>
      </NuxtLink>

      <NuxtLink to="/admin/news" class="management-card">
        <div class="card-icon">📰</div>
        <h3>Quản lý tin tức pháp luật</h3>
        <p>Quản lý tin tức và bài viết pháp luật</p>
      </NuxtLink>

      <NuxtLink to="/admin/videos" class="management-card">
        <div class="card-icon">🎥</div>
        <h3>Quản lý video pháp luật</h3>
        <p>Quản lý video pháp luật và đời sống</p>
      </NuxtLink>

      <NuxtLink to="/admin/category" class="management-card">
        <div class="card-icon">🏷️</div>
        <h3>Quản lý danh mục</h3>
        <p>Thêm, sửa, xóa và xem danh sách danh mục</p>
      </NuxtLink>

      <NuxtLink to="/admin/chat" class="management-card">
        <div class="card-icon">💬</div>
        <h3>Chat hỗ trợ</h3>
        <p>Quản lý và trả lời các cuộc trò chuyện với người dùng</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

// Mock data - trong thực tế sẽ lấy từ API
const stats = ref({
  users: 1250,
  knowledge: 342,
  documents: 156,
  news: 89,
  videos: 67,
});
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: 12px;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 0;
}

.stat-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.management-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.management-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.management-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.management-card h3 {
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.management-card p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .management-grid {
    grid-template-columns: 1fr;
  }
}
</style>
