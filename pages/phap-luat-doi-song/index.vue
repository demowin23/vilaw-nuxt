<template>
  <VideoList
    :videos="videosDanSu"
    title="Dân sự - Thừa kế - Hôn nhân và gia đình"
  />
  <VideoList :videos="videosHinhSu" title="Hình sự" />
  <VideoList :videos="videosTranhChap" title="Giải quyết tranh chấp" />
  <VideoList :videos="videosThuongMai" title="Kinh doanh và thương mại" />
  <VideoList :videos="videosLaoDong" title="Lao động" />
  <VideoList :videos="videosDatDai" title="Đất đai" />
  <VideoList :videos="videosKhac" title="Khác" />
</template>

<script setup lang="ts">
import VideoList from "~/components/VideoList.vue";
import { useVideoLifeLaw } from "~/composables/useVideoLifeLaw";
import { onMounted, ref } from "vue";

const videosHinhSu = ref([]);
const videosDanSu = ref([]);
const videosTranhChap = ref([]);
const videosThuongMai = ref([]);
const videosLaoDong = ref([]);
const videosDatDai = ref([]);
const videosKhac = ref([]);

const { getVideoLifeLaw } = useVideoLifeLaw();
onMounted(async () => {
  const [
    resDanSu,
    resHinhSu,
    resTranhChap,
    resThuongMai,
    resLaoDong,
    resDatDai,
    resKhac,
  ] = await Promise.all([
    getVideoLifeLaw({ type: "dan_su_thua_ke_hon_nhan_va_gia_dinh" }),
    getVideoLifeLaw({ type: "hinh_su" }),
    getVideoLifeLaw({ type: "giai_quyet_tranh_chap" }),
    getVideoLifeLaw({ type: "kinh_doanh_thuong_mai" }),
    getVideoLifeLaw({ type: "lao_dong" }),
    getVideoLifeLaw({ type: "dat_dai" }),
    getVideoLifeLaw({ type: "the_loai_khac" }),
  ]);
  videosDanSu.value = resDanSu.data;
  videosHinhSu.value = resHinhSu.data;
  videosTranhChap.value = resTranhChap.data;
  videosThuongMai.value = resThuongMai.data;
  videosLaoDong.value = resLaoDong.data;
  videosDatDai.value = resDatDai.data;
  videosKhac.value = resKhac.data;
});

// Set page SEO
useHead({
  title: "Video pháp luật đời sống",
  meta: [
    {
      name: "description",
      content:
        "Xem các video pháp luật đời sống với nội dung hướng dẫn chi tiết về các vấn đề pháp lý thường gặp. Từ dân sự, hình sự đến thương mại và đất đai.",
    },
    {
      name: "keywords",
      content:
        "video pháp luật, pháp luật đời sống, hướng dẫn pháp luật, luật dân sự, luật hình sự, luật thương mại, luật đất đai",
    },
  ],
});
</script>
