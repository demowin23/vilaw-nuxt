<template>
  <div class="bg-white rounded-xl border-2 shadow-lg">
    <div class="w-full h-64 md:h-80 lg:h-96 relative overflow-hidden">
      <img
        src="/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp"
        alt="Banner"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- White Box with Orange Border -->
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-xl border-2 border-orange-400 p-8 shadow-lg">
        <h1
          class="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-6"
        >
          {{ sidebarStore.currentTitle }}
        </h1>
        <p class="text-gray-800 text-lg leading-relaxed text-left">
          Chia sẻ kinh nghiệm về thành lập công ty cổ phần, công ty TNHH, doanh
          nghiệp có vốn đầu tư nước ngoài... & các yêu cầu pháp lý khi xin giấy
          phép kinh doanh.
        </p>
      </div>
    </div>

    <!-- Featured Services Section -->
    <div class="container mx-auto px-4 pb-8">
      <!-- Section Heading -->
      <div class="flex items-center mb-6">
        <div class="w-1 h-8 bg-[#FF6600] mr-4"></div>
        <h2 class="text-2xl font-bold text-gray-800">Bài viết nổi bật</h2>
      </div>

      <!-- Two Equal Columns Layout -->
      <div class="grid lg:grid-cols-2 gap-4">
        <!-- Large Featured Service Card (Left) -->
        <div v-if="featuredArticles.length > 0">
          <div
            class="bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col"
          >
            <!-- Image -->
            <img
              :src="getImageUrl(featuredArticles[0].image)"
              :alt="featuredArticles[0].title"
              class="w-full h-64 object-cover rounded-t-xl"
            />

            <!-- Content -->
            <div class="p-4 flex-1 flex flex-col">
              <h3 class="text-xl font-bold text-gray-800 mb-3">
                {{ featuredArticles[0].title }}
              </h3>

              <p class="text-gray-600 mb-4 leading-relaxed flex-1">
                {{ featuredArticles[0].summary }}
              </p>

              <a
                :href="`/kien-thuc/chi-tiet/${featuredArticles[0].id}`"
                class="text-[#FF6600] font-semibold hover:underline flex items-center mt-auto"
              >
                Xem chi tiết
                <span class="ml-1">>></span>
              </a>
            </div>
          </div>
        </div>

        <!-- Four Smaller Service Cards (Right) - 2x2 Grid -->
        <div class="grid grid-cols-2 gap-4 h-full">
          <!-- Card 1: Second featured article (Top Left) -->
          <div
            v-if="featuredArticles.length > 1"
            class="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col"
          >
            <img
              :src="getImageUrl(featuredArticles[1].image)"
              :alt="featuredArticles[1].title"
              class="w-full h-32 object-cover rounded-t-xl"
            />
            <div class="p-4 flex-1 flex flex-col">
              <h4 class="font-bold text-gray-800 text-sm">
                {{ featuredArticles[1].title }}
              </h4>
            </div>
          </div>

          <!-- Card 2: Third featured article (Top Right) -->
          <div
            v-if="featuredArticles.length > 2"
            class="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col"
          >
            <img
              :src="getImageUrl(featuredArticles[2].image)"
              :alt="featuredArticles[2].title"
              class="w-full h-32 object-cover rounded-t-xl"
            />
            <div class="p-4 flex-1 flex flex-col">
              <h4 class="font-bold text-gray-800 text-sm">
                {{ featuredArticles[2].title }}
              </h4>
            </div>
          </div>

          <!-- Card 3: Fourth featured article (Bottom Left) -->
          <div
            v-if="featuredArticles.length > 3"
            class="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col"
          >
            <img
              :src="getImageUrl(featuredArticles[3].image)"
              :alt="featuredArticles[3].title"
              class="w-full h-32 object-cover rounded-t-xl"
            />
            <div class="p-4 flex-1 flex flex-col">
              <h4 class="font-bold text-gray-800 text-sm">
                {{ featuredArticles[3].title }}
              </h4>
            </div>
          </div>

          <!-- Card 4: Fifth featured article (Bottom Right) -->
          <div
            v-if="featuredArticles.length > 4"
            class="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col"
          >
            <img
              :src="getImageUrl(featuredArticles[4].image)"
              :alt="featuredArticles[4].title"
              class="w-full h-32 object-cover rounded-t-xl"
            />
            <div class="p-4 flex-1 flex flex-col">
              <h4 class="font-bold text-gray-800 text-sm">
                {{ featuredArticles[4].title }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Article List Section -->
    <div class="container mx-auto px-4 pb-8">
      <!-- Section Heading -->
      <div class="flex items-center mb-8">
        <div class="w-1 h-8 bg-red-500 mr-4"></div>
        <h2 class="text-2xl font-bold text-gray-800">Danh sách bài viết</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(article, index) in knowledgeList"
          :key="index"
          class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div class="flex p-2">
            <!-- Image -->
            <div class="w-28 h-24 flex-shrink-0">
              <img
                :src="getImageUrl(article.image)"
                :alt="article.title"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Text Content -->
            <div class="px-4 flex-1">
              <h3
                class="font-bold text-gray-800 text-sm leading-tight line-clamp-2"
              >
                {{ article.title }}
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {{ article.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination Section -->
    <div class="container mx-auto px-4 pb-8">
      <div class="flex justify-center items-center space-x-2">
        <!-- Previous Button -->
        <button
          class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === 1"
          @click="currentPage > 1 && currentPage--"
        >
          Trước
        </button>

        <!-- Page Numbers -->
        <div class="flex space-x-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="
              page === currentPage
                ? 'bg-[#FF6600] text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
            "
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === totalPages"
          @click="currentPage < totalPages && currentPage++"
        >
          Sau
        </button>
      </div>

      <!-- Page Info -->
      <div class="text-center mt-4 text-sm text-gray-600">
        Trang {{ currentPage }} của {{ totalPages }} ({{ totalArticles }} bài
        viết)
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSidebarStore } from "~/stores/sidebar";
import { useLegalKnowledge } from "~/composables/useLegalKnowledge";

const sidebarStore = useSidebarStore();
const route = useRoute();
const { getLegalKnowledge, getFeaturedLegalKnowledge } = useLegalKnowledge();

const knowledgeList = ref<any[]>([]);
import { getImageUrl } from "~/utils/config";

const featuredArticles = ref<any[]>([]);
const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: "Đã xuất bản",
    draft: "Bản nháp",
    archived: "Đã lưu trữ",
  };
  return labels[status] || status;
};

