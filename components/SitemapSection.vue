<template>
  <div class="sitemap-section">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <!-- Section Header -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold text-white">{{ title }}</h2>
            <p class="text-blue-100 text-sm mt-1">{{ urls.length }} URL</p>
          </div>
          <button
            @click="copyAllUrls"
            class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            :disabled="urls.length === 0"
          >
            <span>📋</span>
            <span>Copy tất cả URL</span>
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                URL
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Tiêu đề
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Danh mục
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Độ ưu tiên
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Tần suất cập nhật
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Cập nhật lần cuối
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <tr
              v-for="(url, index) in urls"
              :key="index"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <!-- URL -->
              <td class="px-4 py-3 text-sm">
                <div class="max-w-xs truncate">
                  <a
                    :href="url.url"
                    target="_blank"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-mono text-xs break-all"
                    :title="url.url"
                  >
                    {{ url.url }}
                  </a>
                </div>
              </td>

              <!-- Title -->
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                <div class="max-w-xs truncate" :title="url.title">
                  {{ url.title }}
                </div>
              </td>

              <!-- Category -->
              <td class="px-4 py-3 text-sm">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {{ url.category }}
                </span>
              </td>

              <!-- Priority -->
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                <span class="font-mono">{{ url.priority }}</span>
              </td>

              <!-- Change Frequency -->
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                <span class="capitalize">{{ url.changefreq }}</span>
              </td>

              <!-- Last Modified -->
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                <span v-if="url.lastmod" class="font-mono text-xs">
                  {{ formatDate(url.lastmod) }}
                </span>
                <span v-else class="text-gray-400 dark:text-gray-500">-</span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3 text-sm">
                <div class="flex space-x-2">
                  <button
                    @click="copyUrl(url.url)"
                    class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Copy URL"
                  >
                    📋
                  </button>
                  <a
                    :href="url.url"
                    target="_blank"
                    class="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                    title="Mở link"
                  >
                    🔗
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div
        v-if="urls.length === 0"
        class="text-center py-8 text-gray-500 dark:text-gray-400"
      >
        <div class="text-4xl mb-2">📭</div>
        <p>Chưa có dữ liệu</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  urls: {
    type: Array,
    default: () => [],
  },
});

// Copy URL function
const copyUrl = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    showToast("✅ Đã copy URL!");
    console.log("URL copied to clipboard:", url);
  } catch (err) {
    console.error("Failed to copy URL:", err);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast("✅ Đã copy URL!");
  }
};

// Show toast notification
const showToast = (message) => {
  // Remove existing toast
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className =
    "toast-notification fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full";
  toast.innerHTML = message;

  // Add to body
  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-x-full");
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add("translate-x-full");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

// Copy all URLs function
const copyAllUrls = async (event) => {
  if (props.urls.length === 0) return;
  console.log(props.urls);
  try {
    const allUrls = props.urls.map((item) => item.url).join("\n");
    await navigator.clipboard.writeText(allUrls);
    console.log(`Copied ${props.urls.length} URLs to clipboard`);
    showToast(`✅ Đã copy ${props.urls.length} URL!`);

    // Show success feedback
    const button = event.currentTarget;
    const originalText = button.innerHTML;
    button.innerHTML = "<span>✅</span><span>Đã copy!</span>";
    button.classList.add("bg-green-500/20");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("bg-green-500/20");
    }, 2000);
  } catch (err) {
    console.error("Failed to copy all URLs:", err);
    // Fallback for older browsers
    const allUrls = urls.map((item) => item.url).join("\n");
    const textArea = document.createElement("textarea");
    textArea.value = allUrls;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    showToast(`✅ Đã copy ${urls.length} URL!`);

    // Show success feedback
    const button = event.currentTarget;
    const originalText = button.innerHTML;
    button.innerHTML = "<span>✅</span><span>Đã copy!</span>";
    button.classList.add("bg-green-500/20");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("bg-green-500/20");
    }, 2000);
  }
};

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return dateString;
  }
};
</script>

<style scoped>
.sitemap-section {
  @apply w-full;
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.dark .overflow-x-auto::-webkit-scrollbar-track {
  background: #374151;
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
