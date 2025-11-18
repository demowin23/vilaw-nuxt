<template>
  <div class="video-management">
    <!-- Header với nút thêm mới -->
    <div class="page-header">
      <div class="header-left">
        <h2>Quản lý video pháp luật và đời sống</h2>
        <p>Tổng cộng {{ totalVideos }} video</p>
      </div>
      <button
        @click="showAddModal = true"
        class="add-btn"
        :disabled="isLoading"
      >
        <span v-if="isLoading">⏳</span>
        <span v-else>➕</span>
        {{ isLoading ? "Đang tải..." : "Thêm video mới" }}
      </button>
    </div>

    <!-- Bộ lọc và tìm kiếm -->
    <div class="filters">
      <div class="search-box">
        <input
          v-model="searchQuery"
          @input="onSearchInput"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>

      <div class="filter-group">
        <select
          v-model="typeFilter"
          @change="onFilterChange"
          class="filter-select"
        >
          <option value="">Tất cả loại video</option>
          <option v-for="type in videoTypes" :key="type.id" :value="type.slug">
            {{ type.name }}
          </option>
        </select>

        <select
          v-model="ageGroupFilter"
          @change="onFilterChange"
          class="filter-select"
        >
          <option value="">Tất cả độ tuổi</option>
          <option value="all">Tất cả</option>
          <option value="13+">13+</option>
          <option value="16+">16+</option>
          <option value="18+">18+</option>
        </select>

        <select
          v-model="featuredFilter"
          @change="onFilterChange"
          class="filter-select"
        >
          <option value="">Tất cả</option>
          <option value="true">Video nổi bật</option>
          <option value="false">Video thường</option>
        </select>

        <select
          v-model="isPending"
          @change="onFilterChange"
          class="filter-select"
        >
          <option value="">Tất cả</option>
          <option value="true">Chờ duyệt</option>
          <option value="false">Đã duyệt</option>
        </select>
      </div>
    </div>

    <!-- Bảng danh sách -->
    <div class="table-container">
      <table class="video-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Tiêu đề</th>
            <th>Copy URL</th>
            <th>Loại</th>
            <th>Độ tuổi</th>
            <th>Thời lượng</th>
            <th>Lượt xem</th>
            <th>Lượt like</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in videoList" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <img
                v-if="item.thumbnail"
                :src="getImageUrl(item.thumbnail)"
                :alt="item.title"
                class="video-thumbnail"
              />
              <div v-else class="no-thumbnail">Không có ảnh</div>
            </td>
            <td class="title-cell">
              <div class="title">{{ item.title }}</div>
            </td>
            <td class="copy-cell">
              <button
                @click="
                  copyUrl(
                    `https://vilaw.net.vn/video/${item.id}-${slugify(
                      item.title
                    )}`
                  )
                "
                class="copy-btn"
                title="Copy URL"
              >
                📋
              </button>
            </td>
            <td>
              <span class="type-badge">{{ item.type }}</span>
            </td>
            <td>
              <span class="age-badge age-{{ item.age_group }}">
                {{ getAgeGroupLabel(item.age_group) }}
              </span>
            </td>
            <td>{{ formatDuration(item.duration) }}</td>
            <td>{{ item.view_count || 0 }}</td>
            <td>{{ item.like_count || 0 }}</td>
            <td class="status">
              <input
                type="checkbox"
                v-if="isAdmin"
                v-model="item.is_approved"
                @change="approveItem(item)"
              />
              <span
                :class="`status-badge ${
                  item.is_approved ? 'status-published' : 'status-pending'
                }`"
              >
                {{ item.is_approved ? "Đã xuất bản" : "Chờ duyệt" }}
              </span>
            </td>
            <td class="actions">
              <button
                @click="viewItem(item)"
                class="action-btn view-btn"
                title="Xem"
              >
                👁️
              </button>
              <button
                @click="editItem(item)"
                class="action-btn edit-btn"
                title="Sửa"
              >
                ✏️
              </button>
              <button
                @click="deleteItem(item)"
                class="action-btn delete-btn"
                title="Xóa"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        ← Trước
      </button>

      <div class="page-numbers">
        <button
          v-for="page in visiblePages"
          :key="page"
          class="page-number"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Sau →
      </button>
    </div>

    <div v-if="showAddModal || showEditModal" class="modal-overlay">
      <div class="modal modal-wide" @click.stop>
        <div class="modal-header">
          <h3>{{ showAddModal ? "Thêm video mới" : "Sửa video" }}</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="saveItem" class="modal-form">
          <div class="form-group">
            <label>Tiêu đề *</label>
            <input v-model="itemForm.title" type="text" required />
          </div>

          <div class="form-group">
            <label>Mô tả</label>
            <textarea
              v-model="itemForm.description"
              rows="3"
              placeholder="Mô tả về video"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Thumbnail</label>
              <div class="file-upload-wrapper">
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  @change="onThumbnailChange"
                  class="file-input"
                />
                <label for="thumbnail-upload" class="file-upload-label">
                  <span v-if="!thumbnailPreview && !itemForm.thumbnail"
                    >Chọn ảnh...</span
                  >
                  <img
                    v-if="thumbnailPreview"
                    :src="thumbnailPreview"
                    alt="Preview"
                    class="file-preview"
                  />
                  <img
                    v-else-if="itemForm.thumbnail"
                    :src="getImageUrl(itemForm.thumbnail)"
                    alt="Preview"
                    class="file-preview"
                  />
                  <span
                    v-if="thumbnailPreview || itemForm.thumbnail"
                    class="change-file-btn"
                    >Đổi ảnh</span
                  >
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Ảnh (img)</label>
              <div class="file-upload-wrapper">
                <input
                  id="img-upload"
                  type="file"
                  accept="image/*"
                  @change="onImgChange"
                  class="file-input"
                />
                <label for="img-upload" class="file-upload-label">
                  <span v-if="!imgPreview && !itemForm.img">Chọn ảnh...</span>
                  <img
                    v-if="imgPreview"
                    :src="imgPreview"
                    alt="Preview"
                    class="file-preview"
                  />
                  <img
                    v-else-if="itemForm.img"
                    :src="getImageUrl(itemForm.img)"
                    alt="Preview"
                    class="file-preview"
                  />
                  <span
                    v-if="imgPreview || itemForm.img"
                    class="change-file-btn"
                    >Đổi ảnh</span
                  >
                </label>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>File video</label>
              <div class="file-upload-wrapper">
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  @change="onVideoChange"
                  class="file-input"
                />
                <label for="video-upload" class="file-upload-label">
                  <span v-if="!videoPreview && !itemForm.video"
                    >Chọn video...</span
                  >
                  <video
                    v-if="videoPreview"
                    :src="videoPreview"
                    controls
                    class="file-preview"
                  ></video>
                  <video
                    v-else-if="itemForm.video"
                    :src="getVideoUrl(itemForm.video)"
                    controls
                    class="file-preview"
                  ></video>
                  <span
                    v-if="videoPreview || itemForm.video"
                    class="change-file-btn"
                    >Đổi video</span
                  >
                </label>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Loại video *</label>
              <select v-model="itemForm.type" required>
                <option
                  v-for="type in videoTypes"
                  :key="type.id"
                  :value="type.slug"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Độ tuổi *</label>
              <select v-model="itemForm.age_group" required>
                <option value="all">Tất cả</option>
                <option value="13+">13+</option>
                <option value="16+">16+</option>
                <option value="18+">18+</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Hashtag (phân cách bằng dấu phẩy)</label>
            <input
              v-model="itemForm.tags"
              type="text"
              placeholder="Ví dụ: luat, honnhan, dandien"
            />
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="cancel-btn">
              Hủy
            </button>
            <button type="submit" class="save-btn">
              {{ showAddModal ? "Thêm" : "Cập nhật" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showViewModal" class="modal-overlay">
      <div class="modal modal-large" @click.stop>
        <div class="modal-header">
          <h3>Chi tiết video</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>
        <div class="item-detail">
          <div class="detail-header">
            <h2>{{ selectedItem.title }}</h2>
            <div class="meta-info">
              <span class="type">Loại: {{ selectedItem.type }}</span>
              <span class="age-group"
                >Độ tuổi: {{ getAgeGroupLabel(selectedItem.age_group) }}</span
              >
              <span class="duration"
                >Thời lượng: {{ formatDuration(selectedItem.duration) }}</span
              >
              <span class="views"
                >Lượt xem: {{ selectedItem.view_count || 0 }}</span
              >
              <span class="likes"
                >Lượt like: {{ selectedItem.like_count || 0 }}</span
              >
            </div>
            <div class="tags">
              <span v-if="selectedItem.is_featured" class="featured-badge">
                ⭐ Nổi bật
              </span>
              <div v-if="selectedItem.tags" class="hashtags">
                <span
                  v-for="tag in selectedItem.tags.split(',')"
                  :key="tag"
                  class="hashtag"
                >
                  #{{ tag.trim() }}
                </span>
              </div>
            </div>
          </div>

          <div class="content-preview">
            <h4>Mô tả:</h4>
            <p>{{ selectedItem.description }}</p>

            <h4>Video:</h4>
            <video
              v-if="selectedItem.video"
              :src="getVideoUrl(selectedItem.video)"
              controls
              class="video-player"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useVideoLifeLaw } from "~/composables/useVideoLifeLaw";
import { useNotification } from "~/composables/useNotification";
import { useAuth } from "~/composables/useAuth";
import { getImageUrl, getVideoUrl } from "~/utils/config";
import { slugify } from "~/utils/slugify";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const {
  getVideoLifeLaw,
  getAgeGroups,
  createVideoLifeLaw,
  updateVideoLifeLaw,
  deleteVideoLifeLaw,
  approveVideo,
  isLoading,
} = useVideoLifeLaw();
const { handleApiError, handleApiSuccess } = useNotification();
const { isAdmin } = useAuth();

// State
const isPending = ref("");
const videoList = ref([]);
const videoTypes = ref([
  {
    id: 1,
    name: "Dân sự – Thừa kế – Hôn nhân và gia đình",
    slug: "dan_su_thua_ke_hon_nhan_va_gia_dinh",
  },
  { id: 2, name: "Hình sự", slug: "hinh_su" },
  { id: 3, name: "Giải quyết tranh chấp", slug: "giai_quyet_tranh_chap" },
  { id: 4, name: "Kinh doanh thương mại", slug: "kinh_doanh_thuong_mai" },
  { id: 5, name: "Lao động", slug: "lao_dong" },
  { id: 6, name: "Đất đai", slug: "dat_dai" },
  { id: 7, name: "Thể loại khác", slug: "the_loai_khac" },
]);
const ageGroups = ref([]);
const totalVideos = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(20);
const isLoadingVideos = ref(false);

// Pagination computed
const totalPages = computed(() => {
  const pages = Math.ceil(totalVideos.value / itemsPerPage.value);
  return Math.max(1, pages); // Đảm bảo ít nhất có 1 trang
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const searchQuery = ref("");
const typeFilter = ref("");
const ageGroupFilter = ref("");
const featuredFilter = ref("");
const showAddModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const selectedItem = ref({});
const itemForm = ref({
  title: "",
  thumbnail: "",
  img: "",
  description: "",
  video: "",
  duration: 0,
  age_group: "all",
  type: "",
  tags: "",
  is_featured: false,
});

// File upload states
const thumbnailFile = ref(null);
const imgFile = ref(null);
const videoFile = ref(null);
const thumbnailPreview = ref("");
const imgPreview = ref("");
const videoPreview = ref("");

// Debounce timer for search
let searchTimer = null;

// Methods
const getAgeGroupLabel = (ageGroup) => {
  const labels = {
    all: "Tất cả",
    "13+": "13+",
    "16+": "16+",
    "18+": "18+",
  };
  return labels[ageGroup] || ageGroup;
};

const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const copyUrl = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    handleApiSuccess({ message: "Đã copy URL thành công!" });
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    handleApiSuccess({ message: "Đã copy URL thành công!" });
  }
};

const onThumbnailChange = (e) => {
  const files = e.target.files;
  if (!files || !files[0]) return;
  thumbnailFile.value = files[0];
  thumbnailPreview.value = URL.createObjectURL(files[0]);
};

const onImgChange = (e) => {
  const files = e.target.files;
  if (!files || !files[0]) return;
  imgFile.value = files[0];
  imgPreview.value = URL.createObjectURL(files[0]);
};

const onVideoChange = (e) => {
  const files = e.target.files;
  if (!files || !files[0]) return;
  videoFile.value = files[0];
  videoPreview.value = URL.createObjectURL(files[0]);

  // Tạo thẻ video ẩn để lấy duration
  const tempVideo = document.createElement("video");
  tempVideo.preload = "metadata";
  tempVideo.src = videoPreview.value;
  tempVideo.onloadedmetadata = () => {
    // Lấy duration (giây, làm tròn xuống)
    itemForm.value.duration = Math.floor(tempVideo.duration);
    // Giải phóng bộ nhớ
    URL.revokeObjectURL(tempVideo.src);
  };
};

// Load videos with pagination
const loadVideos = async () => {
  // Tránh gọi API nhiều lần đồng thời
  if (isLoadingVideos.value) {
    return;
  }

  try {
    isLoadingVideos.value = true;
    const params = {
      isAdmin: true,
      page: currentPage.value,
      limit: itemsPerPage.value,
    };

    if (searchQuery.value) {
      params.search = searchQuery.value;
    }

    if (typeFilter.value) {
      params.type = typeFilter.value;
    }

    if (ageGroupFilter.value) {
      params.age_group = ageGroupFilter.value;
    }

    if (featuredFilter.value) {
      params.is_featured = featuredFilter.value === "true";
    }

    if (isPending.value) {
      params.isPending = isPending.value === "true";
    }

    const response = await getVideoLifeLaw(params);

    if (response && response.success && response.data) {
      videoList.value = response.data;
      totalVideos.value =
        response.pagination?.total || response.total || response.data.length;
    } else {
      videoList.value = response?.data || [];
      totalVideos.value = response?.pagination?.total || response?.total || 0;
    }
  } catch (error) {
    console.error("Error loading videos:", error);
    handleApiError(error, "Không thể tải danh sách video");
  } finally {
    isLoadingVideos.value = false;
  }
};

// Load age groups
const loadAgeGroups = async () => {
  try {
    const response = await getAgeGroups();
    if (response && response.data) {
      ageGroups.value = response.data;
    }
  } catch (error) {
    console.error("Error loading age groups:", error);
    handleApiError(error, "Không thể tải độ tuổi");
  }
};

// Filter change handler
const onFilterChange = async () => {
  try {
    currentPage.value = 1; // Reset to first page when filtering
    await loadVideos();
  } catch (error) {
    console.error("Error filtering videos:", error);
  }
};

// Search input handler with debounce
const onSearchInput = () => {
  // Clear previous timer
  if (searchTimer) {
    clearTimeout(searchTimer);
  }

  // Set new timer
  searchTimer = setTimeout(async () => {
    try {
      currentPage.value = 1; // Reset to first page when searching
      await loadVideos();
    } catch (error) {
      console.error("Error searching videos:", error);
    }
  }, 500); // 500ms delay
};

// Pagination function - chỉ gọi API một lần khi chọn trang
const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page;
    await loadVideos();
  }
};

// CRUD operations
const viewItem = (item) => {
  selectedItem.value = item;
  showViewModal.value = true;
};

const editItem = (item) => {
  selectedItem.value = item;
  itemForm.value = {
    title: item.title,
    thumbnail: item.thumbnail || "",
    img: item.img || "",
    description: item.description || "",
    video: item.video || "",
    duration: item.duration || 0,
    age_group: item.age_group,
    type: item.type,
    tags: item.tags || "",
    is_featured: item.is_featured || false,
  };
  showEditModal.value = true;
};

const deleteItem = async (item) => {
  if (confirm(`Bạn có chắc muốn xóa video "${item.title}"?`)) {
    try {
      await deleteVideoLifeLaw(item.id);
      handleApiSuccess({ message: "Xóa video thành công!" });
      // Reload videos with current pagination
      await loadVideos();
    } catch (error) {
      handleApiError(error, "Không thể xóa video");
    }
  }
};

const approveItem = async (item) => {
  try {
    await approveVideo(item.id, item.is_approved);
    handleApiSuccess({
      message: item.is_approved
        ? "Đã duyệt video thành công!"
        : "Đã từ chối video thành công!",
    });
    // Không cần reload vì checkbox đã update trực tiếp
  } catch (error) {
    // Revert checkbox nếu có lỗi
    item.is_approved = !item.is_approved;
    handleApiError(error, "Không thể thay đổi trạng thái duyệt");
  }
};

const saveItem = async () => {
  try {
    let payload;
    let isFormData = false;

    if (thumbnailFile.value || imgFile.value || videoFile.value) {
      payload = new FormData();
      payload.append("title", itemForm.value.title);
      payload.append("description", itemForm.value.description || "");
      payload.append("duration", itemForm.value.duration.toString());
      payload.append("age_group", itemForm.value.age_group);
      payload.append("type", itemForm.value.type);
      payload.append("tags", itemForm.value.tags);
      payload.append(
        "is_featured",
        itemForm.value.is_featured ? "true" : "false"
      );
      if (thumbnailFile.value) {
        payload.append("thumbnail", thumbnailFile.value);
      }
      if (imgFile.value) {
        payload.append("img", imgFile.value);
      }
      if (videoFile.value) {
        payload.append("video", videoFile.value);
      }
      isFormData = true;
    } else {
      payload = { ...itemForm.value };
    }

    if (showAddModal.value) {
      const response = await createVideoLifeLaw(payload, isFormData);
      handleApiSuccess(response, "Tạo video thành công!");
    } else {
      const response = await updateVideoLifeLaw(
        selectedItem.value.id,
        payload,
        isFormData
      );
      handleApiSuccess(response, "Cập nhật video thành công!");
    }

    closeModal();
    // Reload videos with current pagination
    await loadVideos();
  } catch (error) {
    handleApiError(error, "Không thể lưu video");
  }
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showViewModal.value = false;
  selectedItem.value = {};
  itemForm.value = {
    title: "",
    thumbnail: "",
    img: "",
    description: "",
    video: "",
    duration: 0,
    age_group: "all",
    type: "",
    tags: "",
    is_featured: false,
  };
  thumbnailPreview.value = "";
  imgPreview.value = "";
  videoPreview.value = "";
  thumbnailFile.value = null;
  imgFile.value = null;
  videoFile.value = null;
};

// Lifecycle
onMounted(() => {
  loadVideos();
  loadAgeGroups();
});
</script>

<style scoped>
.video-management {
  padding: 8px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.header-left p {
  margin: 0;
  color: var(--text-secondary);
}

.add-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background: var(--primary-dark);
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-primary);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.filter-group {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-primary);
  min-width: 150px;
}

.table-container {
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.video-table {
  width: 100%;
  border-collapse: collapse;
}

.video-table th,
.video-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.video-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
}

.video-thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.no-thumbnail {
  width: 80px;
  height: 60px;
  background: var(--bg-hover);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.title-cell {
  max-width: 300px;
}

.title {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.type-badge,
.age-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.type-badge {
  background: #4ecdc4;
  color: white;
}

.age-all {
  background: #51cf66;
  color: white;
}

.age-13 + {
  background: #ffd43b;
  color: white;
}

.age-16 + {
  background: #ff922b;
  color: white;
}

.age-18 + {
  background: #ff6b6b;
  color: white;
}

.featured-badge {
  background: #fcc419;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.normal-badge {
  background: #868e96;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.view-btn:hover {
  background: var(--primary-light);
}

.edit-btn:hover {
  background: var(--warning-light);
}

.delete-btn:hover {
  background: var(--danger-light);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg-card);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-wide {
  max-width: 1200px;
}

.modal-large {
  max-width: 1200px;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: var(--bg-hover);
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.file-upload-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.file-input {
  display: none;
}

.file-upload-label {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: #f7f7f7;
  border: 2px dashed #ff6600;
  border-radius: 12px;
  color: #ff6600;
  font-weight: 500;
  cursor: pointer;
  min-width: 200px;
  min-height: 120px;
  transition: background 0.2s, border-color 0.2s;
  text-align: center;
}

.file-upload-label:hover {
  background: #fff3e0;
  border-color: #ff6600;
}

.file-preview {
  max-width: 200px;
  max-height: 120px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.change-file-btn {
  color: #ff6600;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-decoration: underline;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.item-detail {
  padding: 1.5rem;
}

.detail-header {
  margin-bottom: 2rem;
}

.detail-header h2 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.meta-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.content-preview h4 {
  margin: 1.5rem 0 0.5rem 0;
  color: var(--text-primary);
}

.content-preview p {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.video-player {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hashtags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.hashtag {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status {
  white-space-collapse: preserve;
  text-wrap-mode: nowrap;
}

.copy-cell {
  text-align: center;
}

.copy-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  color: #666;
}

.copy-btn:hover {
  background: #f0f0f0;
  color: #ff6600;
  transform: scale(1.1);
}

.copy-btn:active {
  transform: scale(0.95);
}
.status-pending {
  background: #ffd43b;
  color: white;
}

.status-published {
  background: #51cf66;
  color: white;
}

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem 0;
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.pagination-btn {
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, border-color 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--primary-color);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--text-secondary);
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, border-color 0.2s;
}

.page-number:hover:not(.active) {
  background: var(--bg-hover);
  border-color: var(--primary-color);
}

.page-number.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .video-management {
    padding: 4px;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .filters {
    flex-direction: column;
  }

  .search-box {
    min-width: auto;
  }

  .filter-group {
    flex-direction: column;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .video-table {
    font-size: 0.9rem;
  }

  .video-table th,
  .video-table td {
    padding: 0.5rem;
  }

  .actions {
    flex-direction: column;
  }

  .meta-info {
    flex-direction: column;
    gap: 0.5rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .page-numbers {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
}
</style>
