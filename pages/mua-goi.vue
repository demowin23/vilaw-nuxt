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
          <div class="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-2xl">
            <span class="text-lg">vilaw.net.vn</span>
          </div>
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full"></div>
          <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-300 rounded-full"></div>
        </div>
      </div>

      <!-- Packages -->
      <PackagePlans sectionTitle="Danh sách gói cước" buttonText="Đăng ký" @select="handleSelect" />

      <!-- Disclaimer -->
      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-400 text-sm italic">
          (Chỉ áp dụng với thuê bao mạng VinaPhone mua gói Ngày/Tuần, miễn phí hoàn toàn cước 3G/4G/5G)
        </p>
      </div>
      
      <!-- Modal -->
      <ServiceModal />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from "~/composables/useNotification";
import ServiceModal from '~/components/ServiceModal.vue'
import { useModalStore } from '~/stores/modal'
// Nuxt auto-imports components from `components/`, nên không cần import PackagePlans thủ công

const { handleApiSuccess } = useNotification();
const modalStore = useModalStore();

function handleSelect(packageId: string) {
  // Hiển thị popup hướng dẫn đăng ký theo yêu cầu
  modalStore.openCustomModal({
    title: '',
    message:
      'Thuê bao Vinaphone vui lòng soạn "DK PL" gửi 9488 (3.000 đồng/ngày) để được miễn hoàn toàn cước 3G/4G khi trải nghiệm kho video chất lượng nhất tại MeClip.',
    packages: [],
  })
}
</script>
