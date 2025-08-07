<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex gap-8">
      <div class="w-2/3">
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
                v-model="searchQuery"
                type="text"
                placeholder="Nội dung cần tìm kiếm..."
                @keyup.enter="performSearch"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              />
              <button
                @click="performSearch"
                :disabled="isSearching"
                class="bg-[#f58220] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e06d00] transition-colors duration-300 disabled:opacity-50"
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
                {{ isSearching ? "Đang tìm..." : "Tìm kiếm" }}
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

        <!-- Search Results -->
        <div v-if="searchResults.length > 0" class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-[#f58220]">
              KẾT QUẢ TÌM KIẾM
            </h2>
            <button
              @click="
                searchResults = [];
                searchQuery = '';
              "
              class="text-sm text-gray-500 hover:text-[#f58220]"
            >
              Xóa kết quả
            </button>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 transition-colors duration-300"
          >
            <div class="space-y-4">
              <div
                v-for="(document, index) in searchResults"
                :key="document.id || index"
                class="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0 transition-colors duration-300"
              >
                <div class="flex flex-col lg:flex-row lg:justify-between gap-4">
                  <div class="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <h3
                        class="font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300"
                      >
                        {{ document.title }}
                      </h3>
                    </div>
                    <div
                      class="space-y-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300"
                    >
                      <div>
                        <span class="font-medium">Ban hành:</span>
                        {{ formatDate(document.issueDate) }}
                      </div>
                      <div>
                        <span class="font-medium">Hiệu lực:</span>
                        {{ formatDate(document.effectiveDate) }}
                      </div>
                      <div v-if="document.expiryDate">
                        <span class="font-medium">Hết hiệu lực:</span>
                        {{ formatDate(document.expiryDate) }}
                      </div>
                      <div>
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
                      @click="downloadFileSearchResult(document)"
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
        </div>
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
          ></div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
        >
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-red-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <h3 class="text-lg font-medium text-red-800 dark:text-red-200">
              Có lỗi xảy ra
            </h3>
          </div>
          <p class="mt-2 text-red-700 dark:text-red-300">{{ error.message }}</p>
          <button
            @click="fetchDocument"
            class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>

        <!-- Document Content -->
        <div
          v-else-if="document"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <!-- Document Header - Redesigned -->
          <div class="bg-white dark:bg-gray-800 p-6 border-t-4 border-red-500">
            <div class="flex gap-6">
              <!-- Left Column - Document Title -->
              <div class="flex-1">
                <h1
                  class="text-xl font-bold text-blue-600 dark:text-blue-400 leading-tight"
                >
                  {{ document.title }}
                </h1>
              </div>

              <!-- Right Column - Metadata and Download -->
              <!-- Metadata -->
              <div class="space-y-2 text-sm">
                <div class="text-gray-700 dark:text-gray-300">
                  Ban hành: {{ formatDate(document.issueDate) }}
                </div>
                <div class="text-gray-700 dark:text-gray-300">
                  Hiệu lực: {{ formatDate(document.effectiveDate) }}
                </div>
                <div class="text-gray-700 dark:text-gray-300">
                  Tình trạng:
                  <span
                    :class="`font-medium ${getStatusTextColor(
                      document.status
                    )}`"
                  >
                    {{ getStatusText(document.status) }}
                  </span>
                </div>
              </div>

              <!-- Download Section -->
              <div class="mt-4">
                <div v-if="document.wordFile" class="space-y-2">
                  <!-- Download Button -->
                  <button
                    @click="downloadFile"
                    class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Tải về
                  </button>

                  <!-- Download Count -->
                  <div
                    class="text-center text-xs text-gray-500 dark:text-gray-400"
                  >
                    {{ document.downloadCount || 0 }} lượt tải
                  </div>
                </div>

                <div
                  v-else
                  class="text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Không có file để tải
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="document.html_toc && document.html_toc.length > 0"
            class="px-6 border-b border-gray-200 dark:border-gray-600"
          >
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Mục lục
            </h3>
            <div class="table-of-contents mb-4">
              <div
                v-for="item in document.html_toc"
                :key="item.id"
                class="toc-item"
                :style="{ paddingLeft: `${(item.level - 1) * 20}px` }"
                @click="scrollToHeading(item.id)"
              >
                <a
                  :href="`#${item.id}`"
                  class="toc-link"
                  :class="`toc-level-${item.level}`"
                >
                  {{ item.text }}
                </a>
              </div>
            </div>
          </div>

          <!-- Document Content -->
          <div v-if="document.html_content" class="p-6">
            <div class="prose prose-lg max-w-none dark:prose-invert">
              <div
                v-html="document.html_content"
                class="text-gray-700 dark:text-gray-300 leading-relaxed word-content"
              ></div>
            </div>
          </div>
        </div>

        <!-- Not Found State -->
        <div
          v-else
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center"
        >
          <svg
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Không tìm thấy văn bản
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Văn bản bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>

      <!-- Sidebar Column (1/3 width) -->
      <div class="w-1/3">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-[#f58220] mb-4">
            Văn bản Liên quan
          </h2>

          <!-- Loading state -->
          <div v-if="relatedLoading" class="text-center py-8">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#f58220]"
            ></div>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Đang tải văn bản liên quan...
            </p>
          </div>

          <!-- Related documents list -->
          <div v-else-if="relatedDocuments.length > 0" class="space-y-3">
            <div
              v-for="(doc, idx) in relatedDocuments"
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
              <a :href="`/van-ban/${doc.id}-${slugify(doc.title)}`" class="text-sm hover:underline">
                {{ doc.title }}
              </a>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="text-gray-500 text-sm">
            Không có văn bản liên quan.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useThemeStore } from "~/stores/theme";
