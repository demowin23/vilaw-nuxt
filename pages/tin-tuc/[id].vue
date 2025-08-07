<template>
  <div class="w-full px-4">
    <!-- Breadcrumb -->
    <div class="breadcrumb mb-6">
      <NuxtLink to="/" class="breadcrumb-item">Trang chủ</NuxtLink>
      <span class="breadcrumb-separator">/</span>
      <NuxtLink to="/tin-tuc" class="breadcrumb-item">Tin tức</NuxtLink>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">{{ newsStore.currentNews?.title }}</span>
    </div>

    <!-- Loading State -->
    <div v-if="newsStore.loading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f58220]"
      ></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Đang tải tin tức...</p>
    </div>

    <!-- News Detail -->
    <div v-else-if="newsStore.currentNews" class="news-detail">
      <div class="news-header">
        <div class="news-category">
          {{ newsStore.currentNews.category || "Pháp luật" }}
        </div>
        <h1 class="news-title">{{ newsStore.currentNews.title }}</h1>
        <div class="news-meta">
          <span class="news-date">{{
            formatDate(newsStore.currentNews.ts_update)
          }}</span>
          <span class="news-views"
            >{{ newsStore.currentNews.view_count || 0 }} lượt đọc</span
          >
          <span class="news-author"
            >Tác giả: {{ newsStore.currentNews.author || "Admin" }}</span
          >
        </div>
      </div>

      <div class="news-content">
        <div class="news-thumbnail">
          <img
            :src="newsStore.getImage(newsStore.currentNews.image)"
            :alt="newsStore.currentNews.title"
          />
        </div>

        <div class="news-body">
          <p class="news-excerpt">{{ newsStore.currentNews.description }}</p>

          <div class="news-text" v-html="newsStore.currentNews.content"></div>
        </div>
      </div>

      <!-- Related News -->
      <div v-if="newsStore.relatedNews.length > 0" class="related-news">
        <h3 class="related-title">Tin tức liên quan</h3>
        <div class="related-grid">
          <div
            v-for="related in newsStore.relatedNews"
            :key="related.id"
            class="related-item"
            @click="navigateTo(`/tin-tuc/${related.id}-${slugify(related.title)}`)"
          >
            <img
              :src="newsStore.getImage(related.image)"
              :alt="related.title"
            />
            <div class="related-content">
              <h4>{{ related.title }}</h4>
              <span class="related-date">{{
                formatDate(related.ts_update)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-12">
      <div class="text-red-600 dark:text-red-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Không tìm thấy tin tức
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        Tin tức bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNewsStore } from "~/stores/news";
import { slugify } from "~/utils/slugify";

// Get the ID from the route
const route = useRoute();
const idParam = route.params.id as string;
const id = idParam?.split('-')[0];

// Use news store
const newsStore = useNewsStore();

// Fetch news detail from store
const fetchNewsDetail = async () => {
  try {
    // Fetch news detail
    await newsStore.fetchNewsDetail(id);

    // Fetch related news if we have news data
    if (newsStore.currentNews) {
      await newsStore.fetchRelatedNews(
        newsStore.currentNews.category || "phap-luat",
        newsStore.currentNews.id,
        4
      );
    }
  } catch (error) {
    console.error("Error fetching news detail:", error);
  }
};

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Load data on mount
onMounted(() => {
  fetchNewsDetail();
});
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 24px;
}

.dark .breadcrumb {
  color: #9ca3af;
}

.breadcrumb-item {
  color: #f58220;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-item:hover {
  color: #ffa000;
}

.breadcrumb-separator {
  color: #ccc;
}

.breadcrumb-current {
  color: #666;
  font-weight: 500;
}

.dark .breadcrumb-current {
  color: #9ca3af;
}

.news-detail {
  max-width: 1200px;
  margin: 0 auto;
}

.news-header {
  text-align: center;
  margin-bottom: 32px;
}

.news-category {
  display: inline-block;
  background: #f58220;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.news-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #181818;
  margin-bottom: 16px;
  transition: color 0.3s ease;
  text-align: justify;
}

.dark .news-title {
  color: #f9fafb;
}

.news-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  font-size: 0.9rem;
  color: #666;
  flex-wrap: wrap;
}

.dark .news-meta {
  color: #9ca3af;
}

.news-date,
.news-views,
.news-author {
  display: flex;
  align-items: center;
  gap: 4px;
}

.news-views::before {
  content: "👁";
  font-size: 0.8rem;
}

.news-content {
  margin-bottom: 48px;
}

.news-thumbnail {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.dark .news-thumbnail {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.news-thumbnail img {
  width: 100%;
  height: auto;
  display: block;
}

.news-body {
  line-height: 1.8;
  color: #374151;
  transition: color 0.3s ease;
}

.dark .news-body {
  color: #d1d5db;
}

.news-excerpt {
  font-size: 1.1rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 24px;
  padding: 16px;
  background: #f9fafb;
  border-left: 4px solid #f58220;
  border-radius: 0 8px 8px 0;
}

.dark .news-excerpt {
  background: #374151;
  color: #9ca3af;
}

.news-text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #181818;
  margin: 32px 0 16px 0;
  transition: color 0.3s ease;
}

.dark .news-text h2 {
  color: #f9fafb;
}

.news-text p {
  margin-bottom: 16px;
  font-size: 1rem;
}

.related-news {
  border-top: 2px solid #e5e7eb;
  padding-top: 32px;
}

.dark .related-news {
  border-top-color: #4b5563;
}

.related-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #181818;
  margin-bottom: 24px;
  transition: color 0.3s ease;
}

.dark .related-title {
  color: #f9fafb;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.related-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark .related-item {
  background: #1f2937;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.related-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.related-item img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.related-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.related-content h4 {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
  color: #181818;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.dark .related-content h4 {
  color: #f9fafb;
}

.related-date {
  font-size: 0.8rem;
  color: #666;
  transition: color 0.3s ease;
}

.dark .related-date {
  color: #9ca3af;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.dark .loading-state {
  color: #9ca3af;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f58220;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .news-title {
    font-size: 1.8rem;
  }

  .news-meta {
    flex-direction: column;
    gap: 8px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
