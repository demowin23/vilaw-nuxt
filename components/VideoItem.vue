<template>
  <div class="video-item">
    <div class="thumbnail-wrapper">
      <img :src="thumbnail" alt="thumbnail" class="thumbnail" />
    </div>
    <div class="info">
      <div class="title" v-html="title"></div>
      <div class="meta">
        <span class="duration-meta">Thời lượng: {{ duration }}</span>
        <span class="views">{{ views }} lượt xem</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  thumbnail: string;
  title: string;
  duration: string;
  views: number;
  id: number;
}>();
</script>

<style scoped>
.video-item {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  color: #181818;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 320px;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}
.dark .video-item {
  background: #1f2937;
  color: #f9fafb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.thumbnail-wrapper {
  position: relative;
}
.thumbnail {
  width: 100%;
  display: block;
  aspect-ratio: 9/12;
  object-fit: cover;
}
.info {
  padding: 12px 12px 14px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
  min-height: 2.6em;
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
.meta {
  font-size: 0.97em;
  color: #888;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: color 0.3s ease;
}
.dark .meta {
  color: #9ca3af;
}
.duration-meta {
  font-size: 0.97em;
  color: #888;
  margin-bottom: 2px;
  transition: color 0.3s ease;
}
.dark .duration-meta {
  color: #9ca3af;
}
.views {
  white-space: nowrap;
}
</style>