const routeTitles: Record<string, string> = {
  dan_su_thua_ke_hon_nhan_va_gia_dinh:
    "Dân sự – Thừa kế – Hôn nhân và gia đình",
  hinh_su: "Hình sự",
  giai_quyet_tranh_chap: "Giải quyết tranh chấp",
  kinh_doanh_thuong_mai: "Kinh doanh thương mại",
  lao_dong: "Lao động",
  dat_dai: "Đất đai",
  the_loai_khac: "Thể loại khác",
};

onMounted(async () => {
  const routeId = route.params.id;
  if (routeTitles[routeId]) {
    sidebarStore.setTitle(routeTitles[routeId]);
  }

  // Fetch regular knowledge articles
  const response = await getLegalKnowledge({
    category: routeId,
  });
  knowledgeList.value = response.data;

  // Fetch featured articles
  try {
    const featuredResponse = await getFeaturedLegalKnowledge({
      limit: 5, // Get 5 featured articles
    });
    featuredArticles.value = featuredResponse.data;
  } catch (error) {
    console.error("Error fetching featured articles:", error);
    // Fallback to empty array if API fails
    featuredArticles.value = [];
  }
});

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 9;

// Mock data for articles
const articles = [
  {
    title: "Các lợi ích khi hộ kinh doanh chuyển lên doanh nghiệp là gì?",
    image: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
  },
  {
    title: "8 điểm mới của Luật Doanh nghiệp 2025 từ ngày 01/07/2025",
    image: "/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
  },
  {
    title: "Mẫu hồ sơ quản lý công tác PCCC tại cơ sở - từ 01/07/2025",
    image: "/images/bai-tap-luat.webp",
  },
  {
    title: "Điều kiện, cách kinh doanh airbnb, cho thuê nhà airbnb là gì?",
    image: "/images/de-thi-luat.webp",
  },
  {
    title: "Cách đăng ký thuế online cho hộ gia đình/cá nhân kinh doanh",
    image: "/images/sach-luat.webp",
  },
  {
    title: "Quy định và thủ tục xin giấy phép PCCC trung tâm ngoại ngữ",
    image: "/images/on-thi-luat.webp",
  },
  {
    title: "Mở tài khoản Định Danh Điện Tử cho doanh nghiệp trên DVC",
    image: "/images/meclip.jpeg",
  },
  {
    title: "Có nên thuê văn phòng ảo hay mượn nhà làm trụ sở công ty?",
    image: "/images/n.png",
  },
  {
    title: "Conditions & procedures for setting up a company in Vietnam",
    image: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
  },
  {
    title: "Hướng dẫn thủ tục đăng ký kinh doanh online năm 2025",
    image: "/images/bai-tap-luat.webp",
  },
  {
    title: "Quy định về vốn điều lệ khi thành lập doanh nghiệp mới",
    image: "/images/de-thi-luat.webp",
  },
  {
    title: "Thủ tục xin cấp giấy phép kinh doanh rượu bia tại Việt Nam",
    image: "/images/sach-luat.webp",
  },
  {
    title: "Điều kiện và thủ tục thành lập công ty xuất nhập khẩu",
    image: "/images/on-thi-luat.webp",
  },
  {
    title: "Hướng dẫn đăng ký thuế điện tử cho doanh nghiệp mới",
    image: "/images/meclip.jpeg",
  },
  {
    title: "Quy định về đặt tên công ty theo Luật Doanh nghiệp 2025",
    image: "/images/n.png",
  },
  {
    title: "Thủ tục chuyển đổi từ hộ kinh doanh lên doanh nghiệp",
    image: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
  },
  {
    title: "Hướng dẫn đăng ký mã số doanh nghiệp (MSDN)",
    image: "/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
  },
  {
    title: "Quy định về trụ sở công ty theo Luật Doanh nghiệp",
    image: "/images/bai-tap-luat.webp",
  },
  {
    title: "Thủ tục xin cấp giấy phép kinh doanh dịch vụ karaoke",
    image: "/images/de-thi-luat.webp",
  },
  {
    title: "Hướng dẫn đăng ký bảo hiểm xã hội cho nhân viên",
    image: "/images/sach-luat.webp",
  },
  {
    title: "Quy định về vốn pháp định trong một số ngành nghề",
    image: "/images/on-thi-luat.webp",
  },
  {
    title: "Thủ tục xin cấp giấy phép kinh doanh dịch vụ vận tải",
    image: "/images/meclip.jpeg",
  },
  {
    title: "Hướng dẫn đăng ký tài khoản ngân hàng cho doanh nghiệp",
    image: "/images/n.png",
  },
  {
    title: "Quy định về con dấu công ty theo Luật Doanh nghiệp",
    image: "/images/dich-vu-cua-chung-toi.BYo7SAj4_Z1tJAQ9.webp",
  },
  {
    title: "Thủ tục xin cấp giấy phép kinh doanh dịch vụ spa",
    image: "/images/ton-chi-hoat-dong.DKjQaDsR_1Y6nqo.webp",
  },
  {
    title: "Hướng dẫn đăng ký mã số doanh nghiệp (MSDN)",
    image: "/images/bai-tap-luat.webp",
  },
];

// Computed properties for pagination
const totalArticles = ref(articles.length);
const totalPages = ref(Math.ceil(totalArticles.value / itemsPerPage));

const paginatedArticles = ref(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return articles.slice(start, end);
});

const visiblePages = ref(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<style scoped>
.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.knowledge-item {
  display: flex;
  gap: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  align-items: flex-start;
}
.knowledge-image {
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.knowledge-content {
  flex: 1;
}
.knowledge-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  color: #222;
}
.knowledge-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 0.5rem;
  align-items: center;
}
.featured-badge {
  background: #ff9800;
  color: #fff;
  border-radius: 12px;
  padding: 0.2rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
}
.knowledge-summary {
  color: #444;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
