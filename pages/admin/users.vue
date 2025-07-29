<template>
  <div class="users-management">
    <!-- Header với nút thêm mới -->
    <div class="page-header">
      <div class="header-left">
        <h2>Quản lý tài khoản</h2>
        <p>Tổng cộng {{ totalUsers }} tài khoản</p>
      </div>
      <button
        @click="showAddModal = true"
        class="add-btn"
        :disabled="isLoading"
      >
        <span v-if="isLoading">⏳</span>
        <span v-else>➕</span>
        {{ isLoading ? "Đang tải..." : "Thêm tài khoản mới" }}
      </button>
    </div>

    <!-- Bộ lọc và tìm kiếm -->
    <div class="filters">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm theo tên, email..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>

      <div class="filter-group">
        <select v-model="statusFilter" class="filter-select">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>

        <select v-model="roleFilter" class="filter-select">
          <option value="">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="user">Người dùng</option>
          <option value="lawyer">Luật sư</option>
          <option value="collaborator">Cộng tác viên</option>
        </select>
      </div>
    </div>

    <!-- Bảng danh sách -->
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Thông tin</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td class="user-info">
              <div class="user-avatar">{{ user.fullName.charAt(0) }}</div>
              <div class="user-details">
                <div class="user-name">{{ user.fullName }}</div>
                <div class="user-phone">{{ user.phone }}</div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="`role-badge role-${user.role}`">
                {{ getRoleLabel(user.role) }}
              </span>
            </td>
            <td>
              <span
                :class="`status-badge status-${
                  user.isActive ? 'active' : 'inactive'
                }`"
              >
                {{ getStatusLabel(user.isActive) }}
              </span>
            </td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td class="actions">
              <button
                @click="viewUser(user)"
                class="action-btn view-btn"
                title="Xem"
              >
                👁️
              </button>
              <button
                @click="editUser(user)"
                class="action-btn edit-btn"
                title="Sửa"
              >
                ✏️
              </button>
              <button
                @click="showChangeRole(user)"
                class="action-btn role-btn"
                title="Đổi role"
              >
                🔄
              </button>
              <button
                @click="handleDeleteUser(user)"
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

    <!-- Modal thêm/sửa user -->
    <div
      v-if="showAddModal || showEditModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ showAddModal ? "Thêm tài khoản mới" : "Sửa tài khoản" }}</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="saveUser" class="modal-form">
          <div class="form-group">
            <label>Họ và tên *</label>
            <input v-model="userForm.fullName" type="text" required />
          </div>

          <div class="form-group">
            <label>Email *</label>
            <input v-model="userForm.email" type="email" required />
          </div>

          <div class="form-group">
            <label>Số điện thoại *</label>
            <input v-model="userForm.phone" type="tel" required />
          </div>

          <div class="form-group">
            <label
              >Mật khẩu
              {{ showAddModal ? "*" : "(để trống nếu không đổi)" }}</label
            >
            <input
              v-model="userForm.password"
              type="password"
              :required="showAddModal"
            />
          </div>

          <div class="form-group">
            <label>Vai trò *</label>
            <select v-model="userForm.role" required>
              <option value="user">Người dùng</option>
              <option value="lawyer">Luật sư</option>
              <option value="admin">Admin</option>
              <option value="collaborator">Cộng tác viên</option>
            </select>
          </div>

          <div class="form-group">
            <label>Địa chỉ</label>
            <input v-model="userForm.address" type="text" />
          </div>

          <div class="form-group">
            <label>Ngày sinh</label>
            <input v-model="userForm.dateOfBirth" type="date" />
          </div>

          <div class="form-group">
            <label>Giới tính</label>
            <select v-model="userForm.gender">
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
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
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Chi tiết tài khoản</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <div class="user-detail">
          <div class="detail-item">
            <label>ID:</label>
            <span>{{ selectedUser.id }}</span>
          </div>
          <div class="detail-item">
            <label>Họ và tên:</label>
            <span>{{ selectedUser.fullName }}</span>
          </div>
          <div class="detail-item">
            <label>Email:</label>
            <span>{{ selectedUser.email }}</span>
          </div>
          <div class="detail-item">
            <label>Số điện thoại:</label>
            <span>{{ selectedUser.phone || "Chưa cập nhật" }}</span>
          </div>
          <div class="detail-item">
            <label>Vai trò:</label>
            <span :class="`role-badge role-${selectedUser.role}`">
              {{ getRoleLabel(selectedUser.role) }}
            </span>
          </div>
          <div class="detail-item">
            <label>Trạng thái:</label>
            <span
              :class="`status-badge status-${
                selectedUser.isActive ? 'active' : 'inactive'
              }`"
            >
              {{ getStatusLabel(selectedUser.isActive) }}
            </span>
          </div>
          <div class="detail-item">
            <label>Địa chỉ:</label>
            <span>{{ selectedUser.address || "Chưa cập nhật" }}</span>
          </div>
          <div class="detail-item">
            <label>Ngày sinh:</label>
            <span>{{
              selectedUser.dateOfBirth
                ? formatDate(selectedUser.dateOfBirth)
                : "Chưa cập nhật"
            }}</span>
          </div>
          <div class="detail-item">
            <label>Giới tính:</label>
            <span>{{ selectedUser.gender || "Chưa cập nhật" }}</span>
          </div>
          <div class="detail-item">
            <label>Xác thực điện thoại:</label>
            <span>{{
              selectedUser.isPhoneVerified ? "Đã xác thực" : "Chưa xác thực"
            }}</span>
          </div>
          <div class="detail-item">
            <label>Xác thực email:</label>
            <span>{{
              selectedUser.isEmailVerified ? "Đã xác thực" : "Chưa xác thực"
            }}</span>
          </div>
          <div class="detail-item">
            <label>Đăng nhập cuối:</label>
            <span>{{
              selectedUser.lastLogin
                ? formatDate(selectedUser.lastLogin)
                : "Chưa đăng nhập"
            }}</span>
          </div>
          <div class="detail-item">
            <label>Ngày tạo:</label>
            <span>{{ formatDate(selectedUser.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal thay đổi role -->
    <div v-if="showRoleModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Thay đổi vai trò</h3>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="changeRole" class="modal-form">
          <div class="form-group">
            <label>User: {{ selectedUser.fullName }}</label>
          </div>

          <div class="form-group">
            <label>Vai trò hiện tại:</label>
            <span :class="`role-badge role-${selectedUser.role}`">
              {{ getRoleLabel(selectedUser.role) }}
            </span>
          </div>

          <div class="form-group">
            <label>Vai trò mới *</label>
            <select v-model="roleForm.role" required>
              <option value="user">Người dùng</option>
              <option value="lawyer">Luật sư</option>
              <option value="admin">Admin</option>
              <option value="collaborator">Cộng tác viên</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="cancel-btn">
              Hủy
            </button>
            <button type="submit" class="save-btn">Thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  changeUserRole,
  isLoading,
} = useAdmin();
const { handleApiError, handleApiSuccess } = useNotification();
const { isAdmin } = useAuth();
import { useAdmin } from "~/composables/useAdmin";
import { useNotification } from "~/composables/useNotification";
import { useAuth } from "~/composables/useAuth";

// State
const users = ref<any[]>([]);
const totalUsers = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const searchQuery = ref("");
const statusFilter = ref("");
const roleFilter = ref("");
const showAddModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const showRoleModal = ref(false);
const selectedUser = ref<any>({});
const userForm = ref({
  fullName: "",
  email: "",
  phone: "",
  password: "",
  role: "user",
  address: "",
  dateOfBirth: "",
  gender: "",
});
const roleForm = ref({
  role: "user",
});

// Load users on mount
onMounted(() => {
  loadUsers();
});

// Load users with filters
const loadUsers = async () => {
  try {
    const params: any = {
      limit: itemsPerPage.value,
      offset: (currentPage.value - 1) * itemsPerPage.value,
    };

    if (searchQuery.value) {
      params.search = searchQuery.value;
    }

    if (roleFilter.value) {
      params.role = roleFilter.value;
    }

    if (statusFilter.value) {
      params.is_active = statusFilter.value === "active";
    }

    const response = await getUsers(params);
    users.value = response.data;
    totalUsers.value = response.total;
  } catch (error) {
    handleApiError(error, "Không thể tải danh sách users");
  }
};

// Watch for filter changes
watch([searchQuery, roleFilter, statusFilter], () => {
  currentPage.value = 1;
  loadUsers();
});

// Computed
const totalPages = computed(() =>
  Math.ceil(totalUsers.value / itemsPerPage.value)
);

// Methods
const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    admin: "Admin",
    lawyer: "Luật sư",
    user: "Người dùng",
    collaborator: "Cộng tác viên",
  };
  return labels[role] || role;
};

const getStatusLabel = (isActive: boolean) => {
  return isActive ? "Đang hoạt động" : "Không hoạt động";
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const viewUser = (user: any) => {
  selectedUser.value = user;
  showViewModal.value = true;
};

const editUser = (user: any) => {
  selectedUser.value = user;
  userForm.value = {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    password: "",
    role: user.role,
    address: user.address || "",
    dateOfBirth: user.dateOfBirth || "",
    gender: user.gender || "",
  };
  showEditModal.value = true;
};

const showChangeRole = (user: any) => {
  selectedUser.value = user;
  roleForm.value.role = user.role;
  showRoleModal.value = true;
};

const handleDeleteUser = async (user: any) => {
  if (confirm(`Bạn có chắc muốn xóa tài khoản "${user.fullName}"?`)) {
    try {
      await deleteUser(user.id);
      handleApiSuccess({ message: "Xóa user thành công!" });
      loadUsers();
    } catch (error) {
      handleApiError(error, "Không thể xóa user");
    }
  }
};

const saveUser = async () => {
  try {
    if (showAddModal.value) {
      // Thêm mới
      const response = await createUser(userForm.value);
      handleApiSuccess(response, "Tạo user thành công!");
    } else {
      // Cập nhật
      const updateData = { ...userForm.value };
      delete updateData.password; // Không gửi password nếu trống
      if (!updateData.password) {
        delete updateData.password;
      }

      const response = await updateUser(selectedUser.value.id, updateData);
      handleApiSuccess(response, "Cập nhật user thành công!");
    }
    closeModal();
    loadUsers();
  } catch (error) {
    handleApiError(error, "Không thể lưu user");
  }
};

const changeRole = async () => {
  try {
    const response = await changeUserRole(
      selectedUser.value.id,
      roleForm.value.role
    );
    handleApiSuccess(response, "Thay đổi role thành công!");
    closeModal();
    loadUsers();
  } catch (error) {
    handleApiError(error, "Không thể thay đổi role");
  }
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showViewModal.value = false;
  showRoleModal.value = false;
  selectedUser.value = {};
  userForm.value = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    address: "",
    dateOfBirth: "",
    gender: "",
  };
  roleForm.value = {
    role: "user",
  };
};
</script>

<style scoped>
.users-management {
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

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.users-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-name {
  font-weight: 500;
  color: var(--text-primary);
}

.user-phone {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.role-badge,
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.role-admin {
  background: #ff6b6b;
  color: white;
}

.role-lawyer {
  background: #4ecdc4;
  color: white;
}

.role-user {
  background: #45b7d1;
  color: white;
}

.role-collaborator {
  background: #ffd43b;
  color: #333;
}

.status-active {
  background: #51cf66;
  color: white;
}

.status-inactive {
  background: #868e96;
  color: white;
}

.status-banned {
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

.role-btn:hover {
  background: var(--info-light);
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
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
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

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-primary);
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

.user-detail {
  padding: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item label {
  font-weight: 500;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .users-management {
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

  .users-table {
    font-size: 0.9rem;
  }

  .users-table th,
  .users-table td {
    padding: 0.5rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
