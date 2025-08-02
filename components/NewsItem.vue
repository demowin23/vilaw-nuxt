<template>
  <div class="news-item">
    <div class="thumbnail-wrapper">
      <img
        :src="newsStore.getImage(thumbnail)"
        :alt="title"
        class="thumbnail"
      />
      <div class="category-badge">{{ category }}</div>
    </div>
    <div class="info">
      <div class="title" v-html="title"></div>
      <div class="excerpt">{{ excerpt }}</div>
      <div class="meta">
        <span class="date">{{ formatDate(date) }}</span>
        <span class="views">{{ views }} lượt đọc</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from "~/stores/news";

const newsStore = useNewsStore();

defineProps<{
  thumbnail: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  views: number;
  id: number;
}>();

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<style scoped>
.news-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  color: #181818;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  font-family: inherit;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.news-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.dark .news-item {
  background: #1f2937;
  color: #f9fafb;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.dark .news-item:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.thumbnail-wrapper {
  position: relative;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  display: block;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-item:hover .thumbnail {
  transform: scale(1.05);
}

.category-badge {
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

.info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  min-height: 3.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #181818;
  transition: color 0.3s ease;
}

.dark .title {
  color: #f9fafb;
}

.excerpt {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.dark .excerpt {
  color: #9ca3af;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
  margin-top: auto;
  transition: color 0.3s ease;
}

.dark .meta {
  color: #9ca3af;
}

.date {
  font-weight: 500;
}

.views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.views::before {
  content: "👁";
  font-size: 0.7rem;
}
</style>
