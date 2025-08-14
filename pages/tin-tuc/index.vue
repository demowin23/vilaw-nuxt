<template>
  <div class="w-full">
    <div class="news-header mb-8">
      <h1
        class="text-3xl font-bold text-[#f58220] mb-4 transition-colors duration-300"
      >
        Tin tức pháp luật
      </h1>
      <p
        class="text-gray-700 dark:text-gray-300 transition-colors duration-300 text-lg"
      >
        Cập nhật những tin tức, bài viết pháp luật mới nhất, đáng tin cậy và hữu
        ích cho bạn.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="newsStore.loading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f58220]"
      ></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Đang tải tin tức...</p>
    </div>

    <!-- Featured News Section -->
    <div
      v-else-if="newsStore.featuredNews.length > 0"
      class="featured-news mb-12"
    >
      <h2
        class="text-2xl font-bold text-[#f58220] dark:text-gray-200 mb-6 transition-colors duration-300"
      >
        Tin tức nổi bật
      </h2>
      <div class="featured-grid">
        <!-- Box chính bên trái -->
        <div
          class="featured-main"
          @click="handleNewsClick(newsStore.featuredNews[0])"
        >
          <div class="featured-thumbnail">
            <img
              :src="newsStore.getImage(newsStore.featuredNews[0]?.image)"
              :alt="newsStore.featuredNews[0]?.title"
            />
            <div class="featured-category">
              {{ newsStore.featuredNews[0]?.category || "Pháp luật" }}
            </div>
          </div>
          <div class="featured-content">
            <h3 class="featured-title">
              {{ newsStore.featuredNews[0]?.title }}
            </h3>
            <p class="featured-excerpt">
              {{ newsStore.featuredNews[0]?.description }}
            </p>
            <div class="featured-meta">
              <span class="featured-date">{{
                formatDate(newsStore.featuredNews[0]?.created_at)
              }}</span>
              <span class="featured-views"
                >{{ newsStore.featuredNews[0]?.view_count || 0 }} lượt đọc</span
              >
            </div>
          </div>
        </div>

        <!-- 4 item dọc bên phải -->
        <div class="featured-sidebar">
          <div
            v-for="(item, index) in newsStore.featuredNews.slice(1, 5)"
            :key="item.id"
            class="featured-item"
            @click="handleNewsClick(item)"
          >
            <div class="featured-item-thumbnail">
              <img :src="newsStore.getImage(item.image)" :alt="item.title" />
              <div class="featured-category">
                {{ item.category || "Pháp luật" }}
              </div>
            </div>
            <div class="featured-item-content">
              <h3 class="featured-item-title">
                {{ item.title }}
              </h3>
              <p class="featured-item-excerpt">
                {{ item.description }}
              </p>
              <div class="featured-meta">
                <span class="featured-date">{{
                  formatDate(item.created_at)
                }}</span>
                <span class="featured-views"
                  >{{ item.view_count || 0 }} lượt đọc</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main News List -->
    <NewsList
      :news="newsStore.allNews"
      :title="'Tất cả tin tức'"
      :total-items="totalNewsCount"
      :loading="newsStore.loading"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import NewsList from "~/components/NewsList.vue";
import { useNewsStore } from "~/stores/news";
import { slugify } from "~/utils/slugify";

// Use news store
const newsStore = useNewsStore();

// Pagination state
const currentPage = ref(1);
const totalNewsCount = ref(0);
const isPageChanging = ref(false); // Flag to prevent infinite loops

