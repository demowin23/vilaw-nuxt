<template>
  <div class="knowledge-management">
    <!-- Header với nút thêm mới -->
    <div class="page-header">
      <div class="header-left">
        <h2>Quản lý kiến thức pháp luật</h2>
        <p>Tổng cộng {{ totalKnowledge }} bài viết</p>
      </div>
      <button
        @click="showAddModal = true"
        class="add-btn"
        :disabled="isLoading"
      >
        <span v-if="isLoading">⏳</span>
        <span v-else>➕</span>
        {{ isLoading ? "Đang tải..." : "Thêm bài viết mới" }}
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
        />
        <span class="search-icon">🔍</span>
      </div>

      <div class="filter-group">
        <select v-model="categoryFilter" class="filter-select">
          <option value="">Tất cả danh mục</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.value"
          >
            {{ category.label }}
          </option>
        </select>

        <select v-model="isPending" class="filter-select">
          <option value="">Tất cả trạng thái</option>
          <option value="false">Đã duyệt</option>
          <option value="true">Chờ duyệt</option>
        </select>
      </div>
    </div>

    <!-- Bảng danh sách -->
    <div class="table-container">
      <table class="knowledge-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Tác giả</th>
            <th>Nổi bật</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Lượt xem</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in knowledgeList" :key="item.id">
            <td>{{ item.id }}</td>
            <td class="title-cell">
              <div class="title">{{ item.title }}</div>
            </td>
            <td>
              <span :class="`category-badge category-${item.category}`">
                {{ getCategoryLabel(item.category) }}
              </span>
            </td>

            <td>{{ item.author }}</td>
            <td>
              <input
                type="checkbox"
                v-model="item.is_featured"
                @change="updateFeatured(item)"
              />
            </td>
            <td>
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
                {{ item.is_approved ? "Đã duyệt" : "Chờ duyệt" }}
              </span>
            </td>
            <td>{{ formatDate(item.ts_create) }}</td>
            <td>{{ item.view_count }}</td>
            <td>
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

    <div
      v-if="showAddModal || showEditModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal modal-wide" @click.stop>
        <div class="modal-header">
          <h3>{{ showAddModal ? "Thêm bài viết mới" : "Sửa bài viết" }}</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="saveItem" class="modal-form">
          <div class="form-group">
            <label>Tiêu đề *</label>
            <input v-model="itemForm.title" type="text" required />
          </div>

          <div class="form-group">
            <label>Hình ảnh</label>
            <div class="image-upload-wrapper">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                @change="onImageFileChange"
                class="image-input"
              />
              <label for="image-upload" class="image-upload-label">
                <span v-if="!imagePreview && !itemForm.image">Chọn ảnh...</span>
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="image-preview"
                />
                <img
                  v-else-if="itemForm.image"
                  :src="getImageUrl(itemForm.image)"
                  alt="Preview"
                  class="image-preview"
                />
                <span
                  v-if="imagePreview || itemForm.image"
                  class="change-image-btn"
                  >Đổi ảnh</span
                >
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Tóm tắt</label>
            <textarea
              v-model="itemForm.summary"
              rows="3"
              placeholder="Mô tả ngắn gọn về bài viết"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Nội dung *</label>
            <client-only>
              <QuillEditor v-model="itemForm.content" theme="snow" />
            </client-only>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Danh mục *</label>
              <select v-model="itemForm.category" required>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.value"
                >
                  {{ category.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="itemForm.is_featured" type="checkbox" />
                <span>Bài viết nổi bật</span>
              </label>
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
          <h3>Chi tiết bài viết</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <div class="item-detail">
          <div class="detail-header">
            <h2>{{ selectedItem.title }}</h2>
            <div class="meta-info">
              <span class="author">Tác giả: {{ selectedItem.author }}</span>
              <span class="date"
                >Ngày tạo: {{ formatDate(selectedItem.ts_create) }}</span
              >
              <span class="views">Lượt xem: {{ selectedItem.view_count }}</span>
              <span class="likes"
                >Lượt thích: {{ selectedItem.like_count }}</span
              >
            </div>
            <div class="tags">
              <span :class="`category-badge category-${selectedItem.category}`">
                {{ getCategoryLabel(selectedItem.category) }}
              </span>
              <span :class="`status-badge status-${selectedItem.status}`">
                {{ getStatusLabel(selectedItem.status) }}
              </span>
              <span v-if="selectedItem.is_featured" class="featured-badge">
                ⭐ Nổi bật
              </span>
            </div>
          </div>

          <div class="content-preview">
            <h4>Tóm tắt:</h4>
            <p>{{ selectedItem.summary }}</p>

            <h4>Nội dung:</h4>
            <div class="content-text" v-html="selectedItem.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const {
  getLegalKnowledge,
  getCategories,
  createLegalKnowledge,
  updateLegalKnowledge,
  deleteLegalKnowledge,
  approveLegalKnowledge,
  isLoading,
} = useLegalKnowledge();
const { handleApiError, handleApiSuccess } = useNotification();
const { isAdmin, user } = useAuth();

// State
const knowledgeList = ref<any[]>([]);
const categories = ref<any[]>([]);
const totalKnowledge = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const searchQuery = ref("");
const categoryFilter = ref("");
const isPending = ref("");
const showAddModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const selectedItem = ref<any>({});
const itemForm = ref({
  title: "",
  image: "",
  summary: "",
  content: "",
  category: "hinh_su",
  is_featured: false,
});

const imageFile = ref<File | null>(null);
const imagePreview = ref<string>("");
const getImageUrl = (image: string) => {
  return `http://14.225.17.139:4000${image}`;
};
const onImageFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files || !files[0]) return;
  imageFile.value = files[0];
  imagePreview.value = URL.createObjectURL(files[0]);
};

