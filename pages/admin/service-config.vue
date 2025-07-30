<template>
  <div class="service-config-page">
    <div class="page-header">
      <h1>Cài đặt dịch vụ</h1>
      <p>Quản lý cấu hình và thiết lập các dịch vụ pháp luật</p>
    </div>

    <div class="config-sections">
      <!-- Cấu hình dịch vụ chính -->
      <div class="config-section">
        <h2>Cấu hình dịch vụ chính</h2>
        <div class="config-form">
          <div class="form-group">
            <label for="service-name">Tên dịch vụ:</label>
            <input
              type="text"
              id="service-name"
              v-model="serviceConfig.name"
              placeholder="Nhập tên dịch vụ..."
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="service-description">Mô tả:</label>
            <textarea
              id="service-description"
              v-model="serviceConfig.description"
              placeholder="Mô tả dịch vụ..."
              class="form-textarea"
              rows="3"
            ></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="service-price">Giá dịch vụ (VNĐ):</label>
              <input
                type="number"
                id="service-price"
                v-model="serviceConfig.price"
                placeholder="0"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="service-duration">Thời gian (phút):</label>
              <input
                type="number"
                id="service-duration"
                v-model="serviceConfig.duration"
                placeholder="30"
                class="form-input"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="service-status">Trạng thái:</label>
            <select
              id="service-status"
              v-model="serviceConfig.status"
              class="form-select"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm ngưng</option>
              <option value="maintenance">Bảo trì</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Cài đặt thông báo -->
      <div class="config-section">
        <h2>Cài đặt thông báo</h2>
        <div class="config-form">
          <div class="form-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="notificationConfig.emailNotification"
                class="form-checkbox"
              />
              <span>Gửi thông báo qua email</span>
            </label>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="notificationConfig.smsNotification"
                class="form-checkbox"
              />
              <span>Gửi thông báo qua SMS</span>
            </label>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="notificationConfig.pushNotification"
                class="form-checkbox"
              />
              <span>Gửi thông báo push</span>
            </label>
          </div>
          <div class="form-group">
            <label for="notification-time"
              >Thời gian thông báo (phút trước):</label
            >
            <input
              type="number"
              id="notification-time"
              v-model="notificationConfig.notificationTime"
              placeholder="15"
              class="form-input"
            />
          </div>
        </div>
      </div>

      <!-- Cài đặt bảo mật -->
      <div class="config-section">
        <h2>Cài đặt bảo mật</h2>
        <div class="config-form">
          <div class="form-group">
            <label for="session-timeout">Thời gian timeout phiên (phút):</label>
            <input
              type="number"
              id="session-timeout"
              v-model="securityConfig.sessionTimeout"
              placeholder="30"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="max-attempts">Số lần thử đăng nhập tối đa:</label>
            <input
              type="number"
              id="max-attempts"
              v-model="securityConfig.maxLoginAttempts"
              placeholder="5"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="securityConfig.requireTwoFactor"
                class="form-checkbox"
              />
              <span>Yêu cầu xác thực 2 yếu tố</span>
            </label>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="securityConfig.encryptData"
                class="form-checkbox"
              />
              <span>Mã hóa dữ liệu</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Cài đặt hệ thống -->
      <div class="config-section">
        <h2>Cài đặt hệ thống</h2>
        <div class="config-form">
          <div class="form-group">
            <label for="timezone">Múi giờ:</label>
            <select
              id="timezone"
              v-model="systemConfig.timezone"
              class="form-select"
            >
              <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
              <option value="UTC">UTC</option>
              <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="language">Ngôn ngữ:</label>
            <select
              id="language"
              v-model="systemConfig.language"
              class="form-select"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          <div class="form-group">
            <label for="date-format">Định dạng ngày:</label>
            <select
              id="date-format"
              v-model="systemConfig.dateFormat"
              class="form-select"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div class="form-group">
            <label for="currency">Đơn vị tiền tệ:</label>
            <select
              id="currency"
              v-model="systemConfig.currency"
              class="form-select"
            >
              <option value="VND">VND (Việt Nam Đồng)</option>
              <option value="USD">USD (Đô la Mỹ)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Nút lưu cấu hình -->
    <div class="action-buttons">
      <button @click="saveConfig" class="btn-save">Lưu cấu hình</button>
      <button @click="resetConfig" class="btn-reset">Đặt lại</button>
      <button @click="testConfig" class="btn-test">Kiểm tra cấu hình</button>
    </div>

    <!-- Thông báo -->
    <div v-if="showNotification" :class="['notification', notificationType]">
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const serviceConfig = ref({
  name: "Tư vấn pháp luật",
  description: "Dịch vụ tư vấn pháp luật trực tuyến",
  price: 500000,
  duration: 30,
  status: "active",
});

const notificationConfig = ref({
  emailNotification: true,
  smsNotification: false,
  pushNotification: true,
  notificationTime: 15,
});

const securityConfig = ref({
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  requireTwoFactor: false,
  encryptData: true,
});

const systemConfig = ref({
  timezone: "Asia/Ho_Chi_Minh",
  language: "vi",
  dateFormat: "DD/MM/YYYY",
  currency: "VND",
});

const showNotification = ref(false);
const notificationType = ref("success");
const notificationMessage = ref("");

const saveConfig = () => {
  // Mock API call
  setTimeout(() => {
    showNotification.value = true;
    notificationType.value = "success";
    notificationMessage.value = "Cấu hình đã được lưu thành công!";

    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }, 1000);
};

const resetConfig = () => {
  // Reset to default values
  serviceConfig.value = {
    name: "Tư vấn pháp luật",
    description: "Dịch vụ tư vấn pháp luật trực tuyến",
    price: 500000,
    duration: 30,
    status: "active",
  };

  notificationConfig.value = {
    emailNotification: true,
    smsNotification: false,
    pushNotification: true,
    notificationTime: 15,
  };

  securityConfig.value = {
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireTwoFactor: false,
    encryptData: true,
  };

  systemConfig.value = {
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
    dateFormat: "DD/MM/YYYY",
    currency: "VND",
  };

  showNotification.value = true;
  notificationType.value = "info";
  notificationMessage.value = "Cấu hình đã được đặt lại!";

  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

const testConfig = () => {
  showNotification.value = true;
  notificationType.value = "info";
  notificationMessage.value = "Đang kiểm tra cấu hình...";

  setTimeout(() => {
    notificationType.value = "success";
    notificationMessage.value = "Cấu hình hoạt động bình thường!";

    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }, 2000);
};
</script>

<style scoped>
.service-config-page {
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

.config-sections {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

.config-section {
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.config-section h2 {
  margin: 0;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 1.25rem;
}

.config-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-page);
  color: var(--text-primary);
  font-size: 0.875rem;
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

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: normal;
}

.form-checkbox {
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.btn-save,
.btn-reset,
.btn-test {
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

.btn-reset {
  background: var(--warning-color);
  color: white;
}

.btn-reset:hover {
  background: var(--warning-dark);
}

.btn-test {
  background: var(--info-color);
  color: white;
}

.btn-test:hover {
  background: var(--info-dark);
}

.notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.notification.success {
  background: var(--success-color);
}

.notification.error {
  background: var(--danger-color);
}

.notification.info {
  background: var(--info-color);
}

.notification.warning {
  background: var(--warning-color);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .notification {
    right: 1rem;
    left: 1rem;
  }
}
</style>
