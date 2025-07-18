<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex gap-8">
      <!-- Main Content Column (2/3 width) -->
      <div class="w-2/3">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            Chi tiết kiến thức pháp luật
          </h1>
          <div class="prose max-w-none">
            <p class="text-gray-600 leading-relaxed">
              Nội dung chi tiết sẽ được hiển thị ở đây. Đây là cột chính chiếm
              2/3 chiều rộng của trang.
            </p>
            <p class="text-gray-600 leading-relaxed mt-4">
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
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
        <div class="bg-blue-50 rounded-lg p-4 mb-6">
          <p class="text-blue-700 text-sm leading-relaxed">
            Dịch vụ báo cáo thuế, BCTC cuối năm - Chỉ từ 500.000đ/tháng
          </p>
        </div>

        <!-- Article Links List -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="p-4 border-b border-gray-200">
            <h4 class="font-semibold text-gray-800">Bài viết liên quan</h4>
          </div>
          <div class="divide-y divide-gray-200">
            <a href="#" class="block p-4 hover:bg-gray-50 transition-colors">
              <p
                class="text-blue-600 text-sm leading-relaxed hover:text-blue-800"
              >
                Lựa Chọn Phương Pháp Kê Khai Thuế Gia Tăng Thế Nào Là Phù Hợp?
              </p>
            </a>
            <a href="#" class="block p-4 hover:bg-gray-50 transition-colors">
              <p
                class="text-blue-600 text-sm leading-relaxed hover:text-blue-800"
              >
                Điều Kiện Khấu Trừ Thuế Giá Trị Gia Tăng Đầu Vào
              </p>
            </a>
            <a href="#" class="block p-4 hover:bg-gray-50 transition-colors">
              <p
                class="text-blue-600 text-sm leading-relaxed hover:text-blue-800"
              >
                Mức phạt và cách tính tiền phạt chậm nộp thuế - Ví dụ cụ thể
              </p>
            </a>
            <a href="#" class="block p-4 hover:bg-gray-50 transition-colors">
              <p
                class="text-blue-600 text-sm leading-relaxed hover:text-blue-800"
              >
                Chi phí quà tặng cho nhân viên vào các dịp lễ, Tết trong năm
              </p>
            </a>
            <a href="#" class="block p-4 hover:bg-gray-50 transition-colors">
              <p
                class="text-blue-600 text-sm leading-relaxed hover:text-blue-800"
              >
                Cách tính thuế giá trị gia tăng phải nộp theo phương pháp khấu
                trừ
              </p>
            </a>
            <a href="#" class="block p-4 hover:bg-gray-50 transition-colors">
              <p
                class="text-blue-600 text-sm leading-relaxed hover:text-blue-800"
              >
                Cách miễn giảm thuế, chính sách hỗ trợ doanh nghiệp mùa dịch
              </p>
            </a>
            <a href="#" class="block p-4 hover:bg-gray-50 transition-colors">
              <p
                class="text-blue-600 text-sm leading-relaxed hover:text-blue-800"
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

<script setup>
// Get the ID from the route
const route = useRoute();
const id = route.params.id;

// Set page title
useHead({
  title: `Kiến thức pháp luật - ${id}`,
  meta: [{ name: "description", content: "Chi tiết kiến thức pháp luật" }],
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
</style>
