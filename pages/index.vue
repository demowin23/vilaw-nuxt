<template>
  <div class="w-full px-4">
    <HotVideo :videos="hotVideos" />
    <div class="flex gap-4">
      <div class="w-3/4">
        <NewVideo />
        <SectionsVideo :topViews="topViews" title="Hình sự" />
        <SectionsVideo :topViews="topViews" title="Dân sự" />
        <SectionsVideo :topViews="topViews" title="Kinh doanh" />
        <SectionsVideo :topViews="topViews" title="Lao động" />
        <SectionsVideo :topViews="topViews" title="Đất đai" />
      </div>
      <div
        class="w-1/4 min-w-[100px] max-w-xs h-fit bg-white rounded-2xl p-4 grid grid-cols-2 gap-4"
      >
        <div
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
              >BÀI<br />TẬP<br />LUẬT</span
            >
          </div>
        </div>
        <div
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
              >ĐỀ<br />THI<br />LUẬT</span
            >
          </div>
        </div>
        <div
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
              >ÔN<br />THI<br />LUẬT</span
            >
          </div>
        </div>
        <div
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
              >SÁCH<br />LUẬT</span
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

const hotVideos = [
  {
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Án lệ số 23/2018/AL về hiệu lực của hợp đồng",
  },
  {
    thumbnail: "/images/meclip.jpeg",
    title: "Án lệ số 24/2018/AL về tranh chấp đất đai",
  },
  {
    thumbnail: "/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
    title: "Án lệ số 25/2018/AL về quyền thừa kế",
  },
  {
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Án lệ số 26/2018/AL về hợp đồng lao động",
  },
  {
    thumbnail: "/images/meclip.jpeg",
    title: "Án lệ số 27/2018/AL về bồi thường thiệt hại",
  },
  {
    thumbnail: "/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
    title: "Án lệ số 28/2018/AL về tranh chấp kinh doanh",
  },
  {
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Án lệ số 29/2018/AL về hợp đồng dân sự",
  },
  {
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Án lệ số 29/2018/AL về hợp đồng dân sự",
  },
  {
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Án lệ số 29/2018/AL về hợp đồng dân sự",
  },
  {
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Án lệ số 29/2018/AL về hợp đồng dân sự",
  },
  {
    thumbnail: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
    title: "Án lệ số 29/2018/AL về hợp đồng dân sự",
  },
];

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
</script>
