<template>
  <div class="sitemap-page">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Sitemap - Bản đồ Website
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Danh sách đầy đủ tất cả trang và bài viết trên website VILAW
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div
          class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ stats.totalPages }}
          </div>
          <div class="text-blue-800 dark:text-blue-200">Tổng số trang</div>
        </div>
        <div
          class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800"
        >
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">
            {{ stats.knowledge }}
          </div>
          <div class="text-green-800 dark:text-green-200">
            Bài viết kiến thức
          </div>
        </div>
        <div
          class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {{ stats.videos }}
          </div>
          <div class="text-purple-800 dark:text-purple-200">
            Video pháp luật
          </div>
        </div>
        <div
          class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800"
        >
          <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {{ stats.documents }}
          </div>
          <div class="text-yellow-800 dark:text-yellow-200">
            Văn bản pháp luật
          </div>
        </div>
        <div
          class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {{ stats.news }}
          </div>
          <div class="text-orange-800 dark:text-orange-200">Tin tức</div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          Đang tải dữ liệu sitemap...
        </p>
      </div>

      <!-- Sitemap Content -->
      <div v-else>
        <!-- Static Pages Section -->
        <SitemapSection title="Trang Chính" :urls="staticPages" class="mb-8" />

        <!-- Knowledge Section -->
        <SitemapSection
          title="Kiến Thức Pháp Luật"
          :urls="knowledgeUrls"
          class="mb-8"
        />

        <!-- Videos Section -->
        <SitemapSection
          title="Video Pháp Luật Đời Sống"
          :urls="videoUrls"
          class="mb-8"
        />

        <!-- Documents Section -->
        <SitemapSection
          title="Văn Bản Pháp Luật"
          :urls="documentUrls"
          class="mb-8"
        />

        <!-- News Section -->
        <SitemapSection
          title="Tin Tức Pháp Luật"
          :urls="newsUrls"
          class="mb-8"
        />

        <!-- Export Buttons -->
        <div class="text-center mt-12 space-x-4">
          <button
            @click="copyAllUrls"
            class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            📋 Copy tất cả URL
          </button>
          <button
            @click="exportToCSV"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            📥 Xuất CSV
          </button>
          <button
            @click="exportToTXT"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            📄 Xuất TXT
          </button>
          <a
            href="/api/sitemap.xml"
            target="_blank"
            class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            🔗 Xem XML
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// SEO
useHead({
  title: "Sitemap - Bản đồ Website | VILAW",
  meta: [
    {
      name: "description",
      content:
        "Danh sách đầy đủ tất cả trang và bài viết trên website VILAW - Kiến thức pháp luật, video, văn bản, tin tức",
    },
    { name: "robots", content: "noindex, nofollow" },
  ],
});

// State
const loading = ref(true);
const sitemapData = ref({
  knowledge: [],
  videos: [],
  documents: [],
  news: [],
});

// Computed stats
const stats = computed(() => ({
  totalPages:
    staticPages.length +
    knowledgeUrls.value.length +
    videoUrls.value.length +
    documentUrls.value.length +
    newsUrls.value.length,
  knowledge: knowledgeUrls.value.length,
  videos: videoUrls.value.length,
  documents: documentUrls.value.length,
  news: newsUrls.value.length,
}));

// Static pages
const staticPages = [
  {
    url: "https://vilaw.net.vn/",
    title: "Trang chủ",
    category: "Trang chính",
    priority: "1.0",
    changefreq: "daily",
  },
  {
    url: "https://vilaw.net.vn/kien-thuc",
    title: "Kiến thức pháp luật",
    category: "Trang chính",
    priority: "0.9",
    changefreq: "daily",
  },
  {
    url: "https://vilaw.net.vn/phap-luat-doi-song",
    title: "Pháp luật đời sống",
    category: "Trang chính",
    priority: "0.9",
    changefreq: "daily",
  },
  {
    url: "https://vilaw.net.vn/van-ban",
    title: "Văn bản pháp luật",
    category: "Trang chính",
    priority: "0.9",
    changefreq: "daily",
  },
  {
    url: "https://vilaw.net.vn/tin-tuc",
    title: "Tin tức pháp luật",
    category: "Trang chính",
    priority: "0.9",
    changefreq: "daily",
  },
  {
    url: "https://vilaw.net.vn/chat-luat-su",
    title: "Chat luật sư",
    category: "Trang chính",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/mua-goi",
    title: "Mua gói dịch vụ",
    category: "Trang chính",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/lien-he",
    title: "Liên hệ",
    category: "Trang chính",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    url: "https://vilaw.net.vn/gioi-thieu",
    title: "Giới thiệu",
    category: "Trang chính",
    priority: "0.7",
    changefreq: "monthly",
  },
];

