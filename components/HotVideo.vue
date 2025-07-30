<template>
  <div class="hot-video-list">
    <Swiper
      :slides-per-view="getSlidesPerView"
      :space-between="12"
      class="hot-video-swiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(item, idx) in videos" :key="idx">
        <div
          class="hot-video-item"
          :style="{ backgroundImage: `url('${item.thumbnail}')` }"
        ></div>
      </SwiperSlide>
    </Swiper>
    <div class="hot-video-progress-bar">
      <div
        class="hot-video-progress"
        :style="{ width: progressWidth + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from "~/stores/sidebar";
import { storeToRefs } from "pinia";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

const sidebarStore = useSidebarStore();
const { isOpenSidebar } = storeToRefs(sidebarStore);

interface HotVideoItem {
  thumbnail: string;
  title: string;
}

const props = defineProps<{
  videos: HotVideoItem[];
}>();

const swiperRef = ref<any>(null);
const activeIndex = ref(0);
const windowWidth = ref(1024); // Default fallback value

const totalSlides = computed(() => props.videos.length);

const getSlidesPerView = computed(() => {
  // Check if we're on client side
  if (process.client) {
    if (windowWidth.value <= 768) return isOpenSidebar.value ? 3 : 4;
    if (windowWidth.value <= 1028) return isOpenSidebar.value ? 5 : 6;
    if (windowWidth.value <= 1250) return isOpenSidebar.value ? 5 : 6;
    return isOpenSidebar.value ? 6 : 7;
  }
  // Fallback for SSR
  return 4;
});

const updateWindowWidth = () => {
  if (process.client) {
    windowWidth.value = window.innerWidth;
  }
};

onMounted(() => {
  if (process.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", updateWindowWidth);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("resize", updateWindowWidth);
  }
});

const onSwiper = (swiper: any) => {
  swiperRef.value = swiper;
};

const onSlideChange = (swiper: any) => {
  activeIndex.value = swiper.activeIndex;
};

const progressWidth = computed(() => {
  const visible = getSlidesPerView.value;
  const total = totalSlides.value;
  if (total <= visible) return 100;
  return (activeIndex.value / (total - visible)) * 100;
});
</script>

<style scoped>
.hot-video-list {
  padding: 12px 0;
  box-sizing: border-box;
}
.hot-video-swiper {
  width: 100%;
}
.hot-video-progress-bar {
  width: 100%;
  height: 4px;
  background: #ececec;
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}
@media (prefers-color-scheme: dark) {
  .hot-video-progress-bar {
    background: #374151;
  }
}
.dark .hot-video-progress-bar {
  background: #374151;
}
.hot-video-progress {
  height: 100%;
  background: #f58220;
  border-radius: 2px;
  transition: width 0.3s;
}
.hot-video-item {
  position: relative;
  width: 100px;
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 100px;
  min-height: 150px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.hot-video-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 6px 0 6px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 2;
  pointer-events: none;
}
@media (min-width: 769px) {
  .hot-video-item {
    width: 120px;
    height: 180px;
    min-width: 120px;
    min-height: 180px;
  }
}
@media (min-width: 1025px) {
  .hot-video-item {
    width: 150px;
    height: 225px;
    min-width: 150px;
    min-height: 225px;
  }
}
@media (min-width: 1201px) {
  .hot-video-item {
    width: 179px;
    height: 270px;
    min-width: 179px;
    min-height: 270px;
  }
}
</style>
