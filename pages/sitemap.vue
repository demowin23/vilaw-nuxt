<template>
  <div class="sitemap-container">
    <div class="sitemap-header">
      <h1 class="sitemap-title">Sitemap - Bản đồ trang web</h1>
      <p class="sitemap-description">
        Khám phá tất cả các trang và nội dung có trên website VILAW
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Đang tải sitemap...</p>
    </div>

    <!-- Sitemap Content -->
    <div v-else class="sitemap-content">
      <!-- Error State -->
      <div v-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Không thể tải sitemap</h3>
        <p>{{ error }}</p>
        <button @click="fetchSitemapData" class="retry-btn">Thử lại</button>
      </div>

      <!-- Sitemap Sections -->
      <template v-else>
        <SitemapSection
          title="Trang chủ"
          icon="🏠"
          :main-links="[{ title: 'Trang chủ', url: '/' }]"
        />

        <SitemapSection
          title="Kiến thức pháp luật"
          icon="📚"
          :main-links="[{ title: 'Tất cả kiến thức', url: '/kien-thuc' }]"
          :categories="categories.map(cat => ({ title: cat.label, url: `/kien-thuc/${cat.value}` }))"
          :featured-items="featuredKnowledge.slice(0, 5).map(article => ({ 
            title: article.title, 
            url: `/kien-thuc/chi-tiet/${article.id}-${slugify(article.title)}` 
          }))"
          featured-title="Bài viết nổi bật"
        />

        <SitemapSection
          title="Video pháp luật"
          icon="🎥"
          :main-links="[{ title: 'Tất cả video', url: '/phap-luat-doi-song' }]"
          :featured-items="featuredVideos.slice(0, 5).map(video => ({ 
            title: video.title, 
            url: `/video/${video.id}-${slugify(video.title)}` 
          }))"
          featured-title="Video nổi bật"
        />

        <SitemapSection
          title="Văn bản pháp luật"
          icon="📄"
          :main-links="[{ title: 'Tất cả văn bản', url: '/van-ban' }]"
          :featured-items="popularDocuments.slice(0, 5).map(doc => ({ 
            title: doc.title, 
            url: `/van-ban/${doc.id}-${slugify(doc.title)}` 
          }))"
          featured-title="Văn bản phổ biến"
        />

        <SitemapSection
          title="Tin tức pháp luật"
          icon="📰"
          :main-links="[{ title: 'Tất cả tin tức', url: '/tin-tuc' }]"
          :featured-items="featuredNews.slice(0, 5).map(news => ({ 
            title: news.title, 
            url: `/tin-tuc/${news.id}-${slugify(news.title)}` 
          }))"
          featured-title="Tin tức nổi bật"
        />

        <SitemapSection
          title="Dịch vụ"
          icon="💼"
          :main-links="[
            { title: 'Chat với luật sư', url: '/chat-luat-su' },
            { title: 'Mua gói dịch vụ', url: '/mua-goi' },
            { title: 'Liên hệ', url: '/lien-he' }
          ]"
        />

        <SitemapSection
          title="Tài khoản"
          icon="👤"
          :main-links="[
            { title: 'Đăng nhập', url: '/dang-nhap' },
            { title: 'Đăng ký', url: '/dang-ky' },
            { title: 'Quên mật khẩu', url: '/quen-mat-khau' }
          ]"
        />

        <SitemapSection
          title="Thông tin"
          icon="ℹ️"
          :main-links="[{ title: 'Giới thiệu', url: '/gioi-thieu' }]"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSitemap } from '~/composables/useSitemap'
import { slugify } from '~/utils/slugify'
import SitemapSection from '~/components/SitemapSection.vue'

// Use sitemap composable
const { 
  loading, 
  error, 
  categories, 
  featuredKnowledge, 
  featuredVideos, 
  popularDocuments, 
  featuredNews,
  fetchSitemapData 
} = useSitemap()

// Load data on mount
onMounted(() => {
  fetchSitemapData()
})

// Set page meta
useHead({
  title: 'Sitemap - Bản đồ trang web | VILAW',
  meta: [
    {
      name: 'description',
      content: 'Khám phá tất cả các trang và nội dung có trên website VILAW - Nền tảng pháp luật trực tuyến'
    }
  ]
})
</script>

<style scoped>
.sitemap-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.sitemap-header {
  text-align: center;
  margin-bottom: 3rem;
}

.sitemap-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #f58220;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.dark .sitemap-title {
  color: #f9fafb;
}

.sitemap-description {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  transition: color 0.3s ease;
}

.dark .sitemap-description {
  color: #9ca3af;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f58220;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.sitemap-content {
  display: grid;
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sitemap-container {
    padding: 1rem;
  }

  .sitemap-title {
    font-size: 2rem;
  }
}

.error-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.dark .error-state {
  background: #1f2937;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.dark .error-state h3 {
  color: #f87171;
}

.error-state p {
  color: #666;
  margin-bottom: 1.5rem;
}

.dark .error-state p {
  color: #9ca3af;
}

.retry-btn {
  background: #f58220;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #ffa000;
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .sitemap-title {
    font-size: 1.75rem;
  }

  .sitemap-description {
    font-size: 1rem;
  }
}
</style>
