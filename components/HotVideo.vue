<template>
  <div class="hot-video-list">
    <Swiper
      :slides-per-view="getSlidesPerView"
      class="hot-video-swiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(item, idx) in videos" :key="idx">
        <div
          class="hot-video-item"
          :style="{ backgroundImage: `url('${item.thumbnail}')` }"
          @click="goToVideoDetail(item.id)"
          role="button"
          tabindex="0"
          @keydown.enter="goToVideoDetail(item.id)"
          @keydown.space="goToVideoDetail(item.id)"
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

const router = useRouter();

const sidebarStore = useSidebarStore();
const { isOpenSidebar } = storeToRefs(sidebarStore);

interface HotVideoItem {
  id: string | number;
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
    // Mobile Small (375px - 480px): 3 items
    if (windowWidth.value <= 480) return 3;
    // Mobile Medium (481px - 600px): 3 items
    if (windowWidth.value <= 600) return 3;
    // Mobile Large (601px - 768px): 4 items
    if (windowWidth.value <= 768) return 4;
    // Tablet Small (769px - 900px): 4 items
    if (windowWidth.value <= 900) return 4;
    // Tablet Medium (901px - 1024px): 5 items
    if (windowWidth.value <= 1024) return 5;
    // Tablet Large (1025px - 1250px): 5-6 items
    if (windowWidth.value <= 1250) return isOpenSidebar.value ? 5 : 6;
    // Desktop Small (1251px - 1500px): 6-7 items
    if (windowWidth.value <= 1500) return isOpenSidebar.value ? 5 : 6;
    // Desktop Medium (1501px - 1800px): 7-8 items
    if (windowWidth.value <= 1800) return 6;
    // Desktop Large (1801px+): 8-9 items
    return isOpenSidebar.value ? 6 : 7;
  }
  // Fallback for SSR
  return 3;
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

const goToVideoDetail = (videoId: string | number) => {
  router.push(`/video/${videoId}`);
};
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
  width: 90px;
  height: 135px;
  background-size: cover;
  background-position: center;
  border-radius: 14px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 90px;
  min-height: 135px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.hot-video-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.hot-video-item:focus {
  outline: 2px solid #f58220;
  outline-offset: 2px;
}

.hot-video-item:active {
  transform: translateY(0);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
}
.hot-video-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 8px 4px 0 4px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 2;
  pointer-events: none;
}

/* Mobile Small (375px - 480px) */
@media (min-width: 375px) {
  .hot-video-item {
    width: 95px;
    height: 143px;
    min-width: 95px;
    min-height: 143px;
    border-radius: 16px;
  }
  .hot-video-title {
    font-size: 0.9rem;
    padding: 10px 6px 0 6px;
  }
}

/* Mobile Medium (481px - 600px) */
@media (min-width: 481px) {
  .hot-video-item {
    width: 100px;
    height: 150px;
    min-width: 100px;
    min-height: 150px;
  }
  .hot-video-title {
    font-size: 0.95rem;
    padding: 10px 6px 0 6px;
  }
}

/* Mobile Large (601px - 768px) */
@media (min-width: 601px) {
  .hot-video-item {
    width: 120px;
    height: 180px;
    min-width: 120px;
    min-height: 180px;
  }
  .hot-video-title {
    font-size: 1rem;
    padding: 12px 8px 0 8px;
  }
}

/* Tablet Small (769px - 900px) */
@media (min-width: 769px) {
  .hot-video-item {
    width: 130px;
    height: 195px;
    min-width: 130px;
    min-height: 195px;
    border-radius: 18px;
  }
  .hot-video-title {
    font-size: 1.05rem;
    padding: 12px 8px 0 8px;
  }
}

/* Tablet Medium (901px - 1024px) */
@media (min-width: 901px) {
  .hot-video-item {
    width: 150px;
    height: 225px;
    min-width: 150px;
    min-height: 225px;
  }
  .hot-video-title {
    font-size: 1.1rem;
    padding: 14px 10px 0 10px;
  }
}

/* Tablet Large (1025px - 1250px) */
@media (min-width: 1025px) {
  .hot-video-item {
    width: 165px;
    height: 248px;
    min-width: 165px;
    min-height: 248px;
  }
  .hot-video-title {
    font-size: 1.15rem;
    padding: 14px 10px 0 10px;
  }
}

/* Desktop Small (1251px - 1500px) */
@media (min-width: 1251px) {
  .hot-video-item {
    width: 180px;
    height: 270px;
    min-width: 180px;
    min-height: 270px;
  }
  .hot-video-title {
    font-size: 1.2rem;
    padding: 16px 12px 0 12px;
  }
}

/* Desktop Medium (1501px - 1800px) */
@media (min-width: 1501px) {
  .hot-video-item {
    width: 200px;
    height: 300px;
    min-width: 200px;
    min-height: 300px;
  }
  .hot-video-title {
    font-size: 1.25rem;
    padding: 18px 14px 0 14px;
  }
}

/* Desktop Large (1801px+) */
@media (min-width: 1801px) {
  .hot-video-item {
    width: 220px;
    height: 330px;
    min-width: 220px;
    min-height: 330px;
  }
  .hot-video-title {
    font-size: 1.3rem;
    padding: 20px 16px 0 16px;
  }
}
</style>
