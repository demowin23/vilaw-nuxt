<template>
  <div class="w-full px-4">
    <!-- Breadcrumb -->
    <div class="breadcrumb mb-6">
      <NuxtLink to="/" class="breadcrumb-item">Trang chủ</NuxtLink>
      <span class="breadcrumb-separator">/</span>
      <NuxtLink to="/tin-tuc" class="breadcrumb-item">Tin tức</NuxtLink>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">{{ news?.title }}</span>
    </div>

    <!-- News Detail -->
    <div v-if="news" class="news-detail">
      <div class="news-header">
        <div class="news-category">{{ news.category }}</div>
        <h1 class="news-title">{{ news.title }}</h1>
        <div class="news-meta">
          <span class="news-date">{{ formatDate(news.date) }}</span>
          <span class="news-views">{{ news.views }} lượt đọc</span>
          <span class="news-author">Tác giả: {{ news.author || "Admin" }}</span>
        </div>
      </div>

      <div class="news-content">
        <div class="news-thumbnail">
          <img :src="news.thumbnail" :alt="news.title" />
        </div>

        <div class="news-body">
          <p class="news-excerpt">{{ news.excerpt }}</p>

          <div class="news-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2>1. Quy định chung</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <h2>2. Điều kiện áp dụng</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <h2>3. Thủ tục thực hiện</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>

            <h2>4. Lưu ý quan trọng</h2>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
          </div>
        </div>
      </div>

      <!-- Related News -->
      <div class="related-news">
        <h3 class="related-title">Tin tức liên quan</h3>
        <div class="related-grid">
          <div
            v-for="related in relatedNews"
            :key="related.id"
            class="related-item"
            @click="navigateTo(`/tin-tuc/${related.id}`)"
          >
            <img :src="related.thumbnail" :alt="related.title" />
            <div class="related-content">
              <h4>{{ related.title }}</h4>
              <span class="related-date">{{ formatDate(related.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="loading-state">
      <div class="loading-spinner"></div>
      <p>Đang tải tin tức...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const newsId = route.params.id;

// Mock data - in real app, this would come from API
const newsData = [
  {
    id: 1,
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Quy định mới về xử lý vi phạm giao thông đường bộ năm 2024",
    excerpt:
      "Bộ Công an vừa ban hành Thông tư mới về xử lý vi phạm hành chính trong lĩnh vực giao thông đường bộ với nhiều điểm đáng chú ý...",
    category: "Giao thông",
    date: "2024-01-15",
    views: 15420,
    author: "Luật sư Nguyễn Văn A",
  },
  {
    id: 2,
    thumbnail: "/images/meclip.jpeg",
    title: "Hướng dẫn thủ tục ly hôn đơn phương mới nhất",
    excerpt:
      "Thủ tục ly hôn đơn phương có những thay đổi quan trọng theo quy định mới của Bộ luật Dân sự và Luật Hôn nhân và gia đình...",
    category: "Hôn nhân",
    date: "2024-01-14",
    views: 12850,
    author: "Luật sư Trần Thị B",
  },
  {
    id: 3,
    thumbnail: "/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
    title: "Quyền thừa kế của con nuôi theo pháp luật Việt Nam",
    excerpt:
      "Con nuôi có quyền thừa kế như con đẻ theo quy định của pháp luật. Tuy nhiên, cần lưu ý một số điểm quan trọng...",
    category: "Thừa kế",
    date: "2024-01-13",
    views: 9870,
    author: "Luật sư Lê Văn C",
  },
  {
    id: 4,
    thumbnail: "/images/bai-tap-luat.webp",
    title: "Phân tích án lệ về tranh chấp hợp đồng mua bán nhà đất",
    excerpt:
      "Án lệ số 23/2018/AL của Tòa án nhân dân tối cao về hiệu lực của hợp đồng mua bán nhà đất khi chưa có sổ đỏ...",
    category: "Dân sự",
    date: "2024-01-12",
    views: 8760,
    author: "Luật sư Phạm Thị D",
  },
  {
    id: 5,
    thumbnail: "/images/de-thi-luat.webp",
    title: "Quy định về thời gian làm việc và nghỉ ngơi của người lao động",
    excerpt:
      "Luật Lao động 2019 có những quy định mới về thời gian làm việc, nghỉ ngơi và chế độ làm thêm giờ...",
    category: "Lao động",
    date: "2024-01-11",
    views: 7650,
    author: "Luật sư Hoàng Văn E",
  },
];

const news = computed(() => {
  return newsData.find((item) => item.id === parseInt(newsId as string));
});

const relatedNews = computed(() => {
  if (!news.value) return [];
  return newsData
    .filter(
      (item) =>
        item.id !== news.value?.id && item.category === news.value?.category
    )
    .slice(0, 3);
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Set page title
useHead({
  title: news.value
    ? `${news.value.title} - Tin tức pháp luật`
    : "Tin tức pháp luật",
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
  max-width: 800px;
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
