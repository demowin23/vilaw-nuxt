<template>
  <div class="category-management">
    <!-- Header với nút thêm mới -->
    <div class="page-header">
      <div class="header-left">
        <h2>Quản lý danh mục (Category)</h2>
        <p>Tổng cộng {{ totalCategories }} danh mục</p>
      </div>
      <button
        @click="showAddModal = true"
        class="add-btn"
        :disabled="isLoading"
      >
        <span v-if="isLoading">⏳</span>
        <span v-else>➕</span>
        {{ isLoading ? "Đang tải..." : "Thêm danh mục mới" }}
      </button>
    </div>

    <!-- Bộ lọc và tìm kiếm -->
    <div class="filters">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm theo tên hiển thị..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
    </div>

    <!-- Bảng danh sách -->
    <div class="table-container">
      <table class="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Value</th>
            <th>Tên hiển thị</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in filteredCategories" :key="cat.id">
            <td>{{ cat.id }}</td>
            <td>{{ cat.value }}</td>
            <td>{{ cat.label }}</td>
            <td>{{ cat.description }}</td>
            <td class="actions">
              <button
                @click="editCategory(cat)"
                class="action-btn edit-btn"
                title="Sửa"
              >
                ✏️
              </button>
              <button
                @click="handleDeleteCategory(cat)"
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

    <!-- Modal thêm/sửa category -->
    <div
      v-if="showAddModal || showEditModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ showAddModal ? "Thêm danh mục mới" : "Sửa danh mục" }}</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>
        <form @submit.prevent="saveCategory" class="modal-form">
          <div class="form-group">
            <label>Value (tên không dấu, gạch dưới) *</label>
            <input v-model="categoryForm.value" type="text" required />
          </div>
          <div class="form-group">
            <label>Tên hiển thị *</label>
            <input v-model="categoryForm.label" type="text" required />
          </div>
          <div class="form-group">
            <label>Mô tả</label>
            <textarea v-model="categoryForm.description" rows="2"></textarea>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useCategory } from "~/composables/useCategory";
import { useNotification } from "~/composables/useNotification";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  isLoading,
} = useCategory();
const { handleApiError, handleApiSuccess } = useNotification();

const categories = ref<any[]>([]);
const totalCategories = ref(0);
const searchQuery = ref("");
const showAddModal = ref(false);
const showEditModal = ref(false);
const selectedCategory = ref<any>({});
const categoryForm = ref({
  value: "",
  label: "",
  description: "",
});

const loadCategories = async () => {
  try {
    const res = await getCategories();
    categories.value = res.data || res;
    totalCategories.value = res.total || categories.value.length;
  } catch (e) {
    handleApiError(e, "Không thể tải danh sách danh mục");
  }
};

onMounted(() => {
  loadCategories();
});

watch([searchQuery], () => {
  // No pagination, just filter client-side
});

const filteredCategories = computed(() => {
  let list = categories.value;
  if (searchQuery.value) {
    list = list.filter((item: any) =>
      item.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return list;
});

const editCategory = (cat: any) => {
  selectedCategory.value = cat;
  categoryForm.value = {
    value: cat.value,
    label: cat.label,
    description: cat.description || "",
  };
  showEditModal.value = true;
};

const handleDeleteCategory = async (cat: any) => {
  if (confirm(`Bạn có chắc muốn xóa danh mục "${cat.label}"?`)) {
    try {
      await deleteCategory(cat.id);
      handleApiSuccess({ message: "Xóa danh mục thành công!" });
      loadCategories();
    } catch (e) {
      handleApiError(e, "Không thể xóa danh mục");
    }
  }
};

const saveCategory = async () => {
  try {
    if (showAddModal.value) {
      await createCategory(categoryForm.value);
      handleApiSuccess({ message: "Tạo danh mục thành công!" });
    } else {
      await updateCategory(selectedCategory.value.id, categoryForm.value);
      handleApiSuccess({ message: "Cập nhật danh mục thành công!" });
    }
    closeModal();
    loadCategories();
  } catch (e) {
    handleApiError(e, "Không thể lưu danh mục");
  }
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  selectedCategory.value = {};
  categoryForm.value = { value: "", label: "", description: "" };
};
</script>

<style scoped>
.category-management {
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
.table-container {
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}
.category-table {
  width: 100%;
  border-collapse: collapse;
}
.category-table th,
.category-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}
.category-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
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
.edit-btn:hover {
  background: var(--warning-light);
}
.delete-btn:hover {
  background: var(--danger-light);
}

/* Modal đẹp, hiện đại */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: var(--bg-card);
  border-radius: 18px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  width: 95%;
  max-width: 800px;
  padding: 0 0 2rem 0;
  animation: modalIn 0.2s;
}
@keyframes modalIn {
  from {
    transform: translateY(40px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
.modal-header {
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary-light);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}
.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color);
  font-weight: 600;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
}
.close-btn:hover {
  background: var(--primary-light);
}
.modal-form {
  padding: 1.5rem 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.form-group label {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
  display: block;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-hover);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border 0.2s;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.2rem;
}
.cancel-btn,
.save-btn {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.cancel-btn {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.cancel-btn:hover {
  background: var(--border-color);
}
.save-btn {
  background: var(--primary-color);
  color: #fff;
}
.save-btn:hover {
  background: var(--primary-dark);
}
@media (max-width: 600px) {
  .modal {
    max-width: 98vw;
    padding: 0 0 1rem 0;
  }
  .modal-header,
  .modal-form {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
