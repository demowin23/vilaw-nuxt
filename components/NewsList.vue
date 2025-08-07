<template>
  <div class="news-list">
    <div class="header-row">
      <h2 class="section-title">{{ title }}</h2>
      <div class="filters">
        <select v-model="selectedCategory" class="filter-select">
          <option value="">Tất cả danh mục</option>
          <option value="dân sự">Dân sự</option>
          <option value="hình sự">Hình sự</option>
          <option value="kinh doanh">Kinh doanh</option>
          <option value="lao động">Lao động</option>
          <option value="đất đai">Đất đai</option>
          <option value="thừa kế">Thừa kế</option>
          <option value="hôn nhân">Hôn nhân</option>
        </select>
        <select v-model="sortBy" class="filter-select">
          <option value="date">Mới nhất</option>
          <option value="views">Xem nhiều nhất</option>
          <option value="title">A-Z</option>
        </select>
      </div>
    </div>

    <div class="news-grid">
      <NewsItem
        v-for="(item, idx) in paginatedNews"
        :key="idx"
        :thumbnail="item.thumbnail"
        :title="item.title"
        :excerpt="item.excerpt"
        :category="item.category"
        :date="item.date"
        :views="item.views"
        :id="item.id"
        @click="handleNewsClick(item)"
      />
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="currentPage = currentPage - 1"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
        Trước
      </button>

      <div class="page-numbers">
        <button
          v-for="page in visiblePages"
          :key="page"
          class="page-number"
          :class="{ active: page === currentPage }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage = currentPage + 1"
      >
        Sau
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import NewsItem from "./NewsItem.vue";
import { slugify } from "~/utils/slugify";

interface NewsItemType {
  thumbnail: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  views: number;
  id: number;
}

const props = defineProps<{
  news: NewsItemType[];
  title: string;
}>();

const selectedCategory = ref("");
const sortBy = ref("date");
const currentPage = ref(1);
const itemsPerPage = 12;

const filteredNews = computed(() => {
  let filtered = [...props.news];

  if (selectedCategory.value) {
    filtered = filtered.filter((item) =>
      item.category.toLowerCase().includes(selectedCategory.value.toLowerCase())
    );
  }

  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "views":
        return b.views - a.views;
      case "title":
        return a.title.localeCompare(b.title, "vi");
      default:
        return 0;
    }
  });

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredNews.value.length / itemsPerPage)
);

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNews.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

function handleNewsClick(news: NewsItemType) {
  // Navigate to news detail page
  navigateTo(`/tin-tuc/${news.id}-${slugify(news.title)}`);
}

// Reset to first page when filters change
watch([selectedCategory, sortBy], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.news-list {
  padding: 24px 0;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-title {
  border-left: 4px solid #f58220;
  padding-left: 12px;
  color: #f58220;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  transition: color 0.3s ease;
}

.dark .section-title {
  color: #f9fafb;
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
}

.dark .filter-select {
  background: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.filter-select:focus {
  outline: none;
  border-color: #f58220;
  box-shadow: 0 0 0 3px rgba(245, 130, 32, 0.1);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .header-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters {
    width: 100%;
  }

  .filter-select {
    flex: 1;
    min-width: 0;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark .pagination-btn {
  background: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #f58220;
  color: #f58220;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 40px;
  height: 40px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .page-number {
  background: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.page-number:hover {
  border-color: #f58220;
  color: #f58220;
}

.page-number.active {
  background: #f58220;
  border-color: #f58220;
  color: white;
}
</style>
