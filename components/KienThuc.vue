<template>
  <div class="cards-grid">
    <div class="card" v-for="item in KienThuc" :key="item.id">
      <div class="card-content">
        <div class="card-illustration">
          <img
            :src="getImageUrl(item.image)"
            :alt="item.title"
            class="illustration-image"
          />
        </div>
        <div class="p-3 h-[145px] relative">
          <div>
            <h3 class="card-title line-clamp-2">{{ item.title }}</h3>
            <p class="card-description line-clamp-2">{{ item.summary }}</p>
          </div>
          <a
            :href="`/kien-thuc/chi-tiet/${item.id}-${slugify(item.title)}`"
            class="text-[#FF6600] font-semibold hover:underline flex items-center absolute bottom-3 right-3"
          >
            Xem chi tiết
            <span class="ml-1">&gt;&gt;</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getImageUrl } from "~/utils/config";
import { slugify } from "~/utils/slugify";

const { KienThuc } = defineProps<{
  KienThuc: any[];
}>();
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
.dark .card {
  background: #1f2937;
  color: #f9fafb;
}
.dark .card-title {
  color: #f9fafb;
}

.dark .card-description {
  color: #d1d5db;
}
.dark .card a {
  color: #fbbf24;
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
