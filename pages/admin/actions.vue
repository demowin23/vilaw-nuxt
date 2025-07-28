<template>
  <div class="admin-actions">
    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <h2>Lịch sử Admin Actions</h2>
        <p>Tổng cộng {{ totalActions }} hành động</p>
      </div>
    </div>

    <!-- Bộ lọc -->
    <div class="filters">
      <div class="filter-group">
        <select v-model="actionTypeFilter" class="filter-select">
          <option value="">Tất cả hành động</option>
          <option value="create_user">Tạo user</option>
          <option value="update_user">Cập nhật user</option>
          <option value="delete_user">Xóa user</option>
          <option value="change_role">Thay đổi role</option>
        </select>
      </div>
    </div>

    <!-- Bảng danh sách -->
    <div class="table-container">
      <table class="actions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Loại hành động</th>
            <th>Mô tả</th>
            <th>Admin ID</th>
            <th>Target User ID</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="action in actions" :key="action.id">
            <td>{{ action.id }}</td>
            <td>
              <span :class="`action-badge action-${action.action_type}`">
                {{ getActionTypeLabel(action.action_type) }}
              </span>
            </td>
            <td>{{ action.description }}</td>
            <td>{{ action.admin_id }}</td>
            <td>{{ action.target_user_id }}</td>
            <td>{{ formatDate(action.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="actions.length === 0" class="empty-state">
      <p>Không có hành động nào</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { getAdminActions, isLoading } = useAdmin();
const { handleApiError } = useNotification();

// State
const actions = ref<any[]>([]);
const totalActions = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(20);
const actionTypeFilter = ref("");

// Load actions on mount
onMounted(() => {
  loadActions();
});

// Load actions with filters
const loadActions = async () => {
  try {
    const params: any = {
      limit: itemsPerPage.value,
      offset: (currentPage.value - 1) * itemsPerPage.value,
    };

    if (actionTypeFilter.value) {
      params.action_type = actionTypeFilter.value;
    }

    const response = await getAdminActions(params);
    actions.value = response.data;
    totalActions.value = response.total;
  } catch (error) {
    handleApiError(error, "Không thể tải lịch sử admin actions");
  }
};

// Watch for filter changes
watch([actionTypeFilter], () => {
  currentPage.value = 1;
  loadActions();
});

// Methods
const getActionTypeLabel = (actionType: string) => {
  const labels: Record<string, string> = {
    create_user: "Tạo user",
    update_user: "Cập nhật user",
    delete_user: "Xóa user",
    change_role: "Thay đổi role",
  };
  return labels[actionType] || actionType;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("vi-VN");
};
</script>

<style scoped>
.admin-actions {
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

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
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
  min-width: 200px;
}

.table-container {
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.actions-table {
  width: 100%;
  border-collapse: collapse;
}

.actions-table th,
.actions-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.actions-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
}

.action-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.action-create_user {
  background: #51cf66;
  color: white;
}

.action-update_user {
  background: #4ecdc4;
  color: white;
}

.action-delete_user {
  background: #ff6b6b;
  color: white;
}

.action-change_role {
  background: #fcc419;
  color: white;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .admin-actions {
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

  .filter-group {
    flex-direction: column;
  }

  .actions-table {
    font-size: 0.9rem;
  }

  .actions-table th,
  .actions-table td {
    padding: 0.5rem;
  }
}
</style>
