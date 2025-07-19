<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex gap-8">
      <!-- Main Content Column (2/3 width) -->
      <div class="w-2/3">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300"
        >
          <h1
            class="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300"
          >
            Chi tiết kiến thức pháp luật
          </h1>
          <div class="prose max-w-none">
            <p
              class="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300"
            >
              Nội dung chi tiết sẽ được hiển thị ở đây. Đây là cột chính chiếm
              2/3 chiều rộng của trang.
            </p>
            <p
              class="text-gray-600 dark:text-gray-300 leading-relaxed mt-4 transition-colors duration-300"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <!-- Sidebar Column (1/3 width) -->
      <div class="w-1/3">
        <!-- Advertisement Banner -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 transition-colors duration-300"
        >
          <!-- Header Bar -->
          <div class="bg-blue-800 text-white px-4 py-3 flex items-center">
            <div class="w-1 h-6 bg-red-500 mr-3"></div>
            <span class="font-semibold uppercase text-sm">THAM KHẢO THÊM</span>
          </div>

          <!-- Main Advertisement Content -->
          <div
            class="p-6 relative"
            style="background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%)"
          >
            <!-- Background decorative elements -->
            <div class="absolute inset-0 overflow-hidden">
              <div
                class="absolute top-4 right-4 w-16 h-16 bg-orange-200 rounded-full opacity-30"
              ></div>
              <div
                class="absolute bottom-8 left-4 w-8 h-8 bg-blue-200 rounded-full opacity-40"
              ></div>
              <div
                class="absolute top-1/2 right-8 w-4 h-4 bg-orange-300 rounded-full opacity-50"
              ></div>
            </div>

            <!-- Logo and Company Name -->
            <div class="flex items-center mb-4">
              <div
                class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2"
              >
                <span class="text-white font-bold text-sm">A</span>
              </div>
              <span class="text-blue-600 text-sm font-medium"
                >Kế toán Anpha</span
              >
            </div>

            <!-- Main Title -->
            <h3 class="text-xl font-bold text-orange-600 text-center mb-4">
              DỊCH VỤ BÁO CÁO THUẾ
            </h3>

            <!-- Pricing Button -->
            <div class="text-center mb-4">
              <button
                class="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Từ 500.000đ/tháng
              </button>
            </div>

            <!-- Feature Tags -->
            <div class="flex justify-center gap-2 mb-4">
              <span
                class="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center"
              >
                <svg
                  class="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Chính xác
              </span>
              <span
                class="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center"
              >
                <svg
                  class="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Tiết kiệm
              </span>
              <span
                class="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center"
              >
                <svg
                  class="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Hiệu quả
              </span>
            </div>

            <!-- Illustration -->
            <div class="relative h-20 flex justify-end items-center">
              <div class="relative">
                <div
                  class="w-16 h-12 bg-gray-300 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="w-8 h-8 bg-white rounded-full border-2 border-gray-200 ml-2"
              ></div>
            </div>
          </div>
        </div>

        <!-- Service Description -->
        <div
          class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 transition-colors duration-300"
        >
          <p
            class="text-blue-700 dark:text-blue-300 text-sm leading-relaxed transition-colors duration-300"
          >
            Dịch vụ báo cáo thuế, BCTC cuối năm - Chỉ từ 500.000đ/tháng
          </p>
        </div>

        <!-- Article Links List -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300"
        >
          <div class="p-4 border-b border-gray-200 dark:border-gray-600">
            <h4
              class="font-semibold text-gray-800 dark:text-white transition-colors duration-300"
            >
              Bài viết liên quan
            </h4>
          </div>
          <div class="divide-y divide-gray-200 dark:divide-gray-600">
            <a
              href="#"
              class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <p
                class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Lựa Chọn Phương Pháp Kê Khai Thuế Gia Tăng Thế Nào Là Phù Hợp?
              </p>
            </a>
            <a
              href="#"
              class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <p
                class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Điều Kiện Khấu Trừ Thuế Giá Trị Gia Tăng Đầu Vào
              </p>
            </a>
            <a
              href="#"
              class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <p
                class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Mức phạt và cách tính tiền phạt chậm nộp thuế - Ví dụ cụ thể
              </p>
            </a>
            <a
              href="#"
              class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <p
                class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Chi phí quà tặng cho nhân viên vào các dịp lễ, Tết trong năm
              </p>
            </a>
            <a
              href="#"
              class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <p
                class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Cách tính thuế giá trị gia tăng phải nộp theo phương pháp khấu
                trừ
              </p>
            </a>
            <a
              href="#"
              class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <p
                class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Cách miễn giảm thuế, chính sách hỗ trợ doanh nghiệp mùa dịch
              </p>
            </a>
            <a
              href="#"
              class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <p
                class="text-blue-600 dark:text-blue-400 text-sm leading-relaxed hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Các ưu đãi thuế & đầu tư với doanh nghiệp sản xuất phần mềm
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();

// Get the ID from the route
const route = useRoute();
const id = route.params.id;

// Set page title
useHead({
  title: `Kiến thức pháp luật - ${id}`,
  meta: [{ name: "description", content: "Chi tiết kiến thức pháp luật" }],
});

// Initialize theme on mount
onMounted(() => {
  themeStore.initTheme();
});
</script>

<style scoped>
/* Custom styles for better visual appeal */
.prose {
  line-height: 1.7;
}

.prose p {
  margin-bottom: 1rem;
}

/* Smooth transitions for all elements */
* {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

/* Focus states for accessibility */
a:focus,
button:focus {
  outline: 2px solid #f58220;
  outline-offset: 2px;
}

/* Hover effects for interactive elements */
a:hover {
  transform: translateY(-1px);
}

/* Custom scrollbar for dark mode */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #6b7280;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Dark mode specific adjustments */
.dark .bg-gray-300 {
  background-color: #4b5563;
}

.dark .text-gray-600 {
  color: #9ca3af;
}

.dark .border-gray-200 {
  border-color: #4b5563;
}
</style>
