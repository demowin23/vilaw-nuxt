<template>
  <div class="video-list">
    <div
      class="intro-text"
      style="margin-bottom: 18px; color: #444; font-size: 1.1rem"
    >
      Pháp luật đời sống Hình Sự là lĩnh vực điều chỉnh các quan hệ xã hội liên
      quan đến tội phạm, hình phạt và các biện pháp xử lý đối với người vi phạm
      pháp luật hình sự. Việc hiểu biết về pháp luật hình sự giúp mỗi cá nhân
      phòng tránh, bảo vệ quyền lợi hợp pháp và góp phần xây dựng xã hội an
      toàn, công bằng.
    </div>

    <div class="header-row">
      <h2 class="section-title">{{ title }}</h2>
    </div>
    <div class="video-grid-wrapper">
      <div class="video-grid">
        <VideoItem v-for="(item, idx) in videos" :key="idx" :item="item" />
      </div>
    </div>
    <div class="category-buttons mt-4">
      <NuxtLink
        v-for="item in videoTypes"
        :key="item.id"
        :to="`/phap-luat-doi-song/${item.slug}`"
        class="cat-btn"
        >{{ item.name }}</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoItem from "~/components/VideoItem.vue";
import { NuxtLink } from "#components";
import { useVideoLifeLaw } from "~/composables/useVideoLifeLaw";
import { onMounted, ref } from "vue";
const { getVideoLifeLaw } = useVideoLifeLaw();
let idRoute = useRoute().params.id;
const videos = ref([]);
const videoTypes = ref([
  {
    id: 1,
    name: "Dân sự – Thừa kế – Hôn nhân và gia đình",
    slug: "dan_su_thua_ke_hon_nhan_va_gia_dinh",
  },
  { id: 2, name: "Hình sự", slug: "hinh_su" },
  { id: 3, name: "Giải quyết tranh chấp", slug: "giai_quyet_tranh_chap" },
  { id: 4, name: "Kinh doanh thương mại", slug: "kinh_doanh_thuong_mai" },
  { id: 5, name: "Lao động", slug: "lao_dong" },
  { id: 6, name: "Đất đai", slug: "dat_dai" },
  { id: 7, name: "Thể loại khác", slug: "the_loai_khac" },
]);
let title = ref("");
onMounted(async () => {
  const type = idRoute.replace(/-/g, "_");
  const video = await getVideoLifeLaw({ type });
  videos.value = video.data;
  title.value = videoTypes.value.find((item) => item.slug === type)?.name;
});
</script>

<style scoped>
.video-list {
  padding: 24px 0 0 0;
}
.intro-text {
  background: #fff7ed;
  border-left: 6px solid #f58220;
  color: #d35400;
  font-size: 1.13rem;
  font-weight: 600;
  padding: 18px 22px;
  border-radius: 8px;
  margin-bottom: 18px;
  box-shadow: 0 2px 12px 0 rgba(245, 130, 32, 0.08);
  line-height: 1.6;
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
  border-left: 6px solid #f58220;
  padding-left: 10px;
  color: #f58220;
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
.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}
.cat-btn {
  background: #f58220;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 10px 22px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 rgba(245, 130, 32, 0.08);
  display: inline-block;
}
.cat-btn:hover {
  background: #ffa000;
  color: #fff;
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
