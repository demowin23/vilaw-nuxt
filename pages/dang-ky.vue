<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Đăng Ký Dịch Vụ
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Chọn gói dịch vụ phù hợp với nhu cầu của bạn
        </p>
      </div>

      <!-- Logo Section -->
      <div class="flex justify-center mb-8">
        <div class="relative">
          <img src="/images/logo.png" alt="Logo" class="h-12" />
        </div>
      </div>

      <!-- Message -->
      <div class="text-center mb-12">
        <p
          class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
        >
          Để xem nội dung này bạn cần đăng ký sử dụng gói dịch vụ của chúng tôi
        </p>
      </div>

      <!-- Title -->
      <h2
        class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center"
      >
        Danh sách gói cước
      </h2>

      <!-- Packages Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Gói Mua Lẻ -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="bg-orange-500 text-white px-6 py-4">
            <h3 class="font-bold text-xl text-center">Gói Mua Lẻ</h3>
          </div>
          <div class="p-6">
            <p
              class="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 min-h-[100px]"
            >
              Bạn được xem miễn phí nội dung Vụ án: Trả thù - PHẦN 2: GIẢI MÃ
              LỜI THỀ trong 24h kể từ thời điểm mua thành công.
            </p>
            <div class="text-center mb-6">
              <span class="text-orange-500 font-bold text-2xl"
                >3.000₫/24h/nội dung</span
              >
            </div>
            <button
              @click="handlePackageClick('individual')"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Đăng ký
            </button>
          </div>
        </div>

        <!-- Gói Pháp luật đời sống Ngày -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="bg-orange-500 text-white px-6 py-4">
            <h3 class="font-bold text-xl text-center">
              Gói Pháp luật đời sống Ngày
            </h3>
          </div>
          <div class="p-6">
            <p
              class="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 min-h-[100px]"
            >
              Bạn được miễn cước 3G/4G/5G và xem không giới hạn kho nội dung
              Pháp luật đời sống trong 1 ngày kể từ thời điểm đăng ký thành
              công.
            </p>
            <div class="text-center mb-6">
              <span class="text-orange-500 font-bold text-2xl"
                >3.000đ/1 ngày</span
              >
            </div>
            <button
              @click="handlePackageClick('daily')"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Đăng ký
            </button>
          </div>
        </div>

        <!-- Gói PLV8 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="bg-orange-500 text-white px-6 py-4">
            <h3 class="font-bold text-xl text-center">Gói PLV8</h3>
          </div>
          <div class="p-6">
            <p
              class="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6 min-h-[100px]"
            >
              Bạn có 2G tốc độ cao truy cập gói Pháp luật đời sống trong 1 ngày
              kể từ thời điểm đăng ký thành công.
            </p>
            <div class="text-center mb-6">
              <span class="text-orange-500 font-bold text-2xl"
                >8.000đ/1 ngày</span
              >
            </div>
            <button
              @click="handlePackageClick('plv8')"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-400 text-sm italic">
          (Chỉ áp dụng với thuê bao mạng VinaPhone mua gói Ngày/Tuần, miễn phí
          hoàn toàn cước 3G/4G/5G)
        </p>
      </div>

      <!-- Back to Login -->
      <div class="text-center mt-12">
        <NuxtLink
          to="/dang-nhap"
          class="inline-flex items-center text-[#f58220] hover:text-[#e06d00] font-medium transition-colors duration-300"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Quay lại đăng nhập
        </NuxtLink>
      </div>
    </div>
    <!-- Modal -->
    <ServiceModal />
  </div>
</template>

<script setup lang="ts">
import ServiceModal from "~/components/ServiceModal.vue";
import { useModalStore } from "~/stores/modal";
const modalStore = useModalStore();

function handlePackageClick(packageId: string) {
  // Hiển thị popup hướng dẫn đăng ký theo yêu cầu
  modalStore.openCustomModal({
    title: "",
    message:
      'Thuê bao Vinaphone vui lòng soạn "DK PL" gửi 9488 (3.000 đồng/ngày) để được miễn hoàn toàn cước 3G/4G khi trải nghiệm kho video chất lượng nhất tại Vilaw.',
    packages: [],
  });
}
</script>
