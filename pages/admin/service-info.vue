<template>
  <div class="service-info-page">
    <div class="page-header">
      <h1>Thông tin dịch vụ</h1>
      <p>Quản lý thông tin và cấu hình dịch vụ pháp luật</p>
    </div>

    <!-- Thông tin tổng quan -->
    <div class="overview-section">
      <h2>Thông tin tổng quan</h2>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">📋</div>
          <div class="info-content">
            <h3>Tổng số dịch vụ</h3>
            <p>{{ totalServices }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">🔄</div>
          <div class="info-content">
            <h3>Dịch vụ đang hoạt động</h3>
            <p>{{ activeServices }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">⏸️</div>
          <div class="info-content">
            <h3>Dịch vụ tạm ngưng</h3>
            <p>{{ suspendedServices }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">🛠️</div>
          <div class="info-content">
            <h3>Dịch vụ bảo trì</h3>
            <p>{{ maintenanceServices }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Danh sách dịch vụ -->
    <div class="services-section">
      <div class="section-header">
        <h2>Danh sách dịch vụ</h2>
        <button @click="addNewService" class="add-btn">Thêm dịch vụ mới</button>
      </div>

      <div class="services-grid">
        <div
          v-for="service in servicesList"
          :key="service.id"
          class="service-card"
        >
          <div class="service-header">
            <div class="service-icon">{{ service.icon }}</div>
            <div class="service-status" :class="service.status">
              {{ getStatusText(service.status) }}
            </div>
          </div>

          <div class="service-content">
            <h3>{{ service.name }}</h3>
            <p class="service-description">{{ service.description }}</p>

            <div class="service-details">
              <div class="detail-item">
                <span class="label">Giá:</span>
                <span class="value">{{ formatCurrency(service.price) }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Thời gian:</span>
                <span class="value">{{ service.duration }} phút</span>
              </div>
              <div class="detail-item">
                <span class="label">Đánh giá:</span>
                <span class="value">{{ service.rating }}/5 ⭐</span>
              </div>
            </div>

            <div class="service-actions">
              <button @click="editService(service)" class="btn-edit">
                Sửa
              </button>
              <button @click="viewServiceDetails(service)" class="btn-details">
                Chi tiết
              </button>
              <button @click="toggleServiceStatus(service)" class="btn-toggle">
                {{ service.status === "active" ? "Tạm ngưng" : "Kích hoạt" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal thêm/sửa dịch vụ -->
    <div
      v-if="showServiceModal"
      class="modal-overlay"
      @click="closeServiceModal"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditing ? "Sửa dịch vụ" : "Thêm dịch vụ mới" }}</h3>
          <button @click="closeServiceModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveService" class="service-form">
            <div class="form-group">
              <label for="service-name">Tên dịch vụ:</label>
              <input
                type="text"
                id="service-name"
                v-model="serviceForm.name"
                class="form-input"
                required
              />
            </div>

            <div class="form-group">
              <label for="service-description">Mô tả:</label>
              <textarea
                id="service-description"
                v-model="serviceForm.description"
                class="form-textarea"
                rows="3"
                required
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="service-price">Giá (VNĐ):</label>
                <input
                  type="number"
                  id="service-price"
                  v-model="serviceForm.price"
                  class="form-input"
                  required
                />
              </div>
              <div class="form-group">
                <label for="service-duration">Thời gian (phút):</label>
                <input
                  type="number"
                  id="service-duration"
                  v-model="serviceForm.duration"
                  class="form-input"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="service-icon">Icon:</label>
              <select
                id="service-icon"
                v-model="serviceForm.icon"
                class="form-select"
              >
                <option value="📋">📋 Tư vấn</option>
                <option value="📄">📄 Văn bản</option>
                <option value="⚖️">⚖️ Pháp luật</option>
                <option value="📝">📝 Soạn thảo</option>
                <option value="🔍">🔍 Nghiên cứu</option>
                <option value="💼">💼 Hợp đồng</option>
              </select>
            </div>

            <div class="form-group">
              <label for="service-status">Trạng thái:</label>
              <select
                id="service-status"
                v-model="serviceForm.status"
                class="form-select"
              >
                <option value="active">Hoạt động</option>
                <option value="suspended">Tạm ngưng</option>
                <option value="maintenance">Bảo trì</option>
              </select>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-save">
                {{ isEditing ? "Cập nhật" : "Thêm mới" }}
              </button>
              <button
                type="button"
                @click="closeServiceModal"
                class="btn-cancel"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal chi tiết dịch vụ -->
    <div
      v-if="showDetailsModal"
      class="modal-overlay"
      @click="closeDetailsModal"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Chi tiết dịch vụ</h3>
          <button @click="closeDetailsModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body" v-if="selectedService">
          <div class="service-details-view">
            <div class="detail-header">
              <div class="service-icon-large">{{ selectedService.icon }}</div>
              <div class="service-info">
                <h2>{{ selectedService.name }}</h2>
                <span :class="['status', selectedService.status]">
                  {{ getStatusText(selectedService.status) }}
                </span>
              </div>
            </div>

            <div class="detail-content">
              <div class="detail-section">
                <h4>Mô tả dịch vụ</h4>
                <p>{{ selectedService.description }}</p>
              </div>

              <div class="detail-section">
                <h4>Thông tin cơ bản</h4>
                <div class="info-list">
                  <div class="info-item">
                    <span class="label">Giá dịch vụ:</span>
                    <span class="value">{{
                      formatCurrency(selectedService.price)
                    }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Thời gian:</span>
                    <span class="value"
                      >{{ selectedService.duration }} phút</span
                    >
                  </div>
                  <div class="info-item">
                    <span class="label">Đánh giá:</span>
                    <span class="value">{{ selectedService.rating }}/5 ⭐</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Số lượt sử dụng:</span>
                    <span class="value">{{ selectedService.usageCount }}</span>
                  </div>
                </div>
              </div>

              <div class="detail-section">
                <h4>Thống kê sử dụng</h4>
                <div class="stats-grid">
                  <div class="stat-item">
                    <span class="stat-label">Tuần này</span>
                    <span class="stat-value">{{
                      selectedService.weeklyUsage
                    }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Tháng này</span>
                    <span class="stat-value">{{
                      selectedService.monthlyUsage
                    }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Doanh thu</span>
                    <span class="stat-value">{{
                      formatCurrency(selectedService.revenue)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

const showServiceModal = ref(false);
const showDetailsModal = ref(false);
const isEditing = ref(false);
const selectedService = ref(null);
const serviceForm = ref({
  name: "",
  description: "",
  price: 0,
  duration: 30,
  icon: "📋",
  status: "active",
});

// Mock data
const totalServices = ref(8);
const activeServices = ref(6);
const suspendedServices = ref(1);
const maintenanceServices = ref(1);

const servicesList = ref([
  {
    id: 1,
    name: "Tư vấn pháp luật",
    description:
      "Dịch vụ tư vấn pháp luật trực tuyến với luật sư chuyên nghiệp",
    price: 500000,
    duration: 30,
    icon: "📋",
    status: "active",
    rating: 4.5,
    usageCount: 1250,
    weeklyUsage: 45,
    monthlyUsage: 180,
    revenue: 625000000,
  },
  {
    id: 2,
    name: "Rà soát văn bản",
    description: "Rà soát và đánh giá tính hợp pháp của các văn bản pháp luật",
    price: 300000,
    duration: 20,
    icon: "📄",
    status: "active",
    rating: 4.3,
    usageCount: 890,
    weeklyUsage: 32,
    monthlyUsage: 125,
    revenue: 267000000,
  },
  {
    id: 3,
    name: "Soạn thảo hợp đồng",
    description: "Soạn thảo các loại hợp đồng theo yêu cầu của khách hàng",
    price: 800000,
    duration: 60,
    icon: "💼",
    status: "active",
    rating: 4.7,
    usageCount: 650,
    weeklyUsage: 18,
    monthlyUsage: 75,
    revenue: 520000000,
  },
  {
    id: 4,
    name: "Nghiên cứu pháp luật",
    description: "Nghiên cứu và phân tích các vấn đề pháp luật phức tạp",
    price: 1000000,
    duration: 90,
    icon: "🔍",
    status: "active",
    rating: 4.6,
    usageCount: 420,
    weeklyUsage: 12,
    monthlyUsage: 50,
    revenue: 420000000,
  },
  {
    id: 5,
    name: "Đại diện pháp luật",
    description: "Đại diện khách hàng trong các vụ việc pháp luật",
    price: 2000000,
    duration: 120,
    icon: "⚖️",
    status: "suspended",
    rating: 4.8,
    usageCount: 280,
    weeklyUsage: 8,
    monthlyUsage: 35,
    revenue: 560000000,
  },
  {
    id: 6,
    name: "Tư vấn thuế",
    description: "Tư vấn về các vấn đề thuế và kế toán",
    price: 600000,
    duration: 45,
    icon: "📝",
    status: "maintenance",
    rating: 4.4,
    usageCount: 320,
    weeklyUsage: 15,
    monthlyUsage: 60,
    revenue: 192000000,
  },
]);

const addNewService = () => {
  isEditing.value = false;
  serviceForm.value = {
    name: "",
    description: "",
    price: 0,
    duration: 30,
    icon: "📋",
    status: "active",
  };
  showServiceModal.value = true;
};

const editService = (service) => {
  isEditing.value = true;
  serviceForm.value = { ...service };
  showServiceModal.value = true;
};

const viewServiceDetails = (service) => {
  selectedService.value = service;
  showDetailsModal.value = true;
};

const toggleServiceStatus = (service) => {
  service.status = service.status === "active" ? "suspended" : "active";
  // Update counts
  if (service.status === "active") {
    activeServices.value++;
    suspendedServices.value--;
  } else {
    activeServices.value--;
    suspendedServices.value++;
  }
};

const saveService = () => {
  if (isEditing.value) {
    // Update existing service
    const index = servicesList.value.findIndex(
      (s) => s.id === serviceForm.value.id
    );
    if (index !== -1) {
      servicesList.value[index] = { ...serviceForm.value };
    }
  } else {
    // Add new service
    const newService = {
      ...serviceForm.value,
      id: Date.now(),
      rating: 0,
      usageCount: 0,
      weeklyUsage: 0,
      monthlyUsage: 0,
      revenue: 0,
    };
    servicesList.value.push(newService);
    totalServices.value++;
    activeServices.value++;
  }

  closeServiceModal();
};

const closeServiceModal = () => {
  showServiceModal.value = false;
  serviceForm.value = {
    name: "",
    description: "",
    price: 0,
    duration: 30,
    icon: "📋",
    status: "active",
  };
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedService.value = null;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getStatusText = (status) => {
  const statusMap = {
    active: "Hoạt động",
    suspended: "Tạm ngưng",
    maintenance: "Bảo trì",
  };
  return statusMap[status] || status;
};
</script>

<style scoped>
.service-info-page {
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

.overview-section {
  margin-bottom: 2rem;
}

.overview-section h2 {
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: 12px;
}

.info-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.info-content p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.services-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.section-header h2 {
  margin: 0;
  color: var(--text-primary);
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: var(--success-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background: var(--success-dark);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.service-card {
  background: var(--bg-page);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-hover);
}

.service-icon {
  font-size: 1.5rem;
}

.service-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.service-status.active {
  background: var(--success-light);
  color: var(--success-color);
}

.service-status.suspended {
  background: var(--warning-light);
  color: var(--warning-color);
}

.service-status.maintenance {
  background: var(--info-light);
  color: var(--info-color);
}

.service-content {
  padding: 1rem;
}

.service-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.service-description {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
}

.service-details {
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.detail-item .label {
  color: var(--text-secondary);
}

.detail-item .value {
  color: var(--text-primary);
  font-weight: 500;
}

.service-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-details,
.btn-toggle {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.btn-edit {
  background: var(--info-color);
  color: white;
}

.btn-edit:hover {
  background: var(--info-dark);
}

.btn-details {
  background: var(--primary-color);
  color: white;
}

.btn-details:hover {
  background: var(--primary-dark);
}

.btn-toggle {
  background: var(--warning-color);
  color: white;
}

.btn-toggle:hover {
  background: var(--warning-dark);
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
  max-width: 600px;
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

.service-form {
  display: grid;
  gap: 1rem;
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
.form-select,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-page);
  color: var(--text-primary);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

/* Service details view */
.service-details-view {
  display: grid;
  gap: 2rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.service-icon-large {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: 16px;
}

.service-info h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section h4 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.detail-section p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.info-list {
  display: grid;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--bg-hover);
  border-radius: 6px;
}

.info-item .label {
  color: var(--text-secondary);
  font-weight: 500;
}

.info-item .value {
  color: var(--text-primary);
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: var(--bg-hover);
  border-radius: 6px;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .service-actions {
    flex-direction: column;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
