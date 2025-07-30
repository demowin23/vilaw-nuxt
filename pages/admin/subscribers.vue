<template>
  <div class="subscribers-page">
    <div class="page-header">
      <h1>Tra cứu thuê bao</h1>
      <p>Quản lý và tra cứu thông tin thuê bao dịch vụ</p>
    </div>

    <!-- Tìm kiếm thuê bao -->
    <div class="search-section">
      <div class="search-form">
        <div class="form-group">
          <label for="phone">Số điện thoại:</label>
          <input
            type="text"
            id="phone"
            v-model="searchPhone"
            placeholder="Nhập số điện thoại..."
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="subscriber-id">Mã thuê bao:</label>
          <input
            type="text"
            id="subscriber-id"
            v-model="searchSubscriberId"
            placeholder="Nhập mã thuê bao..."
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="status">Trạng thái:</label>
          <select id="status" v-model="selectedStatus" class="form-select">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="suspended">Tạm ngưng</option>
            <option value="expired">Hết hạn</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
        <button @click="searchSubscribers" class="search-btn">Tìm kiếm</button>
      </div>
    </div>

    <!-- Kết quả tìm kiếm -->
    <div class="results-section" v-if="subscribersData.length > 0">
      <h2>Danh sách thuê bao</h2>
      <div class="table-container">
        <table class="subscribers-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã thuê bao</th>
              <th>Số điện thoại</th>
              <th>Họ tên</th>
              <th>Gói dịch vụ</th>
              <th>Ngày đăng ký</th>
              <th>Ngày hết hạn</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subscriber, index) in subscribersData" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ subscriber.id }}</td>
              <td>{{ subscriber.phone }}</td>
              <td>{{ subscriber.name }}</td>
              <td>{{ subscriber.package }}</td>
              <td>{{ formatDate(subscriber.registrationDate) }}</td>
              <td>{{ formatDate(subscriber.expiryDate) }}</td>
              <td>
                <span :class="['status', subscriber.status]">
                  {{ getStatusText(subscriber.status) }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button @click="viewDetails(subscriber)" class="btn-details">
                    Chi tiết
                  </button>
                  <button @click="editSubscriber(subscriber)" class="btn-edit">
                    Sửa
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="no-results" v-else-if="hasSearched">
      <p>Không tìm thấy thuê bao nào</p>
    </div>

    <!-- Modal chi tiết thuê bao -->
    <div v-if="showDetailsModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Chi tiết thuê bao</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body" v-if="selectedSubscriber">
          <div class="detail-grid">
            <div class="detail-item">
              <label>Mã thuê bao:</label>
              <span>{{ selectedSubscriber.id }}</span>
            </div>
            <div class="detail-item">
              <label>Số điện thoại:</label>
              <span>{{ selectedSubscriber.phone }}</span>
            </div>
            <div class="detail-item">
              <label>Họ tên:</label>
              <span>{{ selectedSubscriber.name }}</span>
            </div>
            <div class="detail-item">
              <label>Email:</label>
              <span>{{ selectedSubscriber.email }}</span>
            </div>
            <div class="detail-item">
              <label>Gói dịch vụ:</label>
              <span>{{ selectedSubscriber.package }}</span>
            </div>
            <div class="detail-item">
              <label>Ngày đăng ký:</label>
              <span>{{ formatDate(selectedSubscriber.registrationDate) }}</span>
            </div>
            <div class="detail-item">
              <label>Ngày hết hạn:</label>
              <span>{{ formatDate(selectedSubscriber.expiryDate) }}</span>
            </div>
            <div class="detail-item">
              <label>Trạng thái:</label>
              <span :class="['status', selectedSubscriber.status]">
                {{ getStatusText(selectedSubscriber.status) }}
              </span>
            </div>
            <div class="detail-item">
              <label>Địa chỉ:</label>
              <span>{{ selectedSubscriber.address || "Chưa cập nhật" }}</span>
            </div>
            <div class="detail-item">
              <label>Ghi chú:</label>
              <span>{{ selectedSubscriber.notes || "Không có" }}</span>
            </div>
          </div>

          <!-- Lịch sử sử dụng -->
          <div class="usage-history">
            <h4>Lịch sử sử dụng</h4>
            <div class="history-list">
              <div
                v-for="(usage, index) in selectedSubscriber.usageHistory"
                :key="index"
                class="history-item"
              >
                <div class="history-date">{{ formatDate(usage.date) }}</div>
                <div class="history-service">{{ usage.service }}</div>
                <div class="history-duration">{{ usage.duration }} phút</div>
                <div class="history-status">
                  <span :class="['status', usage.status]">
                    {{ getStatusText(usage.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal chỉnh sửa thuê bao -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Chỉnh sửa thuê bao</h3>
          <button @click="closeEditModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveSubscriber" class="edit-form">
            <div class="form-row">
              <div class="form-group">
                <label for="edit-name">Họ tên:</label>
                <input
                  type="text"
                  id="edit-name"
                  v-model="editForm.name"
                  class="form-input"
                  required
                />
              </div>
              <div class="form-group">
                <label for="edit-phone">Số điện thoại:</label>
                <input
                  type="text"
                  id="edit-phone"
                  v-model="editForm.phone"
                  class="form-input"
                  required
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="edit-email">Email:</label>
                <input
                  type="email"
                  id="edit-email"
                  v-model="editForm.email"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="edit-package">Gói dịch vụ:</label>
                <select
                  id="edit-package"
                  v-model="editForm.package"
                  class="form-select"
                >
                  <option value="basic">Gói cơ bản</option>
                  <option value="premium">Gói cao cấp</option>
                  <option value="enterprise">Gói doanh nghiệp</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="edit-address">Địa chỉ:</label>
              <textarea
                id="edit-address"
                v-model="editForm.address"
                class="form-textarea"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="edit-status">Trạng thái:</label>
              <select
                id="edit-status"
                v-model="editForm.status"
                class="form-select"
              >
                <option value="active">Đang hoạt động</option>
                <option value="suspended">Tạm ngưng</option>
                <option value="expired">Hết hạn</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-notes">Ghi chú:</label>
              <textarea
                id="edit-notes"
                v-model="editForm.notes"
                class="form-textarea"
                rows="3"
              ></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save">Lưu thay đổi</button>
              <button type="button" @click="closeEditModal" class="btn-cancel">
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const searchPhone = ref("");
const searchSubscriberId = ref("");
const selectedStatus = ref("");
const subscribersData = ref([]);
const hasSearched = ref(false);
const showDetailsModal = ref(false);
const showEditModal = ref(false);
const selectedSubscriber = ref(null);
const editForm = ref({});

const searchSubscribers = () => {
  // Mock data
  subscribersData.value = [
    {
      id: "SUB001",
      phone: "0123456789",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      package: "Gói cao cấp",
      registrationDate: new Date("2024-01-01"),
      expiryDate: new Date("2024-12-31"),
      status: "active",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      notes: "Khách hàng VIP",
      usageHistory: [
        {
          date: new Date("2024-01-15"),
          service: "Tư vấn pháp luật",
          duration: 45,
          status: "completed",
        },
        {
          date: new Date("2024-01-10"),
          service: "Rà soát văn bản",
          duration: 30,
          status: "completed",
        },
      ],
    },
    {
      id: "SUB002",
      phone: "0987654321",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      package: "Gói cơ bản",
      registrationDate: new Date("2024-01-05"),
      expiryDate: new Date("2024-06-30"),
      status: "active",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      notes: "",
      usageHistory: [
        {
          date: new Date("2024-01-12"),
          service: "Soạn thảo hợp đồng",
          duration: 60,
          status: "completed",
        },
      ],
    },
    {
      id: "SUB003",
      phone: "0369852147",
      name: "Lê Văn C",
      email: "levanc@email.com",
      package: "Gói doanh nghiệp",
      registrationDate: new Date("2023-12-01"),
      expiryDate: new Date("2024-11-30"),
      status: "suspended",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      notes: "Tạm ngưng do thanh toán",
      usageHistory: [],
    },
  ];
  hasSearched.value = true;
};

const viewDetails = (subscriber) => {
  selectedSubscriber.value = subscriber;
  showDetailsModal.value = true;
};

const editSubscriber = (subscriber) => {
  editForm.value = { ...subscriber };
  showEditModal.value = true;
};

const closeModal = () => {
  showDetailsModal.value = false;
  selectedSubscriber.value = null;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editForm.value = {};
};

const saveSubscriber = () => {
  // Mock API call
  alert("Đã lưu thay đổi thuê bao");
  closeEditModal();
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const getStatusText = (status) => {
  const statusMap = {
    active: "Đang hoạt động",
    suspended: "Tạm ngưng",
    expired: "Hết hạn",
    cancelled: "Đã hủy",
    completed: "Hoàn thành",
    "in-progress": "Đang thực hiện",
  };
  return statusMap[status] || status;
};
</script>

<style scoped>
.subscribers-page {
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.page-header p {
  margin: 0;
  color: var(--text-secondary);
}

.search-section {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
}

.search-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: end;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input,
.form-select {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-page);
  color: var(--text-primary);
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background: var(--primary-dark);
}

.results-section {
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.results-section h2 {
  margin: 0;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.table-container {
  overflow-x: auto;
}

.subscribers-table {
  width: 100%;
  border-collapse: collapse;
}

.subscribers-table th,
.subscribers-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.subscribers-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
}

.subscribers-table td {
  color: var(--text-primary);
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status.active {
  background: var(--success-light);
  color: var(--success-color);
}

.status.suspended {
  background: var(--warning-light);
  color: var(--warning-color);
}

.status.expired {
  background: var(--danger-light);
  color: var(--danger-color);
}

.status.cancelled {
  background: var(--text-light);
  color: var(--text-secondary);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-details,
.btn-edit {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.btn-details {
  background: var(--primary-color);
  color: white;
}

.btn-details:hover {
  background: var(--primary-dark);
}

.btn-edit {
  background: var(--info-color);
  color: white;
}

.btn-edit:hover {
  background: var(--info-dark);
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
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

.modal-content {
  background: var(--bg-card);
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
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
}

.modal-body {
  padding: 1.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--bg-hover);
  border-radius: 6px;
}

.detail-item label {
  font-weight: 500;
  color: var(--text-primary);
}

.detail-item span {
  color: var(--text-secondary);
}

.usage-history {
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
}

.usage-history h4 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.history-list {
  display: grid;
  gap: 0.5rem;
}

.history-item {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--bg-hover);
  border-radius: 6px;
  align-items: center;
}

.history-date {
  font-weight: 500;
  color: var(--text-primary);
}

.history-service {
  color: var(--text-secondary);
}

.history-duration {
  text-align: center;
  color: var(--text-secondary);
}

/* Edit form styles */
.edit-form {
  display: grid;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-page);
  color: var(--text-primary);
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-save,
.btn-cancel {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-save {
  background: var(--primary-color);
  color: white;
}

.btn-save:hover {
  background: var(--primary-dark);
}

.btn-cancel {
  background: var(--text-light);
  color: var(--text-primary);
}

.btn-cancel:hover {
  background: var(--border-color);
}

@media (max-width: 768px) {
  .search-form {
    grid-template-columns: 1fr;
  }

  .subscribers-table {
    font-size: 0.875rem;
  }

  .subscribers-table th,
  .subscribers-table td {
    padding: 0.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .history-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