// Load data on mount
onMounted(() => {
  loadKnowledge();
  loadCategories();
});

// Load knowledge with filters
const loadKnowledge = async () => {
  try {
    const params: any = {
      include_pending: true,
      isAdmin: true,
      limit: itemsPerPage.value,
      offset: (currentPage.value - 1) * itemsPerPage.value,
    };

    if (searchQuery.value) {
      params.search = searchQuery.value;
    }

    if (categoryFilter.value) {
      params.category = categoryFilter.value;
    }

    if (isPending.value) {
      params.isPending = isPending.value;
    }

    const response = await getLegalKnowledge(params);
    knowledgeList.value = response.data;
    totalKnowledge.value = response.total;
  } catch (error) {
    handleApiError(error, "Không thể tải danh sách kiến thức pháp luật");
  }
};

// Load categories
const loadCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (error) {
    handleApiError(error, "Không thể tải danh mục");
  }
};

// Watch for filter changes
watch([searchQuery, categoryFilter, isPending], () => {
  currentPage.value = 1;
  loadKnowledge();
});

// Computed
const totalPages = computed(() =>
  Math.ceil(totalKnowledge.value / itemsPerPage.value)
);

// Methods
const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    dan_su_thua_ke_hon_nhan_va_gia_dinh:
      "Dân sự – Thừa kế – Hôn nhân và gia đình",
    hinh_su: "Hình sự",
    giai_quyet_tranh_chap: "Giải quyết tranh chấp",
    kinh_doanh_thuong_mai: "Kinh doanh thương mại",
    lao_dong: "Lao động",
    dat_dai: "Đất đai",
    the_loai_khac: "Thể loại khác",
  };
  return labels[category] || category;
};