import { useDocuments } from "~/composables/useDocuments";
import { slugify } from "~/utils/slugify";

const themeStore = useThemeStore();
const { getDocumentById, downloadWordFile, getPopularDocuments, getDocuments } =
  useDocuments();

// Get the ID from the route
const route = useRoute();
const idParam = route.params.id as string;
// Extract ID from URL like "123-title-slug" -> "123"
const id = idParam?.split('-')[0];

// Reactive data
const document = ref<any>(null);
const loading = ref(false);
const error = ref<Error | null>(null);
const relatedDocuments = ref([]);
const relatedLoading = ref(false);

// Search functionality
const searchQuery = ref("");
const searchResults = ref([]);
const isSearching = ref(false);

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

// View document function
const handleViewDocument = (document: any) => {
  // Navigate to document detail page
  navigateTo(`/van-ban/${document.id}-${slugify(document.title)}`);
};

// Function to scroll to heading
const scrollToHeading = (id: string) => {
  nextTick(() => {
    const element = document.querySelector(`[id="${id}"]`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

      // Add highlight effect
      element.classList.add("highlight-heading");
      setTimeout(() => {
        element.classList.remove("highlight-heading");
      }, 2000);
    }
  });
};

// Set page title
useHead({
  title: `Văn bản pháp luật - ${id}`,
  meta: [{ name: "description", content: "Chi tiết văn bản pháp luật" }],
});

// Helper functions
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

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

const getStatusClass = (status: string) => {
  switch (status) {
    case "co_hieu_luc":
      return "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200";
    case "het_hieu_luc":
      return "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200";
    case "chua_co_hieu_luc":
      return "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200";
    case "chua_xac_dinh":
      return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
  }
};
const getStatusTextColor = (status: string) => {
  switch (status) {
    case "co_hieu_luc":
      return "text-green-800 dark:text-green-200";
    case "het_hieu_luc":
      return "text-red-800 dark:text-red-200";
    case "chua_co_hieu_luc":
      return "text-yellow-800 dark:text-yellow-200";
    case "chua_xac_dinh":
      return "text-gray-800 dark:text-gray-200";
    default:
      return "text-gray-800 dark:text-gray-200";
  }
};

const getTagsArray = (tags: string | string[]) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);
};

const getFileName = (fileUrl: string) => {
  if (!fileUrl) return "";
  return fileUrl.split("/").pop() || "document.doc";
};

const downloadFileSearchResult = async (document: any) => {
  try {
    const filename = getFileName(document.file_url);
    await downloadWordFile(document.id, filename);
  } catch (error) {
    console.error("Error downloading document:", error);
    alert("Có lỗi xảy ra khi tải xuống file!");
  }
};

const downloadFile = async (document: any) => {
  if (!document?.wordFile) return;

  try {
    const filename = getFileName(document.wordFile);
    await downloadWordFile(document.id, filename);
  } catch (err: any) {
    console.error("Error downloading file:", err);
    alert("Có lỗi xảy ra khi tải xuống file!");
  }
};

// Fetch related documents
const fetchRelatedDocuments = async () => {
  if (!document.value?.tags) return;

  relatedLoading.value = true;
  try {
    const tags = Array.isArray(document.value.tags)
      ? document.value.tags.join(",")
      : document.value.tags;

    const response = await getPopularDocuments(6, tags);
    if (response.data) {
      relatedDocuments.value = response.data.filter(
        (doc) => doc.id !== document.value.id
      );
    }
  } catch (err: any) {
    console.error("Error fetching related documents:", err);
  } finally {
    relatedLoading.value = false;
  }
};