const fetchNews = async (page = 1, isInitialLoad = false) => {
  try {
    if (isInitialLoad) {
      // Fetch all news and featured news in parallel only on first load
      const [newsResponse, featuredResponse] = await Promise.all([
        newsStore.fetchAllNews({ page, limit: 12 }),
        newsStore.fetchFeaturedNews(5),
      ]);

      // Update total count from API response
      if (newsResponse && newsResponse.total) {
        totalNewsCount.value = newsResponse.total;
      }
    } else {
      // Only fetch news data for pagination
      const newsResponse = await newsStore.fetchAllNews({ page, limit: 12 });

      // Update total count from API response
      if (newsResponse && newsResponse.total) {
        totalNewsCount.value = newsResponse.total;
      }
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

// Handle page change from NewsList component
const handlePageChange = async (page: number, itemsPerPage: number) => {
  try {
    currentPage.value = page;
    await fetchNews(page, false);
  } catch (error) {
    console.error("Error fetching news:", error);
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

function handleNewsClick(news: any) {
  navigateTo(`/tin-tuc/${news.id}-${slugify(news.title)}`);
}

// Load data on mount
onMounted(() => {
  fetchNews(1, true); // true = initial load
});
</script>

<style scoped>
.news-header {
  text-align: center;
}

/* Featured News Styles */
.featured-news {
  margin-bottom: 48px;
}

.featured-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: stretch;
  height: 600px;
}
.featured-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 95%;
}

.featured-main {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 95%;
}

.dark .featured-main {
  background: #1f2937;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.featured-main:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.featured-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 130px;
}

.dark .featured-item {
  background: #1f2937;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.featured-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.featured-thumbnail {
  position: relative;
  height: 60%;
  overflow: hidden;
  flex-shrink: 0;
}

.featured-main .featured-thumbnail {
  height: 65%;
}

.featured-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-main:hover .featured-thumbnail img {
  transform: scale(1.05);
}

.featured-item-thumbnail {
  position: relative;
  width: 120px;
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
}

.featured-item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-item:hover .featured-item-thumbnail img {
  transform: scale(1.05);
}

.featured-category {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #f58220;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.featured-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: space-between;
}

.featured-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  color: #181818;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.dark .featured-title {
  color: #f9fafb;
}

.featured-main .featured-title {
  font-size: 1.3rem;
  -webkit-line-clamp: 3;
}

.featured-item-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  justify-content: space-between;
}

.featured-item-title {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.3;
  color: #181818;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  margin-bottom: 4px;
}

.dark .featured-item-title {
  color: #f9fafb;
}

.featured-item-excerpt {
  font-size: 0.75rem;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  margin-bottom: 6px;
}

.dark .featured-item-excerpt {
  color: #9ca3af;
}

.featured-excerpt {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.dark .featured-excerpt {
  color: #9ca3af;
}

.featured-main .featured-excerpt {
  -webkit-line-clamp: 3;
}

.featured-small .featured-excerpt {
  display: none;
}

.featured-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
  transition: color 0.3s ease;
  gap: 12px;
  margin-top: auto;
}

.featured-item .featured-meta {
  font-size: 0.75rem;
  gap: 8px;
}

.dark .featured-meta {
  color: #9ca3af;
}

.featured-date {
  font-weight: 500;
}

.featured-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.featured-views::before {
  content: "👁";
  font-size: 0.7rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .featured-grid {
    gap: 20px;
    height: 550px;
  }

  .featured-sidebar {
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .featured-news {
    margin-bottom: 32px;
  }

  .featured-news h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    height: auto;
  }

  .featured-sidebar {
    gap: 12px;
  }

  .featured-item {
    height: 120px;
  }

  .featured-item-thumbnail {
    width: 100px;
  }

  .featured-thumbnail {
    height: 55%;
  }

  .featured-main .featured-thumbnail {
    height: 65%;
  }

  .featured-small .featured-thumbnail {
    height: 50%;
  }

  .featured-content {
    padding: 12px;
  }

  .featured-title {
    font-size: 1rem;
  }

  .featured-main .featured-title {
    font-size: 1.2rem;
  }

  .featured-small .featured-title {
    font-size: 0.9rem;
  }

  .featured-excerpt {
    font-size: 0.85rem;
  }

  .featured-main .featured-excerpt {
  }

  .featured-meta {
    font-size: 0.75rem;
  }

  .featured-views::before {
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .featured-news {
    margin-bottom: 24px;
  }

  .featured-news h2 {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }

  .featured-grid {
    gap: 12px;
  }

  .featured-sidebar {
    gap: 10px;
  }

  .featured-item {
    height: 100px;
  }

  .featured-item-thumbnail {
    width: 80px;
  }

  .featured-item-content {
    padding: 8px;
  }

  .featured-item-title {
    font-size: 0.8rem;
  }

  .featured-item-excerpt {
    font-size: 0.7rem;
    -webkit-line-clamp: 1;
  }

  .featured-item .featured-meta {
    font-size: 0.7rem;
  }

  .featured-thumbnail {
    height: 50%;
  }

  .featured-main .featured-thumbnail {
    height: 60%;
  }

  .featured-small .featured-thumbnail {
    height: 45%;
  }

  .featured-content {
    padding: 10px;
  }

  .featured-title {
    font-size: 0.95rem;
  }

  .featured-main .featured-title {
    font-size: 1.1rem;
  }

  .featured-small .featured-title {
    font-size: 0.85rem;
  }

  .featured-excerpt {
    font-size: 0.8rem;
  }

  .featured-meta {
    font-size: 0.7rem;
    gap: 8px;
  }

  .featured-views::before {
    font-size: 0.6rem;
  }
}
</style>
