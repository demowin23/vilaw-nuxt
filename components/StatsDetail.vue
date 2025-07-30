<template>
  <div class="stats-detail">
    <h3 class="detail-title">Chi tiết thống kê</h3>

    <!-- Users Stats -->
    <div class="detail-section">
      <h4>👥 Người dùng</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">Tổng người dùng:</span>
          <span class="value">{{
            statsStore.data.users.total_users.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Người dùng thường:</span>
          <span class="value">{{
            statsStore.data.users.user_count.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Luật sư:</span>
          <span class="value">{{
            statsStore.data.users.lawyer_count.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Admin:</span>
          <span class="value">{{
            statsStore.data.users.admin_count.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Cộng tác viên:</span>
          <span class="value">{{
            statsStore.data.users.collaborator_count.toLocaleString()
          }}</span>
        </div>
      </div>
    </div>

    <!-- Knowledge Stats -->
    <div class="detail-section">
      <h4>📚 Kiến thức pháp luật</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">Tổng bài viết:</span>
          <span class="value">{{
            statsStore.data.legalKnowledge.total_articles.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Bài viết đã xuất bản:</span>
          <span class="value">{{
            statsStore.data.legalKnowledge.published_articles.toLocaleString()
          }}</span>
        </div>
      </div>
    </div>

    <!-- Documents Stats -->
    <div class="detail-section">
      <h4>📄 Văn bản pháp luật</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">Tổng văn bản:</span>
          <span class="value">{{
            statsStore.data.legalDocuments.total_documents.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Tổng lượt tải:</span>
          <span class="value">{{
            statsStore.data.legalDocuments.total_downloads.toLocaleString()
          }}</span>
        </div>
      </div>
    </div>

    <!-- News Stats -->
    <div class="detail-section">
      <h4>📰 Tin tức pháp luật</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">Tổng tin tức:</span>
          <span class="value">{{
            statsStore.data.legalNews.total_news.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Tin tức đã xuất bản:</span>
          <span class="value">{{
            statsStore.data.legalNews.published_news.toLocaleString()
          }}</span>
        </div>
      </div>
    </div>

    <!-- Videos Stats -->
    <div class="detail-section">
      <h4>🎥 Video pháp luật</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">Tổng video:</span>
          <span class="value">{{
            statsStore.data.videos.total_videos.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Tổng lượt xem:</span>
          <span class="value">{{
            statsStore.data.videos.total_video_views.toLocaleString()
          }}</span>
        </div>
      </div>
    </div>

    <!-- Chats Stats -->
    <div class="detail-section">
      <h4>💬 Cuộc trò chuyện</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">Tổng cuộc trò chuyện:</span>
          <span class="value">{{
            statsStore.data.chats.total_conversations.toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Cuộc trò chuyện đang hoạt động:</span>
          <span class="value">{{
            statsStore.data.chats.active_conversations.toLocaleString()
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStatsStore } from "~/stores/stats";

const statsStore = useStatsStore();
</script>

<style scoped>
.stats-detail {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
}

.detail-title {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-page);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.value {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
