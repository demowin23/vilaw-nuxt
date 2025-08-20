<template>
  <div class="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Mua Gói
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

      <!-- Packages -->
      <PackagePlans
        sectionTitle="Danh sách gói cước"
        buttonText="Đăng ký"
        @select="handleSelect"
      />

      <!-- Disclaimer -->
      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-400 text-sm italic">
          (Chỉ áp dụng với thuê bao mạng VinaPhone mua gói Ngày/Tuần, miễn phí
          hoàn toàn cước 3G/4G/5G)
        </p>
      </div>

      <!-- Modal -->
      <ServiceModal />
    </div>
  </div>
</template>

<script setup lang="ts">
import ServiceModal from "~/components/ServiceModal.vue";
import { useModalStore } from "~/stores/modal";
const modalStore = useModalStore();

function handleSelect(packageId: string) {
  // Hiển thị popup hướng dẫn đăng ký theo yêu cầu
  modalStore.openCustomModal({
    title: "",
    message:
      'Thuê bao Vinaphone vui lòng soạn "DK PL" gửi 9488 (3.000 đồng/ngày) để được miễn hoàn toàn cước 3G/4G khi trải nghiệm kho video chất lượng nhất tại Vilaw.',
    packages: [],
  });
}

// Set page SEO
useHead({
  title: "Mua gói - Dịch vụ pháp lý VILAW",
  meta: [
    {
      name: "description",
      content:
        "Đăng ký gói dịch vụ pháp lý VILAW để được truy cập kho video pháp luật chất lượng cao, tư vấn pháp lý chuyên nghiệp và hỗ trợ toàn diện.",
    },
    {
      name: "keywords",
      content:
        "mua gói, đăng ký gói, dịch vụ pháp lý, gói cước VILAW, video pháp luật, tư vấn pháp lý",
    },
  ],
});
</script>
