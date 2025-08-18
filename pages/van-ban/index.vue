<template>
  <div class="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
    <h1 class="text-xl sm:text-2xl font-bold text-[#f58220] mb-4">
      Văn bản pháp luật
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      <!-- Cột trái - chiếm 2/3 -->
      <div class="lg:col-span-2">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 transition-colors duration-300"
        >
          <p
            class="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base transition-colors duration-300"
          >
            Công cụ hỗ trợ doanh nghiệp tra cứu, tìm kiếm và download miễn phí
            các văn bản pháp luật Việt Nam mới ban hành, văn bản pháp luật từ
            trung ương đến địa phương đầy đủ và chính xác nhất.
          </p>

          <hr class="border-red-500 mb-4 sm:mb-6" />

          <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-4 sm:p-6 transition-colors duration-300"
          >
            <h2 class="text-lg sm:text-xl font-semibold text-[#f58220] mb-4">
              Tra cứu văn bản/ hồ sơ mẫu
            </h2>

            <div class="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Nội dung cần tìm kiếm..."
                @keyup.enter="performSearch"
                class="flex-1 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 text-sm sm:text-base"
              />
              <button
                @click="performSearch"
                :disabled="isSearching"
                class="bg-[#f58220] text-white px-4 sm:px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#e06d00] transition-colors duration-300 disabled:opacity-50 text-sm sm:text-base"
              >
                <svg
                  v-if="!isSearching"
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <div
                  v-else
                  class="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                ></div>
                <span class="hidden sm:inline">{{
                  isSearching ? "Đang tìm..." : "Tìm kiếm"
                }}</span>
                <span class="sm:hidden">{{ isSearching ? "..." : "Tìm" }}</span>
              </button>
            </div>

            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:w-[60%] gap-2"
            >
              <p
                class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300"
              >
                Từ khóa tối thiểu 3 ký tự:
              </p>
              <div
                class="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300"
              >
                <span>*Tiêu đề</span>
                <span>*Số hiệu</span>
                <span>*Tên hồ sơ</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="searchResults.length > 0" class="mb-4 sm:mb-6">
          <div class="header-row">
            <h2 class="section-title">KẾT QUẢ TÌM KIẾM</h2>
            <button
              @click="
                searchResults = [];
                searchQuery = '';
              "
              class="text-xs sm:text-sm text-gray-500 hover:text-[#f58220]"
            >
              Xóa kết quả
            </button>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 md:p-6 transition-colors duration-300"
          >
            <div class="space-y-3 sm:space-y-4">
              <div
                v-for="(document, index) in searchResults"
                :key="(document as any).id || index"
                class="border-b border-gray-200 dark:border-gray-600 pb-3 sm:pb-4 last:border-b-0 transition-colors duration-300"
              >
                <div
                  class="flex flex-col lg:flex-row lg:justify-between gap-3 sm:gap-4"
                >
                  <div
                    class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                  >
                    <div>
                      <h3
                        class="font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300 text-sm sm:text-base"
                      >
                        {{ (document as any).title }}
                      </h3>
                    </div>
                    <div
                      class="space-y-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
                    >
                      <div class="dark:text-gray-100">
                        <span class="font-medium">Ban hành:</span>
                        {{ formatDate((document as any).issued_date) }}
                      </div>
                      <div class="dark:text-gray-100">
                        <span class="font-medium">Hiệu lực:</span>
                        {{ formatDate((document as any).effective_date) }}
                      </div>
                      <div
                        class="dark:text-gray-100"
                        v-if="(document as any).expiry_date"
                      >
                        <span class="font-medium">Hết hiệu lực:</span>
                        {{ formatDate((document as any).expiry_date) }}
                      </div>
                      <div class="dark:text-gray-100">
                        <span class="font-medium">Tình trạng:</span>
                        <span
                          :class="
                            document.status === 'co_hieu_luc'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          "
                        >
                          {{ getStatusText(document.status) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex flex-row sm:flex-col lg:flex-col gap-2 lg:w-24"
                  >
                    <button
                      @click="handleViewDocument(document)"
                      class="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 hover:bg-red-700 transition-colors duration-300"
                    >
                      <svg
                        class="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                      <span class="hidden sm:inline">Xem</span>
                      <span class="sm:hidden">Xem</span>
                    </button>
                    <button
                      v-if="(document as any).file_url"
                      @click="handleDownload(document)"
                      class="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 hover:bg-red-700 transition-colors duration-300"
                    >
                      <svg
                        class="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <span class="hidden sm:inline">Tải về</span>
                      <span class="sm:hidden">Tải</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chỉ hiển thị danh sách mặc định khi không có searchResults -->
        <div v-else>
          <div class="header-row">
            <h2 class="section-title">VĂN BẢN PHÁP LUẬT</h2>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 md:p-6 transition-colors duration-300"
          >
            <!-- Loading state -->
            <div v-if="loading" class="text-center py-6 sm:py-8">
              <div
                class="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#f58220]"
              ></div>
              <p
                class="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base"
              >
                Đang tải văn bản...
              </p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="text-center py-6 sm:py-8">
              <p class="text-red-600 dark:text-red-400 text-sm sm:text-base">
                Có lỗi xảy ra khi tải dữ liệu
              </p>
              <button
                @click="getDocuments()"
                class="mt-2 text-[#f58220] hover:underline text-sm sm:text-base"
              >
                Thử lại
              </button>
            </div>

            <!-- Danh sách văn bản -->
            <div
              v-else-if="legalDocuments && legalDocuments.length > 0"
              class="space-y-3 sm:space-y-4"
            >
              <div
                v-for="(document, index) in legalDocuments"
                :key="document.id || index"
                class="border-b border-gray-200 dark:border-gray-600 pb-3 sm:pb-4 last:border-b-0 transition-colors duration-300"
              >
                <div
                  class="flex flex-col lg:flex-row lg:justify-between gap-3 sm:gap-4"
                >
                  <!-- Thông tin văn bản -->
                  <div
                    class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                  >
                    <!-- Cột 1: Title và Description -->
                    <div>
                      <h3
                        class="font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300 text-sm sm:text-base"
                      >
                        {{ document.title }}
                      </h3>
                    </div>

                    <div
                      class="space-y-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
                    >
                      <div class="dark:text-gray-100">
                        <span class="font-medium">Ban hành:</span>
                        {{ formatDate(document.issued_date) }}
                      </div>
                      <div class="dark:text-gray-100">
                        <span class="font-medium">Hiệu lực:</span>
                        {{ formatDate(document.effective_date) }}
                      </div>
                      <div
                        class="dark:text-gray-100"
                        v-if="document.expiry_date"
                      >
                        <span class="font-medium">Hết hiệu lực:</span>
                        {{ formatDate(document.expiry_date) }}
                      </div>
                      <div class="dark:text-gray-100">
                        <span class="font-medium">Tình trạng:</span>
                        <span
                          :class="
                            document.status === 'co_hieu_luc'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          "
                        >
                          {{ getStatusText(document.status) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Nút hành động -->
                  <div
                    class="flex flex-row sm:flex-col lg:flex-col gap-2 lg:w-24"
                  >
                    <button
                      @click="handleViewDocument(document)"
                      class="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 hover:bg-red-700 transition-colors duration-300"
                    >
                      <svg
                        class="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                      <span class="hidden sm:inline">Xem</span>
                      <span class="sm:hidden">Xem</span>
                    </button>
                    <button
                      v-if="document.file_url"
                      @click="handleDownload(document)"
                      class="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 hover:bg-red-700 transition-colors duration-300"
                    >
                      <svg
                        class="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <span class="hidden sm:inline">Tải về</span>
                      <span class="sm:hidden">Tải</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="header-row mt-8">
          <h2 class="section-title">VĂN BẢN THEO LĨNH VỰC</h2>
        </div>
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300"
        >
          <div class="grid grid-cols-4 gap-4">
            <div
              class="col-span-1 border-r border-gray-300 dark:border-gray-600 pr-4 transition-colors duration-300"
            >
              <div class="space-y-2">
                <button
                  v-for="field in legalFields"
                  :key="field.id"
                  @click="selectedField = field.slug"
                  :class="[
                    'w-full text-left rounded-lg transition-colors flex items-center gap-3',
                    selectedField === field.slug
                      ? 'text-[#f58220]'
                      : 'text-gray-900 dark:text-gray-100',
                  ]"
                >
                  <svg
                    class="w-5 h-5 flex-shrink-0 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div class="font-medium">{{ field.name }}</div>
                  <span class="text-xs text-gray-500">({{ field.count }})</span>
                </button>
              </div>
            </div>

            <!-- Cột phải - Danh sách văn bản theo lĩnh vực -->
            <div class="col-span-3 pl-4 flex flex-col justify-between">
              <!-- Loading state -->
              <div v-if="fieldLoading" class="text-center py-8">
                <div
                  class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#f58220]"
                ></div>
                <p class="mt-2 text-gray-600 dark:text-gray-400">
                  Đang tải văn bản...
                </p>
              </div>

              <!-- Documents list -->
              <div v-else class="space-y-4">
                <div
                  v-for="(document, index) in getPaginatedDocuments()"
                  :key="index"
                  class="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0 transition-colors duration-300"
                >
                  <div
                    class="flex flex-col lg:flex-row lg:justify-between gap-4"
                  >
                    <!-- Thông tin văn bản -->
                    <div class="flex-1 grid grid-cols-2 gap-4">
                      <!-- Cột 1: Title và Description -->
                      <div>
                        <h4
                          class="font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300"
                        >
                          {{ document.title }}
                        </h4>
                      </div>

                      <!-- Cột 2: Ngày tháng và trạng thái -->
                      <div
                        class="space-y-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
                      >
                        <div class="dark:text-gray-100">
                          <span class="font-medium">Ban hành:</span>
                          {{ formatDate(document.issued_date) }}
                        </div>
                        <div class="dark:text-gray-100">
                          <span class="font-medium">Hiệu lực:</span>
                          {{ formatDate(document.effective_date) }}
                        </div>
                        <div
                          class="dark:text-gray-100"
                          v-if="document.expiry_date"
                        >
                          <span class="font-medium">Hết hiệu lực:</span>
                          {{ formatDate(document.expiry_date) }}
                        </div>
                        <div class="dark:text-gray-100">
                          <span class="font-medium">Tình trạng:</span>
                          <span
                            :class="
                              (document as any).status === 'co_hieu_luc'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            "
                          >
                            {{ getStatusText(document.status) }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Nút hành động -->
                    <div
                      class="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-24"
                    >
                      <button
                        @click="handleViewDocument(document)"
                        class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-300"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                        Xem
                      </button>
                      <button
                        v-if="document.file_url"
                        @click="handleDownload(document)"
                        class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-300"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        Tải về
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Phân trang -->
              <div v-if="getTotalPages() > 1" class="mt-6 flex justify-center">
                <div class="flex items-center gap-2">
                  <!-- Nút Previous -->
                  <button
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    :class="[
                      'px-3 py-2 rounded-lg text-sm transition-colors duration-300',
                      currentPage === 1
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                    ]"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                  </button>

                  <!-- Các số trang -->
                  <div class="flex gap-1">
                    <button
                      v-for="page in getVisiblePages()"
                      :key="page"
                      @click="
                        currentPage =
                          typeof page === 'number' ? page : currentPage
                      "
                      :class="[
                        'px-3 py-2 rounded-lg text-sm transition-colors duration-300',
                        currentPage === page
                          ? 'bg-[#f58220] text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                      ]"
                    >
                      {{ page }}
                    </button>
                  </div>

                  <!-- Nút Next -->
                  <button
                    @click="
                      currentPage = Math.min(getTotalPages(), currentPage + 1)
                    "
                    :disabled="currentPage === getTotalPages()"
                    :class="[
                      'px-3 py-2 rounded-lg text-sm transition-colors duration-300',
                      currentPage === getTotalPages()
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                    ]"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột phải - chiếm 1/3 -->
      <div class="col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-[#f58220] mb-4">
            Văn bản tải về nhiều nhất
          </h2>
          <div class="space-y-3">
            <div
              v-for="(doc, idx) in popularDocuments"
              :key="doc.id || idx"
              class="flex items-start gap-2 pb-3 border-b border-gray-200"
            >
              <svg
                class="w-4 h-4 text-red-500 mt-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a
                :href="`/van-ban/${doc.id}-${slugify(doc.title)}`"
                class="text-sm hover:underline"
              >
                {{ doc.title }}
              </a>
            </div>
            <div v-if="!popularDocuments.length" class="text-gray-500 text-sm">
              Không có dữ liệu.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useThemeStore } from "~/stores/theme";
import { useDocuments } from "~/composables/useDocuments";
import { useLegalFields } from "~/composables/useLegalFields";
import { slugify } from "~/utils/slugify";

const themeStore = useThemeStore();

// Initialize theme on mou

const {
  documents: legalDocuments,
  loading,
  error,
  getDocuments,
  downloadWordFile,
  getPopularDocuments,
} = useDocuments();

// Use legal fields composable
const { legalFields: apiLegalFields, getLegalFields } = useLegalFields();

// Search functionality
const searchQuery = ref("");
const searchResults = ref<any[]>([]);
const isSearching = ref(false);

// Add ref for popular documents
const popularDocuments = ref<any[]>([]);

// Load documents and legal fields on mount
onMounted(async () => {
  themeStore.initTheme();

  try {
    await Promise.all([getDocuments(), getLegalFields()]);
    // Initialize field documents with all documents
    fieldDocuments.value = legalDocuments.value || [];

    // Load popular documents
    const popularResponse = await getPopularDocuments(20);
    if (popularResponse.data) {
      popularDocuments.value = popularResponse.data;
    }
  } catch (error) {
    console.error("Error loading initial data:", error);
  }
});

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

// Helper function to get status text
const getStatusText = (status: string) => {
  switch (status) {
    case "co_hieu_luc":
      return "Còn hiệu lực";
    case "het_hieu_luc":
      return "Hết hiệu lực";
    case "chua_co_hieu_luc":
      return "Chưa có hiệu lực";
    case "chua_xac_dinh":
      return "Chưa xác định";
    default:
      return status;
  }
};

// Helper function to get tags array
const getTagsArray = (tags: string | string[]) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);
};

