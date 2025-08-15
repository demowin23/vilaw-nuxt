<template>
  <div class="news-management">
    <!-- Header với nút thêm mới -->
    <div class="page-header">
      <div class="header-left">
        <h2>Quản lý tin tức pháp luật</h2>
        <p>Tổng cộng {{ totalNews }} tin tức</p>
      </div>
      <button
        @click="showAddModal = true"
        class="add-btn"
        :disabled="isLoading"
      >
        <span v-if="isLoading">⏳</span>
        <span v-else>➕</span>
        {{ isLoading ? "Đang tải..." : "Thêm tin tức mới" }}
      </button>
    </div>

    <!-- Bộ lọc và tìm kiếm -->
    <div class="filters">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề..."
          class="search-input"
          @input="onSearchInput"
        />
        <span class="search-icon">🔍</span>
      </div>
      <div class="filter-group">
        <select
          v-model="statusFilter"
          class="filter-select"
          @change="onFilterChange"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="true">Chờ duyệt</option>
          <option value="false">Đã duyệt</option>
        </select>
      </div>
    </div>

    <!-- Bảng danh sách -->
    <div class="table-container">
      <table class="news-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Copy URL</th>
            <th>Mô tả</th>
            <th>Ảnh</th>
            <th>Trạng thái</th>
            <th>Tags</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in newsList" :key="item.id">
            <td>{{ item.id }}</td>
            <td class="news-title">{{ item.title }}</td>
            <td class="copy-cell">
              <button
                @click="
                  copyUrl(
                    `https://vilaw.net.vn/tin-tuc/${item.id}-${slugify(
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
            <td class="news-description">{{ item.description }}</td>
            <td>
              <img
                v-if="item.image"
                :src="getImageUrl(item.image)"
                alt="Ảnh"
                class="file-preview"
                style="max-width: 80px; max-height: 60px"
              />
              <span v-else>Không có ảnh</span>
            </td>
            <td class="flex items-center">
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
                {{ getStatusLabel(item) }}
              </span>
            </td>
            <td>
              <div class="news-tags min-w-[100px]">
                {{ item.tags ? item.tags.replace(/[{}"]/g, "") : "" }}
              </div>
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
                @click="deleteItemHandler(item)"
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

    <!-- Modal thêm/sửa -->
    <div
      v-if="showAddModal || showEditModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal modal-wide" @click.stop>
        <div class="modal-header">
          <h3>{{ showAddModal ? "Thêm tin tức mới" : "Sửa tin tức" }}</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>
        <form @submit.prevent="saveItem" class="modal-form">
          <div class="form-group">
            <label>Tiêu đề *</label>
            <input v-model="itemForm.title" type="text" required />
          </div>
          <div class="form-group">
            <label>Mô tả *</label>
            <textarea
              v-model="itemForm.description"
              rows="2"
              required
              placeholder="Mô tả ngắn gọn về tin tức"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Ảnh đại diện</label>
            <div class="file-upload-wrapper">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                @change="onImageChange"
                class="file-input"
              />
              <label for="image-upload" class="file-upload-label">
                <span v-if="!imagePreview && !itemForm.image">Chọn ảnh...</span>
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="file-preview"
                />
                <img
                  v-else-if="itemForm.image"
                  :src="getImageUrl(itemForm.image)"
                  alt="Preview"
                  class="file-preview"
                />
                <span
                  v-if="imagePreview || itemForm.image"
                  class="change-file-btn"
                  >Đổi ảnh</span
                >
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>Nội dung *</label>
            <client-only>
              <QuillEditor v-model="itemForm.content" theme="snow" />
            </client-only>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Tags (phân cách bằng dấu phẩy)</label>
              <input
                v-model="tagsInput"
                type="text"
                placeholder="Ví dụ: pháp luật, thời sự"
              />
            </div>
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

    <!-- Modal xem chi tiết -->
    <div v-if="showViewModal" class="modal-overlay" @click="closeModal">
      <div class="modal modal-large" @click.stop>
        <div class="modal-header">
          <h3>Chi tiết tin tức</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>
        <div class="item-detail">
          <div class="detail-header">
            <h2>{{ selectedItem.title }}</h2>
            <div class="meta-info">
              <div class="meta-row">
                <span class="label">Trạng thái:</span>
                <span :class="`status-badge status-${selectedItem.status}`">{{
                  getStatusLabel(selectedItem.status)
                }}</span>
              </div>
              <div class="meta-row">
                <span class="label">Tags:</span>
                <span class="value">
                  <span
                    v-for="tag in selectedItem.tags"
                    :key="tag"
                    class="tag"
                    >{{ tag }}</span
                  >
                </span>
              </div>
            </div>
            <div v-if="selectedItem.image" class="featured-image">
              <img
                :src="getImageUrl(selectedItem.image)"
                :alt="selectedItem.title"
              />
            </div>
            <h4>Mô tả:</h4>
            <p>{{ selectedItem.description }}</p>
            <h4>Nội dung:</h4>
            <div class="content-text" v-html="selectedItem.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useNotification } from "~/composables/useNotification";
import { useNews } from "~/composables/useNews";
import { useAuth } from "~/composables/useAuth";
import { getImageUrl as getImageUrlUtil } from "~/utils/config";
import { slugify } from "~/utils/slugify";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { handleApiError, handleApiSuccess } = useNotification();
const {
  isLoading,
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  approveNews,
} = useNews();
const { user, isAdmin } = useAuth();

// State
const newsList = ref([]);
const totalNews = ref(0);
const searchQuery = ref("");
const statusFilter = ref("");
const showAddModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const selectedItem = ref({});
const itemForm = ref({
  title: "",
  description: "",
  content: "",
  image: "",
  tags: [],
});

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(20);

// Pagination computed
const totalPages = computed(() =>
  Math.ceil(totalNews.value / itemsPerPage.value)
);

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

// File upload states
const imageFile = ref(null);
const imagePreview = ref("");
const tagsInput = ref("");

// Debounce timer for search
let searchTimer = null;

// Methods
const getStatusLabel = (item) => {
  if (item.is_approved) {
    return "Đã xuất bản";
  } else {
    return "Chờ duyệt";
  }
};

const getImageUrl = (image) => {
  return getImageUrlUtil(image);
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

const onImageChange = (e) => {
  const files = e.target.files;
  if (!files || !files[0]) return;
  imageFile.value = files[0];
  imagePreview.value = URL.createObjectURL(files[0]);
};

// Load news with pagination
const loadNews = async () => {
  try {
    const params = {
      search: searchQuery.value,
      isPending: statusFilter.value,
      isAdmin: true,
      page: currentPage.value,
      limit: itemsPerPage.value,
    };

    console.log("Loading news with params:", params);

    const res = await getNews(params);

    // Handle API response properly
    if (res && res.data) {
      newsList.value = res.data;
      totalNews.value = res.total || res.data.length;
    } else {
      // Fallback if response structure is different
      newsList.value = res || [];
      totalNews.value = res?.total || res?.length || 0;
    }

    console.log("News loaded:", {
      currentPage: currentPage.value,
      totalNews: totalNews.value,
      totalPages: totalPages.value,
      newsCount: newsList.value.length,
    });
  } catch (e) {
    console.error("Error loading news:", e);
    handleApiError(e, "Không thể tải danh sách tin tức");
  }
};

// Filter change handler
const onFilterChange = async () => {
  try {
    currentPage.value = 1; // Reset to first page when filtering
    console.log("Filter changed, resetting to page 1");
    await loadNews();
  } catch (error) {
    console.error("Error filtering news:", error);
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
      console.log("Search changed, resetting to page 1");
      await loadNews();
    } catch (error) {
      console.error("Error searching news:", error);
    }
  }, 500); // 500ms delay
};

// Pagination function
const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    console.log("Going to page:", page);
    await loadNews();
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
    description: item.description,
    content: item.content,
    image: item.image,
    status: item.status,
    tags: Array.isArray(item.tags) ? item.tags : [],
  };
  tagsInput.value = itemForm.value.tags.join(", ");
  imagePreview.value = "";
  imageFile.value = null;
  showEditModal.value = true;
};

const deleteItemHandler = async (item) => {
  if (confirm(`Bạn có chắc muốn xóa tin tức "${item.title}"?`)) {
    try {
      await deleteNews(item.id);
      handleApiSuccess({ message: "Xóa tin tức thành công!" });
      // Reload news with current pagination
      await loadNews();
    } catch (e) {
      handleApiError(e, "Không thể xóa tin tức");
    }
  }
};

const approveItem = async (item) => {
  try {
    await approveNews(item.id, item.is_approved);
    handleApiSuccess({
      message: item.is_approved
        ? "Đã duyệt tin tức thành công!"
        : "Đã từ chối tin tức thành công!",
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
    const formData = new FormData();
    formData.append("title", itemForm.value.title);
    formData.append("description", itemForm.value.description);
    formData.append("content", itemForm.value.content);

    // Tags xử lý thành mảng
    const tagsArr = tagsInput.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    tagsArr.forEach((tag) => formData.append("tags[]", tag));

    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    if (showEditModal.value && selectedItem.value.id) {
      await updateNews(selectedItem.value.id, formData);
      handleApiSuccess({ message: "Cập nhật tin tức thành công!" });
    } else {
      await createNews(formData);
      handleApiSuccess({ message: "Thêm tin tức thành công!" });
    }

    closeModal();
    // Reload news with current pagination
    await loadNews();
  } catch (e) {
    handleApiError(e, "Không thể lưu tin tức");
  }
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showViewModal.value = false;
  selectedItem.value = {};
  itemForm.value = {
    title: "",
    description: "",
    content: "",
    image: "",
    tags: [],
  };
  imageFile.value = null;
  imagePreview.value = "";
  tagsInput.value = "";
};

// Lifecycle
onMounted(() => {
  loadNews();
});

// Watch for filter changes
watch([searchQuery, statusFilter], () => {
  currentPage.value = 1; // Reset to first page when filtering
  loadNews();
});
</script>

<style scoped>
.news-management {
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

.news-table {
  width: 100%;
  border-collapse: collapse;
}
.news-table th,
.news-table td {
  padding: 1rem;
  text-align: left;
}
.news-table tr {
  border-bottom: 1px solid var(--border-color);
}

.news-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
}

.news-info {
  max-width: 400px;
}

.news-title {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-excerpt {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag {
  background: var(--primary-light);
  color: var(--primary-color);
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.category-badge,
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

.category-breaking {
  background: #ff6b6b;
  color: white;
}

.category-policy {
  background: #4ecdc4;
  color: white;
}

.category-court {
  background: #feca57;
  color: white;
}

.category-lawyer {
  background: #48dbfb;
  color: white;
}

.category-analysis {
  background: #ff9ff3;
  color: white;
}

.category-other {
  background: #54a0ff;
  color: white;
}

.status-published {
  background: #51cf66;
  color: white;
}

.status-pending {
  background: #ffa500;
  color: white;
}

.status-draft {
  background: #868e96;
  color: white;
}

.status-archived {
  background: #ff6b6b;
  color: white;
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
  max-width: 700px;
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
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
}

.meta-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-row .label {
  font-weight: 500;
  color: var(--text-primary);
  min-width: 100px;
}

.meta-row .value {
  color: var(--text-secondary);
}

.tags-section {
  margin-top: 1rem;
}

.tags-section h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.content-preview h4 {
  margin: 1.5rem 0 0.5rem 0;
  color: var(--text-primary);
}

.featured-image {
  margin-bottom: 1.5rem;
}

.featured-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
}

.content-preview p {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.content-text {
  background: var(--bg-hover);
  padding: 1rem;
  border-radius: 8px;
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-wrap;
  max-height: 400px;
  overflow-y: auto;
}

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
}

.pagination-btn {
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--primary-light);
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
  transition: background-color 0.2s, border-color 0.2s;
  font-weight: 500;
}

.page-number:hover:not(.active) {
  background: var(--primary-light);
  border-color: var(--primary-color);
}

.page-number.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .news-management {
    padding: 4rem;
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

  .meta-info {
    grid-template-columns: 1fr;
  }

  .news-table {
    font-size: 0.9rem;
  }

  .news-table th,
  .news-table td {
    padding: 0.5rem;
  }

  .actions {
    flex-direction: column;
  }
}

/* File upload styles */
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
</style>
