<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold text-[#f58220] mb-4">Văn bản pháp luật</h1>

    <div class="grid grid-cols-3 gap-6">
      <!-- Cột trái - chiếm 2/3 -->
      <div class="col-span-2">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-300"
        >
          <p
            class="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300"
          >
            Công cụ hỗ trợ doanh nghiệp tra cứu, tìm kiếm và download miễn phí
            các văn bản pháp luật Việt Nam mới ban hành, văn bản pháp luật từ
            trung ương đến địa phương đầy đủ và chính xác nhất.
          </p>

          <hr class="border-red-500 mb-6" />

          <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-6 transition-colors duration-300"
          >
            <h2 class="text-xl font-semibold text-[#f58220] mb-4">
              Tra cứu văn bản/ hồ sơ mẫu
            </h2>

            <div class="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Nội dung cần tìm kiếm..."
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              />
              <button
                class="bg-[#f58220] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e06d00] transition-colors duration-300"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                Tìm kiếm
              </button>
            </div>

            <div class="flex justify-between w-[60%]">
              <p
                class="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300"
              >
                Từ khóa tối thiểu 3 ký tự:
              </p>
              <div
                class="flex gap-4 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300"
              >
                <span>*Tiêu đề</span>
                <span>*Số hiệu</span>
                <span>*Tên hồ sơ</span>
              </div>
            </div>
          </div>
        </div>
        <div class="header-row">
          <h2 class="section-title">VĂN BẢN PHÁP LUẬT</h2>
        </div>
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 transition-colors duration-300"
        >
          <!-- Danh sách văn bản -->
          <div class="space-y-4">
            <div
              v-for="(document, index) in legalDocuments"
              :key="index"
              class="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0 transition-colors duration-300"
            >
              <div class="flex flex-col lg:flex-row lg:justify-between gap-4">
                <!-- Thông tin văn bản -->
                <div class="flex-1 grid grid-cols-2 gap-4">
                  <!-- Cột 1: Title và Description -->
                  <div>
                    <h3
                      class="font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300"
                    >
                      {{ document.title }}
                    </h3>
                    <p
                      class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"
                    >
                      {{ document.description }}
                    </p>
                  </div>

                  <div
                    class="space-y-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
                  >
                    <div>
                      <span class="font-medium">Ban hành:</span>
                      {{ document.issuedDate }}
                    </div>
                    <div>
                      <span class="font-medium">Hiệu lực:</span>
                      {{ document.effectiveDate }}
                    </div>
                    <div>
                      <span class="font-medium">Tình trạng:</span>
                      <span
                        :class="
                          document.status === 'Còn hiệu lực'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        "
                      >
                        {{ document.status }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Nút hành động -->
                <div
                  class="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-24"
                >
                  <button
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
                  @click="selectedField = field.id"
                  :class="[
                    'w-full text-left rounded-lg transition-colors flex items-center gap-3',
                    selectedField === field.id
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
                </button>
              </div>
            </div>

            <!-- Cột phải - Danh sách văn bản theo lĩnh vực -->
            <div class="col-span-3 pl-4 flex flex-col justify-between">
              <div class="space-y-4">
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
                        <p
                          class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"
                        >
                          {{ document.description }}
                        </p>
                      </div>

                      <!-- Cột 2: Ngày tháng và trạng thái -->
                      <div
                        class="space-y-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
                      >
                        <div>
                          <span class="font-medium">Ban hành:</span>
                          {{ document.issuedDate }}
                        </div>
                        <div>
                          <span class="font-medium">Hiệu lực:</span>
                          {{ document.effectiveDate }}
                        </div>
                        <div>
                          <span class="font-medium">Tình trạng:</span>
                          <span
                            :class="
                              document.status === 'Còn hiệu lực'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            "
                          >
                            {{ document.status }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Nút hành động -->
                    <div
                      class="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-24"
                    >
                      <button
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
                      @click="currentPage = page"
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

        <img
          src="/images/tra-cuu-1200px.jpg"
          alt="van-ban-theo-linh-vuc"
          class="w-full py-6"
        />

        <!-- Phần Biểu mẫu mới cập nhật -->
        <div class="header-row mt-8">
          <h2 class="section-title">BIỂU MẪU MỚI CẬP NHẬT</h2>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300"
        >
          <div class="grid grid-cols-4 gap-4">
            <!-- Cột trái - Danh sách loại biểu mẫu -->
            <div
              class="col-span-1 border-r border-gray-300 dark:border-gray-600 pr-4 transition-colors duration-300"
            >
              <div class="space-y-2">
                <button
                  v-for="formType in formTypes"
                  :key="formType.id"
                  @click="selectedFormType = formType.id"
                  :class="[
                    'w-full text-left py-2 transition-colors duration-300 flex items-center gap-3',
                    selectedFormType === formType.id
                      ? 'text-red-600 dark:text-red-400'
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
                  <div class="font-medium">{{ formType.name }}</div>
                </button>
              </div>
            </div>

            <!-- Cột phải - Danh sách biểu mẫu -->
            <div class="col-span-3 pl-4 flex flex-col justify-between">
              <div class="space-y-4">
                <div
                  v-for="(form, index) in getPaginatedForms()"
                  :key="index"
                  class="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0 transition-colors duration-300"
                >
                  <div
                    class="flex flex-col lg:flex-row lg:justify-between gap-4"
                  >
                    <!-- Thông tin biểu mẫu -->
                    <div class="flex-1 grid grid-cols-2 gap-4">
                      <!-- Cột 1: Title và Description -->
                      <div>
                        <h4
                          class="font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300"
                        >
                          {{ form.title }}
                        </h4>
                        <p
                          class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"
                        >
                          {{ form.description }}
                        </p>
                      </div>

                      <!-- Cột 2: Ngày tháng và trạng thái -->
                      <div
                        class="space-y-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
                      >
                        <div>
                          <span class="font-medium">Ban hành:</span>
                          {{ form.issuedDate }}
                        </div>
                        <div>
                          <span class="font-medium">Hiệu lực:</span>
                          {{ form.effectiveDate }}
                        </div>
                        <div>
                          <span class="font-medium">Tình trạng:</span>
                          <span
                            :class="
                              form.status === 'Còn hiệu lực'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            "
                          >
                            {{ form.status }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Nút hành động -->
                    <div
                      class="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-24"
                    >
                      <button
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

              <div
                v-if="getTotalFormPages() > 1"
                class="mt-6 flex justify-center"
              >
                <div class="flex items-center gap-2">
                  <!-- Nút Previous -->
                  <button
                    @click="currentFormPage = Math.max(1, currentFormPage - 1)"
                    :disabled="currentFormPage === 1"
                    :class="[
                      'px-3 py-2 rounded-lg text-sm transition-colors duration-300',
                      currentFormPage === 1
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
                      v-for="page in getVisibleFormPages()"
                      :key="page"
                      @click="currentFormPage = page"
                      :class="[
                        'px-3 py-2 rounded-lg text-sm transition-colors duration-300',
                        currentFormPage === page
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
                      currentFormPage = Math.min(
                        getTotalFormPages(),
                        currentFormPage + 1
                      )
                    "
                    :disabled="currentFormPage === getTotalFormPages()"
                    :class="[
                      'px-3 py-2 rounded-lg text-sm transition-colors duration-300',
                      currentFormPage === getTotalFormPages()
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
            Văn bản xem nhiều nhất
          </h2>

          <div class="space-y-3">
            <div class="flex items-start gap-2 pb-3 border-b border-gray-200">
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
              <div class="text-sm">
                <strong>Công văn 1798/TCT-TTKT:</strong> Tổng cục Thuế công bố
                danh sách 524 doanh nghiệp rủi ro về hóa đơn
              </div>
            </div>

            <div class="flex items-start gap-2 pb-3 border-b border-gray-200">
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
              <div class="text-sm">
                <strong>Luật Doanh nghiệp 2020 số 59/2020/QH14</strong>
              </div>
            </div>

            <div class="flex items-start gap-2 pb-3 border-b border-gray-200">
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
              <div class="text-sm">
                <strong>Nghị định 136/2020/NĐ-CP</strong> hướng dẫn Luật Phòng
                cháy và chữa cháy và Luật Phòng cháy và chữa cháy sửa đổi
              </div>
            </div>

            <div class="flex items-start gap-2 pb-3 border-b border-gray-200">
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
              <div class="text-sm">
                <strong>Luật đất đai 2024 số 31/2024/QH15</strong>
              </div>
            </div>

            <div class="flex items-start gap-2 pb-3 border-b border-gray-200">
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
              <div class="text-sm">
                <strong>Nghị định 15/2022/NĐ-CP</strong> quy định chính sách
                miễn, giảm thuế theo Nghị quyết 43/2022/QH15 về chính sách tài
                khóa, tiền tệ hỗ trợ Chương trình phục hồi và phát triển kinh tế
                - xã hội
              </div>
            </div>

            <div class="flex items-start gap-2">
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
              <div class="text-sm">
                <strong>Thông tư 80/2021/TT-BTC</strong> hướng dẫn Luật Quản lý
                thuế và Nghị định 126/2020/NĐ-CP hướng dẫn Luật Quản lý thuế do
                Bộ trưởng Bộ Tài chính ban hành
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();

// Initialize theme on mount
onMounted(() => {
  themeStore.initTheme();
});

const legalDocuments = [
  {
    title: "Nghị định 181/2025/NĐ-CP",
    description: "ngày 01/07/2025 hướng dẫn Luật Thuế giá trị gia tăng",
    issuedDate: "01/07/2025",
    effectiveDate: "01/07/2025",
    status: "Còn hiệu lực",
  },
  {
    title: "Nghị định 156/2025/NĐ-CP",
    description: "ngày 16/06/2025 quy định về quản lý thuế và phí",
    issuedDate: "16/06/2025",
    effectiveDate: "01/07/2025",
    status: "Còn hiệu lực",
  },
  {
    title: "Nghị định 117/2025/NĐ-CP",
    description: "ngày 09/06/2025 về chính sách hỗ trợ doanh nghiệp",
    issuedDate: "09/06/2025",
    effectiveDate: "01/07/2025",
    status: "Chưa hiệu lực",
  },
  {
    title: "Công điện 72/CĐ-CT 2025",
    description: "ngày 01/06/2025 về tăng cường công tác phòng chống dịch",
    issuedDate: "01/06/2025",
    effectiveDate: "01/06/2025",
    status: "Chưa hiệu lực",
  },
  {
    title: "Thông tư 32/2025/TT-BTC",
    description: "ngày 31/05/2025 hướng dẫn thực hiện Luật Thuế",
    issuedDate: "31/05/2025",
    effectiveDate: "01/06/2025",
    status: "Còn hiệu lực",
  },
  {
    title: "Công văn 623/TTg-KSTT",
    description: "ngày 30/05/2025 về tăng cường kiểm soát thị trường",
    issuedDate: "30/05/2025",
    effectiveDate: "30/05/2025",
    status: "Còn hiệu lực",
  },
  {
    title: "Nghị quyết 198/2025/QH15",
    description: "ngày 17/05/2025 về chính sách tài khóa năm 2025",
    issuedDate: "17/05/2025",
    effectiveDate: "17/05/2025",
    status: "Còn hiệu lực",
  },
];

// Data cho văn bản theo lĩnh vực
const fieldDocuments = {
  tax: [
    {
      title: "Nghị định 181/2025/NĐ-CP",
      description: "ngày 01/07/2025 hướng dẫn Luật Thuế giá trị gia tăng",
      issuedDate: "01/07/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Thông tư 32/2025/TT-BTC",
      description: "ngày 31/05/2025 hướng dẫn thực hiện Luật Thuế",
      issuedDate: "31/05/2025",
      effectiveDate: "01/06/2025",
      status: "Còn hiệu lực",
    },
    {
      title: "Nghị định 156/2025/NĐ-CP",
      description: "ngày 16/06/2025 quy định về quản lý thuế và phí",
      issuedDate: "16/06/2025",
      effectiveDate: "01/07/2025",
      status: "Còn hiệu lực",
    },
  ],
  business: [
    {
      title: "Nghị định 117/2025/NĐ-CP",
      description: "ngày 09/06/2025 về chính sách hỗ trợ doanh nghiệp",
      issuedDate: "09/06/2025",
      effectiveDate: "01/07/2025",
      status: "Chưa hiệu lực",
    },
    {
      title: "Luật Doanh nghiệp 2020 số 59/2020/QH14",
      description: "ngày 17/06/2020 về doanh nghiệp",
      issuedDate: "17/06/2020",
      effectiveDate: "01/01/2021",
      status: "Còn hiệu lực",
    },
  ],
  land: [
    {
      title: "Luật đất đai 2024 số 31/2024/QH15",
      description: "ngày 18/01/2024 về quản lý và sử dụng đất đai",
      issuedDate: "18/01/2024",
      effectiveDate: "01/07/2024",
      status: "Còn hiệu lực",
    },
  ],
  fire: [
    {
      title: "Nghị định 136/2020/NĐ-CP",
      description:
        "hướng dẫn Luật Phòng cháy và chữa cháy và Luật Phòng cháy và chữa cháy sửa đổi",
      issuedDate: "24/11/2020",
      effectiveDate: "01/01/2021",
      status: "Còn hiệu lực",
    },
  ],
  health: [
    {
      title: "Công điện 72/CĐ-CT 2025",
      description: "ngày 01/06/2025 về tăng cường công tác phòng chống dịch",
      issuedDate: "01/06/2025",
      effectiveDate: "01/06/2025",
      status: "Chưa hiệu lực",
    },
  ],
  finance: [
    {
      title: "Nghị quyết 198/2025/QH15",
      description: "ngày 17/05/2025 về chính sách tài khóa năm 2025",
      issuedDate: "17/05/2025",
      effectiveDate: "17/05/2025",
      status: "Còn hiệu lực",
    },
  ],
  market: [
    {
      title: "Công văn 623/TTg-KSTT",
      description: "ngày 30/05/2025 về tăng cường kiểm soát thị trường",
      issuedDate: "30/05/2025",
      effectiveDate: "30/05/2025",
      status: "Còn hiệu lực",
    },
  ],
};

const legalFields = [
  { id: "tax", name: "Thuế", count: fieldDocuments.tax.length },
  {
    id: "business",
    name: "Doanh nghiệp",
    count: fieldDocuments.business.length,
  },
  { id: "land", name: "Đất đai", count: fieldDocuments.land.length },
  {
    id: "fire",
    name: "Phòng cháy chữa cháy",
    count: fieldDocuments.fire.length,
  },
  { id: "health", name: "Y tế", count: fieldDocuments.health.length },
  { id: "finance", name: "Tài chính", count: fieldDocuments.finance.length },
  { id: "market", name: "Thị trường", count: fieldDocuments.market.length },
  { id: "environment", name: "Môi trường", count: 0 },
  { id: "labor", name: "Lao động", count: 0 },
  { id: "transport", name: "Giao thông", count: 0 },
  { id: "education", name: "Giáo dục", count: 0 },
  { id: "social", name: "Xã hội", count: 0 },
  { id: "other", name: "Khác", count: 0 },
];

const selectedField = ref("tax");

// Phân trang
const currentPage = ref(1);
const itemsPerPage = 5; // Số văn bản hiển thị trên mỗi trang

const getDocumentsByField = () => {
  if (selectedField.value === "tax") {
    return legalDocuments;
  }

  return fieldDocuments[selectedField.value] || [];
};

// Lấy văn bản theo trang hiện tại
const getPaginatedDocuments = () => {
  const documents = getDocumentsByField();
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return documents.slice(startIndex, endIndex);
};

// Tính tổng số trang
const getTotalPages = () => {
  const documents = getDocumentsByField();
  return Math.ceil(documents.length / itemsPerPage);
};

// Lấy các số trang hiển thị
const getVisiblePages = () => {
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

// Reset về trang 1 khi chọn lĩnh vực khác
watch(selectedField, () => {
  currentPage.value = 1;
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
  return formDocuments[selectedFormType.value] || [];
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
  color: #181818;
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