// Function to check if document belongs to a field
const documentBelongsToField = (document: any, fieldSlug: string) => {
  if (!document.tags) return false;

  const documentTags = getTagsArray(document.tags);
  return documentTags.some((tag) =>
    tag.toLowerCase().includes(fieldSlug.toLowerCase())
  );
};

const getFieldCount = (fieldSlug: string) => {
  if (!legalDocuments.value) return 0;
  return legalDocuments.value.filter((doc) =>
    documentBelongsToField(doc, fieldSlug)
  ).length;
};

// Computed legal fields with counts
const legalFields = computed(() => {
  if (!apiLegalFields.value) return [];

  return apiLegalFields.value.map((field) => ({
    id: field.id,
    slug: field.slug,
    name: field.name,
    count: getFieldCount(field.slug),
  }));
});

const selectedField = ref("");

// Phân trang
const currentPage = ref(1);
const itemsPerPage = 5; // Số văn bản hiển thị trên mỗi trang

// Documents for current field
const fieldDocuments = ref<any[]>([]);
const fieldLoading = ref(false);

const getDocumentsByField = async (fieldSlug?: string) => {
  if (!fieldSlug) {
    fieldDocuments.value = legalDocuments.value || [];
    return;
  }

  fieldLoading.value = true;
  try {
    const results = await getDocuments({
      tags: fieldSlug,
      limit: 50,
    });
    fieldDocuments.value = results.data || [];
  } catch (error) {
    console.error("Error loading documents by field:", error);
    fieldDocuments.value = [];
  } finally {
    fieldLoading.value = false;
  }
};

