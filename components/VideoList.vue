<template>
  <div class="video-list">
    <div class="header-row">
      <h2 class="section-title">{{ title }}</h2>
      <div class="actions">
        <button class="btn-main" @click="handleClick">Xem thêm</button>
      </div>
    </div>
    <div class="video-grid-wrapper">
      <button class="btn-nav btn-prev" @click="scrollGrid(-1)">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="14" fill="rgba(0,0,0,0.25)" />
          <path
            d="M16.5 9L12.5 14L16.5 19"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="video-grid" ref="gridRef">
        <VideoItem
          v-for="(item, idx) in videos"
          :key="idx"
          :thumbnail="item.thumbnail"
          :title="item.title"
          :duration="item.duration"
          :views="item.views"
        />
      </div>
      <button class="btn-nav btn-next" @click="scrollGrid(1)">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="14" fill="rgba(0,0,0,0.25)" />
          <path
            d="M11.5 9L15.5 14L11.5 19"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VideoItem from "./VideoItem.vue";

interface VideoItemType {
  thumbnail: string;
  title: string;
  duration: string;
  views: number;
}

const props = defineProps<{
  videos: VideoItemType[];
  title: string;
}>();

const gridRef = ref(null);

function scrollGrid(dir: number) {
  const grid = gridRef.value;
  if (!grid) return;
  const item = grid.querySelector(".video-item");
  if (!item) return;
  const itemWidth = item.offsetWidth + 18; // 18px gap
  // Tính số item hiển thị vừa với khung
  const visibleCount = Math.floor(grid.offsetWidth / item.offsetWidth);
  // Tính vị trí hiện tại
  const currentScroll = grid.scrollLeft;
  // Scroll đúng 1 item
  grid.scrollTo({ left: currentScroll + dir * itemWidth, behavior: "smooth" });
}

function slugify(text) {
  // Loại bỏ tất cả dấu - có sẵn trong text
  text = text.replace(/-/g, " ");
  const from =
    "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ";
  const to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD";
  let slug = text;
  for (let i = 0; i < from.length; i++) {
    slug = slug.replace(new RegExp(from[i], "g"), to[i]);
  }
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
const handleClick = () => {
  navigateTo(`/phap-luat-doi-song/${slugify(props.title)}`);
};
</script>

<style scoped>
.video-list {
  padding: 24px 0 0 0;
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 12px;
}
.section-title {
  border-left: 4px solid #f58220;
  padding-left: 10px;
  color: #181818;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin: 0;
  transition: color 0.3s ease;
}
.dark .section-title {
  color: #f9fafb;
}
.dot {
  width: 8px;
  height: 8px;
  background: #f58220;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn-main {
  background: #f58220;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 8px 22px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-main:hover {
  background: #ffa000;
}
.video-grid-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden; /* Ẩn phần tràn */
  width: 100%;
}
.btn-nav {
  background: none;
  border: none;
  padding: 0;
  margin: 0 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  transition: opacity 0.2s;
}
.btn-prev {
  left: 8px;
}
.btn-next {
  right: 8px;
}
.btn-nav svg {
  display: block;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.18));
}
.btn-nav:disabled {
  opacity: 0.3;
  cursor: default;
}
.video-grid {
  display: flex;
  gap: 18px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 8px 0;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.video-grid::-webkit-scrollbar {
  display: none;
}
.video-item {
  flex: 0 0 calc((100% - 18px * 5) / 6); /* 6 item, 5 gap */
  max-width: calc((100% - 18px * 5) / 6);
}
@media (max-width: 1200px) {
  .video-item {
    flex: 0 0 calc((100% - 18px * 3) / 4); /* 4 item */
    max-width: calc((100% - 18px * 3) / 4);
  }
}
@media (max-width: 1024px) {
  .video-item {
    flex: 0 0 calc((100% - 18px * 2) / 3); /* 3 item */
    max-width: calc((100% - 18px * 2) / 3);
  }
}
@media (max-width: 768px) {
  .video-item {
    flex: 0 0 calc((100% - 18px * 1) / 2); /* 2 item */
    max-width: calc((100% - 18px * 1) / 2);
  }
  .section-title {
    font-size: 1.1rem;
  }
}
</style>
