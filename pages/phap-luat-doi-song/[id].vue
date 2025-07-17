<template>
  <div class="video-list">
    <div class="header-row">
      <h2 class="section-title">HÌNH SỰ</h2>
    </div>
    <div class="video-grid-wrapper">
      <div class="video-grid">
        <VideoItem
          v-for="(item, idx) in videos"
          :key="idx"
          :thumbnail="item.thumbnail"
          :title="item.title"
          :duration="item.duration"
          :views="item.views"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VideoItem from "~/components/VideoItem.vue";

const videos = [
  {
    id: 1,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Cái chết sau sự thật - PHẦN 2: TRẢ GIÀY LẠI CHO NẠN NHÂN",
    duration: "8 phút",
    views: 88,
  },
  {
    id: 2,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Truy tìm kẻ sát nhân - PHẦN 2: MẶT NẠ TỰ VỠ",
    duration: "8 phút",
    views: 54,
  },
  {
    id: 3,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Trả thù - PHẦN 2: GIẢI MÃ LỜI THỀ",
    duration: "13 phút",
    views: 34,
  },
  {
    id: 4,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Cái chết sau sự thật- PHẦN 1: BÁO MỘNG",
    duration: "7 phút",
    views: 120,
  },
  {
    id: 5,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Quan hệ tình dục với vị thành niên",
    duration: "6 phút",
    views: 127,
  },
  {
    id: 6,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Truy tìm kẻ sát nhân- PHẦN 1: MẶT NẠ ĐEN",
    duration: "8 phút",
    views: 118,
  },
  {
    id: 7,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Quan hệ tình dục với vị thành niên",
    duration: "6 phút",
    views: 127,
  },
  {
    id: 8,
    thumbnail: "/images/meclip.jpeg",
    title: "Vụ án: Truy tìm kẻ sát nhân- PHẦN 1: MẶT NẠ ĐEN",
    duration: "8 phút",
    views: 118,
  },
];
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 18px;
  width: 100%;
  padding: 8px 0;
  /* Đảm bảo tối đa 5 cột */
  grid-template-columns: repeat(5, 1fr);
}
.video-item {
  width: 100%;
  max-width: unset;
  flex: unset;
}
@media (max-width: 1200px) {
  .video-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .section-title {
    font-size: 1.1rem;
  }
}
</style>