// Lấy văn bản theo trang hiện tại
const getPaginatedDocuments = () => {
  const documents = fieldDocuments.value;
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return documents.slice(startIndex, endIndex);
};

// Tính tổng số trang
const getTotalPages = () => {
  const documents = fieldDocuments.value;
  return Math.ceil(documents.length / itemsPerPage);
};

// Lấy các số trang hiển thị
const getVisiblePages = (): (number | string)[] => {
  const totalPages = getTotalPages();
  const current = currentPage.value;

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (current >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "...", current - 1, current, current + 1, "...", totalPages];
};

// Search function
const performSearch = async () => {
  if (!searchQuery.value || searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }

  isSearching.value = true;
  try {
    const results = await getDocuments({
      search: searchQuery.value,
      limit: 50,
    });
    searchResults.value = results.data || [];
  } catch (error) {
    console.error("Error searching documents:", error);
    searchResults.value = [];
  } finally {
    isSearching.value = false;
  }
};

// Download function
const handleDownload = async (document: any) => {
  try {
    const filename = document.file_url
      ? document.file_url.split("/").pop()
      : `${document.title}.doc`;
    await downloadWordFile(document.id, filename);
  } catch (error) {
    console.error("Error downloading document:", error);
    alert("Có lỗi xảy ra khi tải xuống file!");
  }
};