// Fetch document by ID
const fetchDocument = async () => {
  if (!id) return;

  loading.value = true;
  error.value = null;

  try {
    const response = await getDocumentById(Number(id));
    document.value = response.data;

    // Update page title with document title
    useHead({
      title: `${document.value.title} - Văn bản pháp luật`,
      meta: [{ name: "description", content: document.value.title }],
    });

    // Fetch related documents after document is loaded
    await fetchRelatedDocuments();
  } catch (err: any) {
    error.value = err;
    console.error("Error fetching document:", err);
  } finally {
    loading.value = false;
  }
};

// Initialize theme and fetch document on mount
onMounted(() => {
  themeStore.initTheme();
  fetchDocument();
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

/* Word content specific styles */
.word-content {
  font-family: "Times New Roman", serif;
  line-height: 1.8;
}

/* Highlight effect for headings */
.highlight-heading {
  animation: highlightFade 2s ease-in-out;
}

@keyframes highlightFade {
  0% {
    background-color: rgba(59, 130, 246, 0.1);
    border-left: 4px solid #3b82f6;
  }
  50% {
    background-color: rgba(59, 130, 246, 0.2);
    border-left: 4px solid #3b82f6;
  }
  100% {
    background-color: transparent;
    border-left: 4px solid transparent;
  }
}

.dark .highlight-heading {
  animation: highlightFadeDark 2s ease-in-out;
}

@keyframes highlightFadeDark {
  0% {
    background-color: rgba(96, 165, 250, 0.1);
    border-left: 4px solid #60a5fa;
  }
  50% {
    background-color: rgba(96, 165, 250, 0.2);
    border-left: 4px solid #60a5fa;
  }
  100% {
    background-color: transparent;
    border-left: 4px solid transparent;
  }
}

/* Table of contents styles for dark mode compatibility */
.dark .table-of-contents {
  background: #374151 !important;
  border-color: #4b5563 !important;
}

.dark .table-of-contents h2 {
  color: #f3f4f6 !important;
  border-bottom-color: #60a5fa !important;
}

.dark .table-of-contents a {
  color: #d1d5db !important;
}

.dark .table-of-contents a:hover {
  color: #60a5fa !important;
}

.dark .toc-level-1 a {
  color: #f3f4f6 !important;
}

.dark .toc-level-2 a {
  color: #e5e7eb !important;
}

.dark .toc-level-3 a,
.dark .toc-level-4 a,
.dark .toc-level-5 a,
.dark .toc-level-6 a {
  color: #9ca3af !important;
}

.word-content h1,
.word-content h2,
.word-content h3,
.word-content h4,
.word-content h5,
.word-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #1f2937;
}

.dark .word-content h1,
.dark .word-content h2,
.dark .word-content h3,
.dark .word-content h4,
.dark .word-content h5,
.dark .word-content h6 {
  color: #f3f4f6;
}

.word-content h1 {
  font-size: 1.875rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.word-content h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.25rem;
}

.word-content h3 {
  font-size: 1.25rem;
}

.word-content h4 {
  font-size: 1.125rem;
}

.word-content p {
  text-align: justify;
  margin-bottom: 1rem;
}

.word-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.word-content table th,
.word-content table td {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  text-align: left;
}

.word-content table th {
  background-color: #f9fafb;
  font-weight: bold;
}

.dark .word-content table th {
  background-color: #374151;
}

.word-content ul,
.word-content ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.word-content li {
  margin-bottom: 0.5rem;
}

/* Table of contents styles */
.table-of-contents {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.dark .table-of-contents {
  background: #374151;
  border-color: #4b5563;
}

.toc-item {
  margin: 8px 0;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toc-item:hover {
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
}

.dark .toc-item:hover {
  background-color: rgba(96, 165, 250, 0.1);
}

.toc-link {
  color: #495057;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
}

.toc-link:hover {
  color: #3498db;
  text-decoration: none;
}

.dark .toc-link {
  color: #d1d5db;
}

.dark .toc-link:hover {
  color: #60a5fa;
}

.toc-level-1 {
  font-weight: 600;
  color: #2c3e50;
}

.toc-level-2 {
  font-weight: 500;
  color: #34495e;
}

.toc-level-3 {
  font-weight: 400;
  color: #7f8c8d;
}

.toc-level-4 {
  font-weight: 400;
  color: #95a5a6;
}

.toc-level-5 {
  font-weight: 400;
  color: #bdc3c7;
}

.toc-level-6 {
  font-weight: 400;
  color: #ecf0f1;
}

.dark .toc-level-1 {
  color: #f3f4f6;
}

.dark .toc-level-2 {
  color: #e5e7eb;
}

.dark .toc-level-3,
.dark .toc-level-4,
.dark .toc-level-5,
.dark .toc-level-6 {
  color: #9ca3af;
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

/* Tab styles */
.tab-button {
  position: relative;
  transition: all 0.3s ease;
}

.tab-button.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #3b82f6;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
