<template>
  <div class="bg-gray-100 rounded-2xl p-4 mb-4">
    <div class="flex items-center mb-2">
      <span class="text-orange-500 font-bold text-lg flex items-center">
        <svg
          class="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Mới nhất
      </span>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
      ></div>
    </div>

    <!-- Video content -->
    <div v-else>
      <!-- Featured videos (first 2) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div
          v-for="video in featuredVideos"
          :key="video.id"
          class="bg-white rounded-xl shadow p-0 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
          @click="navigateToVideo(video.id, video.title)"
        >
          <img
            :src="getImageUrl(video.thumbnail)"
            class="w-full h-52 object-cover"
            :alt="video.title"
          />
          <div class="p-4 flex-1 flex flex-col">
            <h2 class="font-bold text-base md:text-lg lg:text-xl mb-2">
              {{ video.title }}
            </h2>
            <div class="text-gray-500 text-sm mt-auto flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6l4 2"
                />
              </svg>
              {{ formatTimeAgo(video.ts_create) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Other videos (remaining 3) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="video in otherVideos"
          :key="video.id"
          class="bg-white rounded-xl shadow p-0 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
          @click="navigateToVideo(video.id, video.title)"
        >
          <img
            :src="getImageUrl(video.thumbnail)"
            class="w-full h-48 object-cover"
            :alt="video.title"
          />
          <div class="p-4 flex-1 flex flex-col">
            <h2 class="font-bold text-sm md:text-base lg:text-lg mb-2">
              {{ video.title }}
            </h2>
            <div class="text-gray-500 text-sm mt-auto flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6l4 2"
                />
              </svg>
              {{ formatTimeAgo(video.ts_create) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useVideoLifeLaw } from "~/composables/useVideoLifeLaw";
import { getApiConfig } from "~/utils/config";
import { slugify } from "~/utils/slugify";

const { getVideoLifeLaw, isLoading } = useVideoLifeLaw();
const videos = ref([]);

// Computed properties to split videos into featured and other
const featuredVideos = computed(() => videos.value.slice(0, 2));
const otherVideos = computed(() => videos.value.slice(2, 5));

// Helper function to get full image URL from backend
const getImageUrl = (imagePath) => {
  if (!imagePath) return "/images/n.png";
  if (imagePath.startsWith("http")) return imagePath;
  return `${getApiConfig().BASE_URL.replace("/api/v1", "")}${imagePath}`;
};

// Fetch videos on component mount
onMounted(async () => {
  try {
    const response = await getVideoLifeLaw({
      limit: 5,
      sort_by: "ts_create",
      sort_order: "desc",
    });
    videos.value = response.data || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
});

// Navigate to video detail page
const navigateToVideo = (videoId, title) => {
  navigateTo(`/video/${videoId}-${slugify(title)}`);
};

// Format time ago
const formatTimeAgo = (dateString) => {
  if (!dateString) return "Không xác định";

  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 0) {
    return `${diffInYears} năm trước`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} tháng trước`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ngày trước`;
  } else {
    return "Hôm nay";
  }
};
</script>
<style scoped>
.material-icons {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
@media (max-width: 768px) {
  .bg-gray-100 {
    padding: 2px;
  }
  .grid-cols-1,
  .md\:grid-cols-2,
  .md\:grid-cols-3 {
    grid-template-columns: 1fr !important;
  }
  h2 {
    font-size: 0.95rem !important;
  }
  .p-4 {
    padding: 10px !important;
  }
}
@media (max-width: 1024px) {
  .w-1\/4 {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    margin-top: 16px;
  }
}
</style>