// View document function
const handleViewDocument = (document: any) => {
  // Navigate to document detail page
  navigateTo(`/van-ban/${document.id}-${slugify(document.title)}`);
};
// Reset về trang 1 và load documents khi chọn lĩnh vực khác
watch(selectedField, async (newField) => {
  currentPage.value = 1;
  await getDocumentsByField(newField);
});

// Data cho biểu mẫu
const formTypes = [
  { id: "company", name: "Thành lập công ty" },
  { id: "household", name: "Hộ kinh doanh" },
  { id: "dissolution", name: "Giải thể - tạm ngưng" },
  { id: "accounting", name: "Kế toán - tiền lương" },
  { id: "insurance", name: "Bảo hiểm xã hội" },
  { id: "intellectual", name: "Sở hữu trí tuệ" },
  { id: "import", name: "Xuất nhập khẩu" },
  { id: "other", name: "Lĩnh vực khác" },
];

const formDocuments = {
  company: [
    {
      title: "Mẫu số 01/DN",
      description: "Đăng ký thành lập doanh nghiệp",
      issuedDate: "20/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 02/GPKD",
      description: "Giấy phép kinh doanh",
      issuedDate: "18/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 03/ĐKKD",
      description: "Đăng ký kinh doanh",
      issuedDate: "15/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 04/ĐKCT",
      description: "Đăng ký chi nhánh",
      issuedDate: "12/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 05/ĐKVPDD",
      description: "Đăng ký văn phòng đại diện",
      issuedDate: "10/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
  household: [
    {
      title: "Mẫu số 01/HKD",
      description: "Đăng ký hộ kinh doanh",
      issuedDate: "22/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 02/ĐKHKD",
      description: "Đăng ký kinh doanh hộ gia đình",
      issuedDate: "19/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
  dissolution: [
    {
      title: "Mẫu số 01/GT",
      description: "Giải thể doanh nghiệp",
      issuedDate: "25/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 02/TN",
      description: "Tạm ngưng hoạt động",
      issuedDate: "23/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
  accounting: [
    {
      title: "Mẫu số 01/BC",
      description: "Báo cáo tài chính",
      issuedDate: "28/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 02/TL",
      description: "Bảng lương nhân viên",
      issuedDate: "26/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 03/CT",
      description: "Chứng từ kế toán",
      issuedDate: "24/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
  insurance: [
    {
      title: "Mẫu số 01/BHXH",
      description: "Đăng ký bảo hiểm xã hội",
      issuedDate: "30/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 02/BHYT",
      description: "Đăng ký bảo hiểm y tế",
      issuedDate: "29/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 03/BHTN",
      description: "Đăng ký bảo hiểm thất nghiệp",
      issuedDate: "27/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
  intellectual: [
    {
      title: "Mẫu số 01/SHTT",
      description: "Đăng ký sở hữu trí tuệ",
      issuedDate: "02/07/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 02/NH",
      description: "Đăng ký nhãn hiệu",
      issuedDate: "01/07/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
  import: [
    {
      title: "Mẫu số 01/XNK",
      description: "Tờ khai xuất nhập khẩu",
      issuedDate: "05/07/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 02/HQ",
      description: "Tờ khai hải quan",
      issuedDate: "04/07/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Mẫu số 03/CK",
      description: "Chứng từ xuất khẩu",
      issuedDate: "03/07/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
  other: [
    {
      title: "Mẫu số 01/KH",
      description: "Biểu mẫu khác",
      issuedDate: "08/07/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
};

const selectedFormType = ref("all");

// Phân trang cho biểu mẫu
const currentFormPage = ref(1);
const formsPerPage = 5; // Số biểu mẫu hiển thị trên mỗi trang

const getFormsByType = () => {
  if (selectedFormType.value === "all") {
    return Object.values(formDocuments).flat();
  }
  return (formDocuments as any)[selectedFormType.value] || [];
};

const getPaginatedForms = () => {
  const forms = getFormsByType();
  const startIndex = (currentFormPage.value - 1) * formsPerPage;
  const endIndex = startIndex + formsPerPage;
  return forms.slice(startIndex, endIndex);
};

const getTotalFormPages = () => {
  const forms = getFormsByType();
  return Math.ceil(forms.length / formsPerPage);
};

const getVisibleFormPages = () => {
  const totalPages = getTotalFormPages();
  const current = currentFormPage.value;

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (current >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "...", current - 1, current, current + 1, "...", totalPages];
};

// Reset về trang 1 khi chọn loại biểu mẫu khác
watch(selectedFormType, () => {
  currentFormPage.value = 1;
});
</script>
<style scoped>
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 12px;
}
.section-title {
  border-left: 4px solid #f58220;
  padding-left: 10px;
  color: #f58220;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin: 0;
}

/* Dark mode styles */
.dark .section-title {
  color: #f9fafb;
}

/* Smooth transitions for all elements */
* {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

/* Focus states for accessibility */
input:focus,
button:focus {
  outline: 2px solid #f58220;
  outline-offset: 2px;
}

/* Hover effects for interactive elements */
button:hover {
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
</style>