const getStatusLabel = (status: boolean) => {
  if (status === true || status === "true") {
    return "Đã xuất bản";
  } else {
    return "Chờ duyệt";
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const viewItem = (item: any) => {
  selectedItem.value = item;
  showViewModal.value = true;
};

const updateFeatured = async (item: any) => {
  try {
    const payload = {
      is_featured: item.is_featured,
    };
    const response = await updateLegalKnowledge(item.id, payload, false);
    handleApiSuccess(response, "Cập nhật bài viết thành công!");
    loadKnowledge();
  } catch (error) {
    handleApiError(error, "Không thể lưu bài viết");
  }
};

const editItem = (item: any) => {
  selectedItem.value = item;
  itemForm.value = {
    title: item.title,
    image: item.image || "",
    summary: item.summary || "",
    content: item.content,
    category: item.category,
    is_featured: item.is_featured || false,
  };
  showEditModal.value = true;
};

const deleteItem = async (item: any) => {
  if (confirm(`Bạn có chắc muốn xóa bài viết "${item.title}"?`)) {
    try {
      await deleteLegalKnowledge(item.id);
      handleApiSuccess({ message: "Xóa bài viết thành công!" });
      loadKnowledge();
    } catch (error) {
      handleApiError(error, "Không thể xóa bài viết");
    }
  }
};

const approveItem = async (item: any) => {
  try {
    await approveLegalKnowledge(item.id, item.is_approved);
    handleApiSuccess({
      message: item.is_approved
        ? "Đã duyệt bài viết thành công!"
        : "Đã từ chối bài viết thành công!",
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
    let payload: any;
    let isFormData = false;

    if (imageFile.value) {
      payload = new FormData();
      payload.append("title", itemForm.value.title);
      payload.append("summary", itemForm.value.summary || "");
      payload.append("content", itemForm.value.content);
      payload.append("category", itemForm.value.category);
      payload.append("author", user.value?.fullName);
      payload.append(
        "is_featured",
        itemForm.value.is_featured ? "true" : "false"
      );
      payload.append("image", imageFile.value);
      isFormData = true;
    } else {
      payload = { ...itemForm.value };
    }
    if (showAddModal.value) {
      const response = await createLegalKnowledge(payload, isFormData);
      handleApiSuccess(response, "Tạo bài viết thành công!");
    } else {
      const response = await updateLegalKnowledge(
        selectedItem.value.id,
        payload,
        isFormData
      );
      handleApiSuccess(response, "Cập nhật bài viết thành công!");
    }
    closeModal();
    loadKnowledge();
  } catch (error) {
    handleApiError(error, "Không thể lưu bài viết");
  }
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showViewModal.value = false;
  selectedItem.value = {};
  itemForm.value = {
    title: "",
    image: "",
    summary: "",
    content: "",
    category: "hinh_su",
    is_featured: false,
  };
  imagePreview.value = "";
};
</script>

<style scoped>
.knowledge-management {
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

.knowledge-table {
  width: 100%;
  border-collapse: collapse;
}

.knowledge-table th,
.knowledge-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.knowledge-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
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

.excerpt {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.category-badge,
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.category-civil {
  background: #4ecdc4;
  color: white;
}

.category-criminal {
  background: #ff6b6b;
  color: white;
}

.category-dispute {
  background: #feca57;
  color: white;
}

.category-commercial {
  background: #48dbfb;
  color: white;
}

.category-labor {
  background: #ff9ff3;
  color: white;
}

.category-land {
  background: #1dd1a1;
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

.featured-badge {
  background: #fcc419;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
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

.content-text {
  background: var(--bg-hover);
  padding: 1rem;
  border-radius: 8px;
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-wrap;
}

.image-upload-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.image-input {
  display: none;
}
.image-upload-label {
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
.image-upload-label:hover {
  background: #fff3e0;
  border-color: #ff6600;
}
.image-preview {
  max-width: 200px;
  max-height: 120px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.change-image-btn {
  color: #ff6600;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 768px) {
  .knowledge-management {
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

  .knowledge-table {
    font-size: 0.9rem;
  }

  .knowledge-table th,
  .knowledge-table td {
    padding: 0.5rem;
  }

  .actions {
    flex-direction: column;
  }

  .meta-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