// Knowledge category pages
const knowledgeCategories = [
  {
    url: "https://vilaw.net.vn/kien-thuc/dan-su",
    title: "Kiến thức dân sự",
    category: "Danh mục kiến thức",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/kien-thuc/hinh-su",
    title: "Kiến thức hình sự",
    category: "Danh mục kiến thức",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/kien-thuc/kinh-te",
    title: "Kiến thức kinh tế",
    category: "Danh mục kiến thức",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/kien-thuc/lao-dong",
    title: "Kiến thức lao động",
    category: "Danh mục kiến thức",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/kien-thuc/dat-dai",
    title: "Kiến thức đất đai",
    category: "Danh mục kiến thức",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/kien-thuc/thua-ke",
    title: "Kiến thức thừa kế",
    category: "Danh mục kiến thức",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/kien-thuc/hon-nhan",
    title: "Kiến thức hôn nhân",
    category: "Danh mục kiến thức",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    url: "https://vilaw.net.vn/kien-thuc/the_loai_khac",
    title: "Kiến thức khác",
    category: "Danh mục kiến thức",
    priority: "0.8",
    changefreq: "weekly",
  },
];

// Computed URLs
const knowledgeUrls = computed(() => [
  ...knowledgeCategories,
  ...sitemapData.value.knowledge.map((article) => ({
    url: `https://vilaw.net.vn/kien-thuc/chi-tiet/${article.id}-${slugify(
      article.title
    )}`,
    title: article.title,
    category: "Bài viết kiến thức",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: article.ts_update,
  })),
]);

const videoUrls = computed(() => [
  ...sitemapData.value.videos.map((video) => ({
    url: `https://vilaw.net.vn/video/${video.id}-${slugify(video.title)}`,
    title: video.title,
    category: "Video pháp luật",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: video.ts_update,
  })),
]);

const documentUrls = computed(() => [
  ...sitemapData.value.documents.map((doc) => ({
    url: `https://vilaw.net.vn/van-ban/${doc.id}-${slugify(doc.title)}`,
    title: doc.title,
    category: "Văn bản pháp luật",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: doc.ts_update,
  })),
]);

const newsUrls = computed(() => [
  ...sitemapData.value.news.map((news) => ({
    url: `https://vilaw.net.vn/tin-tuc/${news.id}-${slugify(news.title)}`,
    title: news.title,
    category: "Tin tức pháp luật",
    priority: "0.8",
    changefreq: "weekly",
    lastmod: news.ts_update,
  })),
]);

// Fetch data
const fetchSitemapData = async () => {
  try {
    loading.value = true;
    const config = await $fetch("/api/config");

    const [knowledge, videos, documents, news] = await Promise.all([
      $fetch(`${config.BASE_URL}/legal-knowledge?limit=10000`),
      $fetch(`${config.BASE_URL}/video-life-law?limit=10000`),
      $fetch(`${config.BASE_URL}/legal-documents?limit=10000`),
      $fetch(`${config.BASE_URL}/legal-news?limit=10000`),
    ]);

    sitemapData.value = {
      knowledge: knowledge.data || [],
      videos: videos.data || [],
      documents: documents.data || [],
      news: news.data || [],
    };
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
  } finally {
    loading.value = false;
  }
};

const exportToCSV = () => {
  const allUrls = [
    ...staticPages,
    ...knowledgeUrls.value,
    ...videoUrls.value,
    ...documentUrls.value,
    ...newsUrls.value,
  ];

  const csvContent = [
    "URL,Title,Category,Priority,Change Frequency,Last Modified",
    ...allUrls.map(
      (item) =>
        `"${item.url}","${item.title}","${item.category}","${item.priority}","${
          item.changefreq
        }","${item.lastmod || ""}"`
    ),
  ].join("\n");

  downloadFile(csvContent, "vilaw-sitemap.csv", "text/csv");
};

const exportToTXT = () => {
  const allUrls = [
    ...staticPages,
    ...knowledgeUrls.value,
    ...videoUrls.value,
    ...documentUrls.value,
    ...newsUrls.value,
  ];

  const txtContent = allUrls
    .map(
      (item) =>
        `${item.url}\t${item.title}\t${item.category}\t${item.priority}\t${item.changefreq}`
    )
    .join("\n");

  downloadFile(txtContent, "vilaw-sitemap.txt", "text/plain");
};

// Copy all URLs function
const copyAllUrls = async (event) => {
  const allUrls = [
    ...staticPages,
    ...knowledgeUrls.value,
    ...videoUrls.value,
    ...documentUrls.value,
    ...newsUrls.value,
  ];

  if (allUrls.length === 0) return;

  try {
    const urlsText = allUrls.map((item) => item.url).join("\n");
    await navigator.clipboard.writeText(urlsText);
    console.log(`Copied ${allUrls.length} URLs to clipboard`);
    showToast(`✅ Đã copy ${allUrls.length} URL!`);

    // Show success feedback
    const button = event.currentTarget;
    const originalText = button.innerHTML;
    button.innerHTML = "✅ Đã copy!";
    button.classList.add("bg-green-600");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("bg-green-600");
    }, 2000);
  } catch (err) {
    console.error("Failed to copy all URLs:", err);
    // Fallback for older browsers
    const urlsText = allUrls.map((item) => item.url).join("\n");
    const textArea = document.createElement("textarea");
    textArea.value = urlsText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    showToast(`✅ Đã copy ${allUrls.length} URL!`);

    // Show success feedback
    const button = event.currentTarget;
    const originalText = button.innerHTML;
    button.innerHTML = "✅ Đã copy!";
    button.classList.add("bg-green-600");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("bg-green-600");
    }, 2000);
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

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Slugify function
const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Lifecycle
onMounted(() => {
  fetchSitemapData();
});
</script>

<style scoped>
.sitemap-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.dark .sitemap-page {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}
</style>
