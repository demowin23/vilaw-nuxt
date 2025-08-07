<template>
  <div class="documents-management">
    <div class="page-header">
      <div class="header-left">
        <h2>Quản lý văn bản pháp luật</h2>
        <p>Tổng cộng {{ documents.length }} văn bản</p>
      </div>
      <button @click="showAddModal = true" class="add-btn">
        <span>➕</span>
        Thêm văn bản mới
      </button>
    </div>

    <!-- Bộ lọc và tìm kiếm -->
    <div class="filters">
      <div class="filter-group">
        <select
          v-model="typeFilter"
          @change="onFilterChange"
          class="filter-select"
        >
          <option value="">Tất cả loại văn bản</option>
          <option
            v-for="type in documentTypes"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </option>
        </select>

        <select
          v-model="effectiveFilter"
          @change="onFilterChange"
          class="filter-select"
        >
          <option value="">Tất cả hiệu lực</option>
          <option
            v-for="status in documentStatuses"
            :key="status.id"
            :value="status.value"
          >
            {{ status.name }}
          </option>
        </select>
        <select
          v-model="statusFilter"
          @change="onFilterChange"
          class="filter-select"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="true">Chờ duyệt</option>
          <option value="false">Đã duyệt</option>
        </select>
      </div>
    </div>

    <div class="table-container">
      <table class="documents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Thông tin văn bản</th>
            <th>Copy URL</th>
            <th>Loại văn bản</th>
            <th>Ngày ban hành</th>
            <th>Ngày có hiệu lực</th>
            <th>Hiệu lực</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(doc, idx) in documents" :key="idx">
            <td>{{ doc.id }}</td>
            <td class="doc-info">
              <div class="doc-title">{{ doc.title }}</div>
              <div class="doc-number">Số hiệu: {{ doc.number }}</div>
              <div class="doc-issuer">Cơ quan ban hành: {{ doc.issuer }}</div>
              <div v-if="doc.tags" class="doc-tags">
                <span
                  v-for="tag in getTagsArray(doc.tags).slice(0, 3)"
                  :key="tag"
                  class="tag-badge-small"
                >
                  {{ getLegalFieldName(tag) }}
                </span>
                <span
                  v-if="getTagsArray(doc.tags).length > 3"
                  class="more-tags"
                >
                  +{{ getTagsArray(doc.tags).length - 3 }}
                </span>
              </div>
            </td>
            <td class="copy-cell">
              <button
                @click="copyUrl(`https://vilaw.net.vn/van-ban/${doc.id}-${slugify(doc.title)}`)"
                class="copy-btn"
                title="Copy URL"
              >
                📋
              </button>
            </td>
            <td>
              <span :class="`type-badge type-${doc.type}`">
                {{ getTypeLabel(doc.type) }}
              </span>
            </td>
            <td>{{ formatDate(doc.issueDate) }}</td>
            <td>{{ formatDate(doc.effectiveDate) }}</td>
            <td>{{ getEffectiveLabel(doc.status) }}</td>
            <td>
              <input
                type="checkbox"
                v-if="isAdmin"
                v-model="doc.isApproved"
                @change="approveDoc(doc)"
              />
              <span
                :class="`status-badge ${
                  doc.isApproved ? 'status-published' : 'status-pending'
                }`"
              >
                {{ getStatusLabel(doc) }}
              </span>
            </td>
            <td>
              <button
                @click="viewDoc(doc)"
                class="action-btn view-btn"
                title="Xem"
              >
                👁️
              </button>
              <button
                @click="editDoc(doc)"
                class="action-btn edit-btn"
                title="Sửa"
              >
                ✏️
              </button>
              <button
                @click="deleteDoc(doc)"
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

    <!-- Modal thêm/sửa -->
    <div
      v-if="showAddModal || showEditModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal modal-wide" @click.stop>
        <div class="modal-header">
          <h3>{{ showAddModal ? "Thêm văn bản mới" : "Sửa văn bản" }}</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="saveDoc" class="modal-form">
          <div class="form-group">
            <label>Tên văn bản *</label>
            <input v-model="docForm.title" type="text" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Số hiệu *</label>
              <input v-model="docForm.number" type="text" required />
            </div>

            <div class="form-group">
              <label>Loại văn bản *</label>
              <select v-model="docForm.type" required>
                <option value="">Chọn loại văn bản</option>
                <option
                  v-for="type in documentTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Cơ quan ban hành *</label>
            <input v-model="docForm.issuer" type="text" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Ngày ban hành *</label>
              <input v-model="docForm.issueDate" type="date" required />
            </div>

            <div class="form-group">
              <label>Ngày có hiệu lực</label>
              <input v-model="docForm.effectiveDate" type="date" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Ngày hết hiệu lực</label>
              <input v-model="docForm.expiryDate" type="date" />
            </div>
          </div>

          <div class="form-group">
            <label>Lĩnh vực pháp luật</label>
            <div class="checkbox-group">
              <div
                v-for="field in legalFields"
                :key="field.id"
                class="checkbox-item"
              >
                <input
                  type="checkbox"
                  :id="'field-' + field.id"
                  :value="field.slug"
                  v-model="docForm.tags"
                  class="checkbox-input"
                />
                <label :for="'field-' + field.id" class="checkbox-label">
                  {{ field.name }}
                </label>
              </div>
            </div>
            <small class="form-help">
              Chọn một hoặc nhiều lĩnh vực pháp luật
            </small>
          </div>
          <div class="form-group">
            <label>File văn bản Word *</label>
            <div class="file-upload-wrapper">
              <input
                id="word-file-upload"
                type="file"
                accept=".doc,.docx"
                @change="onWordFileChange"
                class="file-input"
              />
              <label for="word-file-upload" class="file-upload-label">
                <span v-if="!wordFilePreview && !docForm.wordFile"
                  >Chọn file Word (.doc, .docx)...</span
                >
                <div
                  v-if="wordFilePreview || docForm.wordFile"
                  class="file-info"
                >
                  <span class="file-name">{{ wordFileName }}</span>
                  <span class="file-size">{{ wordFileSize }}</span>
                </div>
                <span
                  v-if="wordFilePreview || docForm.wordFile"
                  class="change-file-btn"
                  >Đổi file</span
                >
              </label>
            </div>
            <div
              v-if="uploadProgress > 0 && uploadProgress < 100"
              class="upload-progress"
            >
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
              <span class="progress-text">{{ uploadProgress }}%</span>
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
          <h3>Chi tiết văn bản</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <div class="doc-detail">
          <div class="detail-header">
            <h2>{{ selectedDoc.title }}</h2>
            <div class="meta-info">
              <div class="meta-row">
                <span class="label">Số hiệu:</span>
                <span class="value">{{ selectedDoc.number }}</span>
              </div>
              <div class="meta-row">
                <span class="label">Loại văn bản:</span>
                <span :class="`type-badge type-${selectedDoc.type}`">
                  {{ getTypeLabel(selectedDoc.type) }}
                </span>
              </div>
              <div class="meta-row">
                <span class="label">Cơ quan ban hành:</span>
                <span class="value">{{ selectedDoc.issuer }}</span>
              </div>
              <div class="meta-row">
                <span class="label">Ngày ban hành:</span>
                <span class="value">{{
                  formatDate(selectedDoc.issueDate)
                }}</span>
              </div>
              <div class="meta-row">
                <span class="label">Ngày có hiệu lực:</span>
                <span class="value">{{
                  formatDate(selectedDoc.effectiveDate)
                }}</span>
              </div>
              <div class="meta-row">
                <span class="label">Ngày hết hiệu lực:</span>
                <span class="value">{{
                  selectedDoc.expiryDate
                    ? formatDate(selectedDoc.expiryDate)
                    : "Không có"
                }}</span>
              </div>
              <div class="meta-row">
                <span class="label">Trạng thái:</span>
                <span :class="`status-badge status-${selectedDoc.status}`">
                  {{ getStatusLabel(selectedDoc.status) }}
                </span>
              </div>
              <div v-if="selectedDoc.tags" class="meta-row">
                <span class="label">Lĩnh vực pháp luật:</span>
                <div class="tags-container">
                  <span
                    v-for="tag in getTagsArray(selectedDoc.tags)"
                    :key="tag"
                    class="tag-badge"
                  >
                    {{ getLegalFieldName(tag) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="content-preview">
            <div v-if="selectedDoc.wordFile" class="word-file-section">
              <h4>File văn bản:</h4>
              <div class="file-download">
                <span class="file-icon">📄</span>
                <span class="file-name">{{
                  selectedDoc.wordFile.split("/").pop()
                }}</span>
                <button
                  class="download-btn"
                  @click="downloadWordFile(selectedDoc)"
                >
                  Tải xuống
                </button>
              </div>
            </div>

            <div v-if="selectedDoc.content" class="content-section">
              <h4>Nội dung văn bản:</h4>
              <div class="content-text" v-html="selectedDoc.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDocuments } from "~/composables/useDocuments";
import { useLegalFields } from "~/composables/useLegalFields";
import { useNotification } from "~/composables/useNotification";
import { useAuth } from "~/composables/useAuth";
import { slugify } from "~/utils/slugify";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const {
  documents,
  loading,
  error,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  approveDocument,
  downloadWordFile: downloadWordFileApi,
  getDocumentTypes,
  getDocumentStatuses,
} = useDocuments();

const { getLegalFieldsDropdown } = useLegalFields();
const { handleApiError, handleApiSuccess } = useNotification();
const { isAdmin } = useAuth();

// Load document types and statuses
const documentTypes = ref([]);
const documentStatuses = ref([]);
const legalFields = ref([]);

// State

const searchQuery = ref("");
const typeFilter = ref("");
const effectiveFilter = ref("");
const statusFilter = ref("");
const showAddModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const selectedDoc = ref({});
const docForm = ref({
  title: "",
  number: "",
  type: "",
  issuer: "",
  issueDate: "",
  effectiveDate: "",
  expiryDate: "",
  content: "",
  wordFile: "",
  tags: [],
});

// File upload states
const wordFile = ref(null);
const wordFilePreview = ref("");
const wordFileName = ref("");
const wordFileSize = ref("");
const uploadProgress = ref(0);

// Debounce timer for search
let searchTimer = null;

// Filter change handler
const onFilterChange = async () => {
  try {
    await getDocuments({
      isAdmin: true,
      document_type: typeFilter.value,
      isPending: statusFilter.value,
      status: effectiveFilter.value,
      search: searchQuery.value,
    });
  } catch (error) {
    console.error("Error filtering documents:", error);
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
      await getDocuments({
        isAdmin: true,
        document_type: typeFilter.value,
        isPending: statusFilter.value,
        status: effectiveFilter.value,
        search: searchQuery.value,
      });
    } catch (error) {
      console.error("Error searching documents:", error);
    }
  }, 500); // 500ms delay
};

// Methods
const getTypeLabel = (type) => {
  const typeObj = documentTypes.value.find((t) => t.value === type);
  return typeObj ? typeObj.label : type;
};
const getEffectiveLabel = (status) => {
  const statusObj = documentStatuses.value.find((s) => s.value === status);
  return statusObj.name;
};
const getStatusLabel = (doc) => {
  if (doc.isApproved) {
    return "Đã xuất bản";
  } else {
    return "Chờ duyệt";
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN");
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

const getTagsArray = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);
};

const getLegalFieldName = (slug) => {
  const field = legalFields.value.find((f) => f.slug === slug);
  return field ? field.name : slug;
};

const onWordFileChange = (e) => {
  const files = e.target.files;
  if (!files || !files[0]) return;

  const file = files[0];
  wordFile.value = file;
  wordFileName.value = file.name;
  wordFileSize.value = formatFileSize(file.size);
  wordFilePreview.value = URL.createObjectURL(file);
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const downloadWordFile = async (doc) => {
  try {
    // Extract filename from file_url or use title
    const filename = doc.wordFile
      ? doc.wordFile.split("/").pop()
      : `${doc.title}.doc`;
    await downloadWordFileApi(doc.id, filename);
  } catch (error) {
    console.error("Lỗi khi tải xuống file:", error);
    alert("Có lỗi xảy ra khi tải xuống file!");
  }
};

// Load documents on mount
onMounted(async () => {
  try {
    await Promise.all([
      getDocuments({ isAdmin: true }),
      loadDocumentTypes(),
      loadDocumentStatuses(),
      loadLegalFields(),
    ]);
  } catch (error) {
    console.error("Error loading initial data:", error);
  }
});

const loadDocumentTypes = async () => {
  try {
    // Hardcode document types for now
    documentTypes.value = [
      { value: "luat", label: "Luật" },
      { value: "nghi_dinh", label: "Nghị định" },
      { value: "thong_tu", label: "Thông tư" },
      { value: "nghi_quyet", label: "Nghị quyết" },
      { value: "quyet_dinh", label: "Quyết định" },
      { value: "van_ban_khac", label: "Văn bản khác" },
    ];
  } catch (error) {
    console.error("Error loading document types:", error);
  }
};

const loadDocumentStatuses = async () => {
  try {
    const statuses = await getDocumentStatuses();
    documentStatuses.value = statuses;
  } catch (error) {
    console.error("Error loading document statuses:", error);
  }
};

const loadLegalFields = async () => {
  try {
    const fields = await getLegalFieldsDropdown();
    legalFields.value = fields.data;
  } catch (error) {
    console.error("Error loading legal fields:", error);
  }
};

const viewDoc = (doc) => {
  selectedDoc.value = doc;
  showViewModal.value = true;
};

const editDoc = (doc) => {
  selectedDoc.value = doc;

  // Format dates for input type="date" (YYYY-MM-DD format)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Process tags to ensure they are in the correct format for checkboxes
  let processedTags = [];
  if (doc.tags) {
    if (Array.isArray(doc.tags)) {
      processedTags = doc.tags;
    } else if (typeof doc.tags === "string") {
      processedTags = getTagsArray(doc.tags);
    }
  }
  docForm.value = {
    ...doc,
    issueDate: formatDateForInput(doc.issueDate),
    effectiveDate: formatDateForInput(doc.effectiveDate),
    expiryDate: formatDateForInput(doc.expiryDate),
    tags: processedTags,
  };

  // Set file info if exists
  if (doc.wordFile) {
    wordFileName.value = doc.wordFile;
    wordFileSize.value = "Đã tải lên";
    wordFilePreview.value = "existing";
  }

  showEditModal.value = true;
};

const deleteDoc = async (doc) => {
  if (confirm(`Bạn có chắc muốn xóa văn bản "${doc.title}"?`)) {
    try {
      await deleteDocument(doc.id);
      await getDocuments({ isAdmin: true });
    } catch (error) {
      console.error("Lỗi khi xóa văn bản:", error);
      alert("Có lỗi xảy ra khi xóa văn bản!");
    }
  }
};

const approveDoc = async (doc) => {
  try {
    await approveDocument(doc.id, doc.isApproved);
    handleApiSuccess({
      message: doc.isApproved
        ? "Đã duyệt văn bản thành công!"
        : "Đã từ chối văn bản thành công!",
    });
    // Không cần reload vì checkbox đã update trực tiếp
  } catch (error) {
    // Revert checkbox nếu có lỗi
    doc.isApproved = !doc.isApproved;
    handleApiError(error, "Không thể thay đổi trạng thái duyệt");
  }
};

const saveDoc = async () => {
  try {
    let payload = null;
    let isFormData = false;

    if (wordFile.value) {
      // Upload file Word
      payload = new FormData();
      payload.append("title", docForm.value.title);
      payload.append("document_number", docForm.value.number);
      payload.append("document_type", docForm.value.type);
      payload.append("issuing_authority", docForm.value.issuer);
      payload.append("issued_date", docForm.value.issueDate);

      payload.append("effective_date", docForm.value.effectiveDate);

      payload.append("expiry_date", docForm.value.expiryDate);

      // Append legal field IDs
      if (docForm.value.tags && docForm.value.tags.length > 0) {
        docForm.value.tags.forEach((fieldId) => {
          payload.append("tags[]", fieldId.toString());
        });
      }

      payload.append("file", wordFile.value);
      isFormData = true;
    } else {
      // Không có file mới, gửi dữ liệu JSON
      const jsonPayload = {
        title: docForm.value.title,
        number: docForm.value.number,
        type: docForm.value.type,
        issuer: docForm.value.issuer,
        issueDate: docForm.value.issueDate,
        content: docForm.value.content,
        wordFile: docForm.value.wordFile,
        tags: docForm.value.tags,
      };

      jsonPayload.effectiveDate = docForm.value.effectiveDate;

      jsonPayload.expiryDate = docForm.value.expiryDate;

      payload = jsonPayload;
    }

    if (showAddModal.value) {
      await createDocument(payload, isFormData);
    } else {
      await updateDocument(selectedDoc.value.id, payload, isFormData);
    }

    // Reload documents after save
    await getDocuments({ isAdmin: true });
    closeModal();
  } catch (error) {
    alert("Có lỗi xảy ra khi lưu văn bản!");
  }
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showViewModal.value = false;
  selectedDoc.value = {};
  docForm.value = {
    title: "",
    number: "",
    type: "",
    issuer: "",
    issueDate: "",
    effectiveDate: "",
    expiryDate: "",
    content: "",
    wordFile: "",
    tags: [],
  };

  // Reset file upload states
  wordFile.value = null;
  wordFilePreview.value = "";
  wordFileName.value = "";
  wordFileSize.value = "";
  uploadProgress.value = 0;
};
</script>

<style scoped>
.documents-management {
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
  justify-content: flex-end;
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

.documents-table {
  width: 100%;
  border-collapse: collapse;
}

.documents-table th,
.documents-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.documents-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
}

.doc-info {
  max-width: 400px;
}

.doc-title {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.doc-number {
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.doc-issuer {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.doc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.tag-badge-small {
  background: var(--primary-light);
  color: var(--primary-color);
  padding: 0.15rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid var(--primary-color);
}

.more-tags {
  color: var(--text-secondary);
  font-size: 0.7rem;
  font-weight: 500;
}

.type-badge,
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.type-law {
  background: #ff6b6b;
  color: white;
}

.type-decree {
  background: #4ecdc4;
  color: white;
}

.type-circular {
  background: #feca57;
  color: white;
}

.type-resolution {
  background: #48dbfb;
  color: white;
}

.type-decision {
  background: #ff9ff3;
  color: white;
}

.type-other {
  background: #54a0ff;
  color: white;
}

.status-active {
  background: #51cf66;
  color: white;
}

.status-expired {
  background: #868e96;
  color: white;
}

.status-draft {
  background: #ffa726;
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

.checkbox-group {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem;
  background: var(--bg-card);
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.checkbox-item:last-child {
  margin-bottom: 0;
}

.checkbox-input {
  margin-right: 0.5rem;
  width: 16px !important;
  height: 16px;
  accent-color: var(--primary-color);
}

.checkbox-label {
  cursor: pointer;
  color: var(--text-primary);
  font-size: 0.9rem;
  user-select: none;
}

.checkbox-label:hover {
  color: var(--primary-color);
}

.form-help {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
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

.doc-detail {
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
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-row .label {
  font-weight: 500;
  color: var(--text-primary);
  min-width: 120px;
}

.meta-row .value {
  color: var(--text-secondary);
}

.content-preview h4 {
  margin: 1.5rem 0 0.5rem 0;
  color: var(--text-primary);
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

/* File upload styles */
.file-upload-wrapper {
  position: relative;
  width: 100%;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  background: var(--bg-hover);
  cursor: pointer;
  transition: all 0.2s;
  min-height: 120px;
}

.file-upload-label:hover {
  border-color: var(--primary-color);
  background: var(--primary-light);
}

.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.file-name {
  font-weight: 500;
  color: var(--text-primary);
  word-break: break-all;
  text-align: center;
}

.file-size {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.change-file-btn {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.change-file-btn:hover {
  background: var(--primary-dark);
}

.upload-progress {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  min-width: 40px;
}

.word-file-section {
  margin-bottom: 1.5rem;
}

.file-download {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-hover);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.file-icon {
  font-size: 1.5rem;
}

.file-name {
  flex: 1;
  font-weight: 500;
  color: var(--text-primary);
  word-break: break-all;
}

.download-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.download-btn:hover {
  background: var(--primary-dark);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-badge {
  background: var(--primary-light);
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--primary-color);
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

@media (max-width: 768px) {
  .documents-management {
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

  .meta-info {
    grid-template-columns: 1fr;
  }

  .documents-table {
    font-size: 0.9rem;
  }

  .documents-table th,
  .documents-table td {
    padding: 0.5rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
