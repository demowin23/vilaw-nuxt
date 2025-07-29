<template>
  <div class="accounting-knowledge-page">
    <div class="header-section">
      <div class="title-container">
        <div class="title-accent"></div>
        <h1 class="main-title">Dân sự - Thừa kế - Hôn nhân và gia đình</h1>
      </div>
      <p class="description">
        Qua nội dung này, bạn có thể tìm câu trả lời cho tất cả các thắc mắc về
        dân sự, thừa kế, hôn nhân và gia đình...
      </p>
    </div>
    <KienThuc :KienThuc="KienThucDanSu" />

    <div class="header-section">
      <div class="title-container">
        <div class="title-accent"></div>
        <h1 class="main-title">Hình sự</h1>
      </div>
      <p class="description">
        Qua nội dung này, bạn có thể tìm câu trả lời cho tất cả các thắc mắc về
        hình sự...
      </p>
    </div>
    <KienThuc :KienThuc="KienThucHinhSu" />

    <div class="header-section">
      <div class="title-container">
        <div class="title-accent"></div>
        <h1 class="main-title">Giải quyết tranh chấp</h1>
      </div>
      <p class="description">
        Qua nội dung này, bạn có thể tìm câu trả lời cho tất cả các thắc mắc về
        giải quyết tranh chấp...
      </p>
    </div>
    <KienThuc :KienThuc="KienThucTranhChap" />

    <div class="header-section">
      <div class="title-container">
        <div class="title-accent"></div>
        <h1 class="main-title">Kinh doanh thương mại</h1>
      </div>
      <p class="description">
        Qua nội dung này, bạn có thể tìm câu trả lời cho tất cả các thắc mắc về
        kinh doanh thương mại...
      </p>
    </div>
    <KienThuc :KienThuc="KienThucThuongMai" />

    <div class="header-section">
      <div class="title-container">
        <div class="title-accent"></div>
        <h1 class="main-title">Lao động</h1>
      </div>
      <p class="description">
        Qua nội dung này, bạn có thể tìm câu trả lời cho tất cả các thắc mắc về
        lao động...
      </p>
    </div>
    <KienThuc :KienThuc="KienThucLaoDong" />

    <div class="header-section">
      <div class="title-container">
        <div class="title-accent"></div>
        <h1 class="main-title">Đất đai</h1>
      </div>
      <p class="description">
        Qua nội dung này, bạn có thể tìm câu trả lời cho tất cả các thắc mắc về
        đất đai...
      </p>
    </div>
    <KienThuc :KienThuc="KienThucDatDai" />

    <div class="header-section">
      <div class="title-container">
        <div class="title-accent"></div>
        <h1 class="main-title">Thể loại khác</h1>
      </div>
      <p class="description">
        Qua nội dung này, bạn có thể tìm câu trả lời cho tất cả các thắc mắc về
        thể loại khác...
      </p>
    </div>
    <KienThuc :KienThuc="KienThucKhac" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSidebarStore } from "~/stores/sidebar";
import { useLegalKnowledge } from "~/composables/useLegalKnowledge";
import KienThuc from "~/components/KienThuc.vue";
const sidebarStore = useSidebarStore();
const route = useRoute();
const { getLegalKnowledge } = useLegalKnowledge();

const knowledgeList = ref<any[]>([]);
const getImageUrl = (image: string) => {
  return `http://localhost:4000${image}`;
};
const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: "Đã xuất bản",
    draft: "Bản nháp",
    archived: "Đã lưu trữ",
  };
  return labels[status] || status;
};

const KienThucHinhSu = ref([]);
const KienThucDanSu = ref([]);
const KienThucTranhChap = ref([]);
const KienThucThuongMai = ref([]);
const KienThucLaoDong = ref([]);
const KienThucDatDai = ref([]);
const KienThucKhac = ref([]);
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
    getLegalKnowledge({ category: "dan_su_thua_ke_hon_nhan_va_gia_dinh" }),
    getLegalKnowledge({ category: "hinh_su" }),
    getLegalKnowledge({ category: "giai_quyet_tranh_chap" }),
    getLegalKnowledge({ category: "kinh_doanh_thuong_mai" }),
    getLegalKnowledge({ category: "lao_dong" }),
    getLegalKnowledge({ category: "dat_dai" }),
    getLegalKnowledge({ category: "the_loai_khac" }),
  ]);
  KienThucDanSu.value = resDanSu.data;
  KienThucHinhSu.value = resHinhSu.data;
  KienThucTranhChap.value = resTranhChap.data;
  KienThucThuongMai.value = resThuongMai.data;
  KienThucLaoDong.value = resLaoDong.data;
  KienThucDatDai.value = resDatDai.data;
  KienThucKhac.value = resKhac.data;
});
</script>

<style scoped>
.card-description {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}
.accounting-knowledge-page {
  padding: 40px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Header Section */
.header-section {
  margin-bottom: 60px;
}

.title-container {
  border-bottom: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.title-accent {
  width: 4px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  margin-right: 15px;
  border-radius: 2px;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0;
}

.description {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
}

.card-illustration {
  flex: 1;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.illustration-image:hover {
  transform: scale(1.05);
}

/* Button Styles */
.view-details-btn {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: auto;
}

.view-details-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .main-title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .card-content {
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .accounting-knowledge-page {
    padding: 20px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }
}
</style>
