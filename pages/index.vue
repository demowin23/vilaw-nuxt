<template>
  <div class="w-full px-4">
    <HotVideo :videos="hotVideos" />
    <div class="flex gap-4">
      <div class="lg:w-3/4 w-full">
        <NewVideo />
        <SectionsVideo :topViews="videosHinhSu" title="Hình sự" />
        <SectionsVideo
          :topViews="videosDanSu"
          title="Dân sự - Thừa kế - Hôn nhân và gia đình"
        />
        <SectionsVideo
          :topViews="videosTranhChap"
          title="Giải quyết tranh chấp"
        />
        <SectionsVideo
          :topViews="videosThuongMai"
          title="Kinh doanh và thương mại"
        />
        <SectionsVideo :topViews="videosDatDai" title="Đất đai" />
        <SectionsVideo :topViews="videosKhac" title="Khác" />
      </div>
      <div
        class="w-1/4 hidden lg:grid mt-[50px] min-w-[100px] max-w-xs h-fit bg-white dark:bg-gray-800 rounded-2xl p-4 grid-cols-2 gap-4 transition-colors duration-300"
      >
        <div
          @click="handleClick('mua-goi')"
          class="relative group rounded-2xl overflow-hidden h-48 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
        >
          <img
            src="/images/bai-tap-luat.webp"
            class="w-full h-full object-cover"
            alt="Bài tập luật"
          />
          <div
            class="absolute top-0 left-0 w-full h-full flex items-start justify-center items-center"
          >
            <span
              class="text-white font-bold text-lg md:text-xl text-center mt-4 drop-shadow-lg"
            >
              TƯ<br />VẤN<br />LUẬT</span
            >
          </div>
        </div>
        <div
          @click="handleClick('phap-luat-doi-song')"
          class="relative group rounded-2xl overflow-hidden h-48 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
        >
          <img
            src="/images/de-thi-luat.webp"
            class="w-full h-full object-cover"
            alt="Đề thi luật"
          />
          <div
            class="absolute top-0 left-0 w-full h-full flex items-start justify-center items-center"
          >
            <span
              class="text-white font-bold text-lg md:text-xl text-center mt-4 drop-shadow-lg"
              >VIDEO</span
            >
          </div>
        </div>
        <div
          @click="handleClick('chat-luat-su')"
          class="relative group rounded-2xl overflow-hidden h-48 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
        >
          <img
            src="/images/on-thi-luat.webp"
            class="w-full h-full object-cover"
            alt="Ôn thi luật"
          />
          <div
            class="absolute top-0 left-0 w-full h-full flex items-start justify-center items-center"
          >
            <span
              class="text-white font-bold text-lg md:text-xl text-center mt-4 drop-shadow-lg"
              >CHAT<br />VƠI<br />LUẬT<br />SƯ</span
            >
          </div>
        </div>
        <div
          @click="handleClick('kien-thuc')"
          class="relative group rounded-2xl overflow-hidden h-48 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
        >
          <img
            src="/images/sach-luat.webp"
            class="w-full h-full object-cover"
            alt="Sách luật"
          />
          <div
            class="absolute top-0 left-0 w-full h-full flex items-start justify-center items-center"
          >
            <span
              class="text-white font-bold text-lg md:text-xl text-center mt-4 drop-shadow-lg"
              >KIẾN<br />THỨC<br />PHÁP<br />LUẬT</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HotVideo from "~/components/HotVideo.vue";
import NewVideo from "~/components/NewVideo.vue";
import SectionsVideo from "~/components/SectionsVideo.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useVideoStore } from "~/stores/video";
import { useRouter } from "vue-router";

const router = useRouter();

const videoStore = useVideoStore();
const videosHinhSu = ref([]);
const videosDanSu = ref([]);
const videosTranhChap = ref([]);
const videosThuongMai = ref([]);
const videosLaoDong = ref([]);
const videosDatDai = ref([]);
const videosKhac = ref([]);

onMounted(async () => {
  try {
    // Fetch most viewed videos for hot videos section
    await videoStore.fetchMostViewedVideos(10);

    // Fetch videos by type for different sections
    const [
      resDanSu,
      resHinhSu,
      resTranhChap,
      resThuongMai,
      resLaoDong,
      resDatDai,
      resKhac,
    ] = await Promise.all([
      videoStore.fetchVideosByType("dan_su_thua_ke_hon_nhan_va_gia_dinh", 6),
      videoStore.fetchVideosByType("hinh_su", 6),
      videoStore.fetchVideosByType("giai_quyet_tranh_chap", 6),
      videoStore.fetchVideosByType("kinh_doanh_thuong_mai", 6),
      videoStore.fetchVideosByType("lao_dong", 6),
      videoStore.fetchVideosByType("dat_dai", 6),
      videoStore.fetchVideosByType("the_loai_khac", 6),
    ]);

    videosDanSu.value = resDanSu;
    videosHinhSu.value = resHinhSu;
    videosTranhChap.value = resTranhChap;
    videosThuongMai.value = resThuongMai;
    videosLaoDong.value = resLaoDong;
    videosDatDai.value = resDatDai;
    videosKhac.value = resKhac;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
});

// Use most viewed videos from store for hot videos
const hotVideos = computed(() => {
  return videoStore.mostViewedVideos.map((video) => ({
    thumbnail: video.thumbnail,
    title: video.title,
    id: video.id,
  }));
});

const topViews = [
  {
    icon: "/images/bai-tap-luat.webp",
    title: "Người thứ ba ngay tình trong giao dịch dân sự là gì?",
    views: 73,
    bg: "bg-yellow-50",
    badgeBg: "bg-orange-400",
  },
  {
    icon: "/images/de-thi-luat.webp",
    title:
      "Điều kiện, nội dung và hậu quả của áp dụng tập quán trong pháp luật Việt Nam",
    views: 47,
    bg: "bg-orange-100",
    badgeBg: "bg-orange-600",
  },
  {
    icon: "/images/on-thi-luat.webp",
    title: "Tóm tắt 01 bản án về bảo vệ người thứ ba ngay tình",
    views: 37,
    bg: "bg-blue-200",
    badgeBg: "bg-blue-400",
  },
  {
    icon: "/images/n.png",
    title: "Phân tích hậu quả pháp lý của giao dịch dân sự vô hiệu",
    views: 33,
    bg: "bg-blue-100",
    badgeBg: "bg-blue-500",
  },
  {
    icon: "/images/n.png",
    title:
      "Phân tích Quy định Pháp luật về Quyền đòi lại Tài sản của Chủ sở hữu",
    views: 24,
    bg: "bg-blue-300",
    badgeBg: "bg-blue-600",
  },
  {
    icon: "/images/sach-luat.webp",
    title: "[Tiểu luận] Giao Dịch Dân Sự Vô Hiệu Do Không Tuân Thủ Hình Thức",
    views: 17,
    bg: "bg-green-100",
    badgeBg: "bg-green-500",
  },
];

const handleClick = (type: string) => {
  router.push(`/${type}`);
};

// Set page SEO
useHead({
  title: 'Trang chủ',
  meta: [
    {
      name: 'description',
      content: 'VILAW - Nền tảng pháp luật trực tuyến hàng đầu Việt Nam. Cung cấp kiến thức pháp luật, video hướng dẫn, văn bản pháp luật và dịch vụ tư vấn pháp lý chuyên nghiệp.'
    },
    {
      name: 'keywords',
      content: 'pháp luật, kiến thức pháp luật, video pháp luật, văn bản pháp luật, tư vấn pháp lý, luật sư, dịch vụ pháp lý, VILAW'
    }
  ]
});
</script>
