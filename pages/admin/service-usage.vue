<template>
  <div class="service-usage-page">
    <div class="page-header">
      <h1>Tra cứu sử dụng dịch vụ</h1>
      <p>Quản lý và tra cứu thông tin sử dụng dịch vụ của khách hàng</p>
    </div>

    <!-- Sub-navigation tabs -->
    <div class="sub-nav">
      <button
        :class="['sub-nav-btn', { active: activeTab === 'charge-history' }]"
        @click="activeTab = 'charge-history'"
      >
        Lịch sử trừ cước
      </button>
      <button
        :class="[
          'sub-nav-btn',
          { active: activeTab === 'registration-history' },
        ]"
        @click="activeTab = 'registration-history'"
      >
        Lịch sử đăng ký/Huỷ
      </button>

      <button
        :class="['sub-nav-btn', { active: activeTab === 'usage-history' }]"
        @click="activeTab = 'usage-history'"
      >
        Lịch sử sử dụng
      </button>
      <button
        :class="['sub-nav-btn', { active: activeTab === 'mo-mt-history' }]"
        @click="activeTab = 'mo-mt-history'"
      >
        Lịch sử MO/MT
      </button>
      <button
        :class="['sub-nav-btn', { active: activeTab === 'event-subscribers' }]"
        @click="activeTab = 'event-subscribers'"
      >
        Danh sách thuê bao tham gia event
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Search and Filter Section -->
      <div class="filter-section">
        <div class="filter-row">
          <div class="filter-group">
            <label for="subscriber-number">Số thuê bao:</label>
            <input
              type="text"
              id="subscriber-number"
              v-model="filterData.subscriberNumber"
              placeholder="0948252190"
              class="form-input"
            />
          </div>
          <div class="filter-group">
            <label for="service-package">Gói cước:</label>
            <select
              id="service-package"
              v-model="filterData.selectedPackage"
              class="form-select"
            >
              <option value="">- Chọn gói cước -</option>
              <option value="SAODEP">SAODEP</option>
              <option value="EVADEP">EVADEP</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="start-time">Thời gian bắt đầu:</label>
            <input
              type="date"
              id="start-time"
              v-model="filterData.startTime"
              class="form-input"
            />
          </div>
          <div class="filter-group">
            <label for="end-time">Thời gian kết thúc:</label>
            <input
              type="date"
              id="end-time"
              v-model="filterData.endTime"
              class="form-input"
            />
          </div>
          <button @click="searchData" class="search-btn">
            <span class="search-icon">🔍</span>
            Tra cứu
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="table-section">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th v-if="activeTab === 'mo-mt-history'">
                  Thời gian hệ thống nhận MO
                </th>
                <th v-if="activeTab === 'mo-mt-history'">Nội dung MO</th>
                <th v-if="activeTab === 'mo-mt-history'">Trạng thái</th>
                <th v-if="activeTab === 'mo-mt-history'">Cước phí MO</th>
                <th v-if="activeTab === 'mo-mt-history'">Đầu số nhận MO</th>
                <th v-if="activeTab === 'mo-mt-history'">Thời gian gửi MT</th>
                <th v-if="activeTab === 'mo-mt-history'">Nội dung MT</th>
                <th v-if="activeTab === 'mo-mt-history'">Gói cước</th>
                <th v-if="activeTab === 'mo-mt-history'">Trạng thái</th>
                <th v-if="activeTab === 'mo-mt-history'">Cước phí MT</th>
                <th v-if="activeTab === 'mo-mt-history'">Đầu số gửi MT</th>
                <th v-if="activeTab === 'charge-history'">
                  Thời gian giao dịch
                </th>
                <th v-if="activeTab === 'charge-history'">Loại giao dịch</th>
                <th v-if="activeTab === 'charge-history'">Gói cước</th>
                <th v-if="activeTab === 'charge-history'">Số thuê bao</th>
                <th v-if="activeTab === 'charge-history'">Kênh</th>
                <th v-if="activeTab === 'charge-history'">Ứng dụng/Sự kiện</th>
                <th v-if="activeTab === 'charge-history'">Tài khoản/CT</th>
                <th v-if="activeTab === 'charge-history'">User IP</th>
                <th v-if="activeTab === 'charge-history'">Cước phí</th>
                <th
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  Thời gian giao dịch
                </th>
                <th
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  Loại giao dịch
                </th>
                <th
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  Gói cước
                </th>
                <th
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  Tình trạng
                </th>
                <th
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  Kênh
                </th>
                <th
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  Ứng dụng/Sự kiện
                </th>
                <th
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  Tài khoản/CT
                </th>
                <th
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  User IP
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in store.tableData[activeTab]"
                :key="index"
              >
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.moReceiveTime || "-" }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.moContent || "-" }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.moStatus || "-" }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.moChargeFee || "-" }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.moRecipientNumber || "-" }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ formatDateTime(item.mtSendTime) }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.mtContent }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.servicePackage }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.mtStatus }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.mtChargeFee }}
                </td>
                <td v-if="activeTab === 'mo-mt-history'">
                  {{ item.mtSenderNumber }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ formatDateTime(item.transactionTime) }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ item.transactionType }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ item.servicePackage }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ item.subscriberNumber }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ item.channel }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ item.application }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ item.account || "-" }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ item.userIP || "-" }}
                </td>
                <td v-if="activeTab === 'charge-history'">
                  {{ formatCurrency(item.chargeFee) }}
                </td>
                <td
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  {{ formatDateTime(item.transactionTime) }}
                </td>
                <td
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  {{ item.transactionType }}
                </td>
                <td
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  {{ item.servicePackage }}
                </td>
                <td
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  {{ item.status }}
                </td>
                <td
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  {{ item.channel }}
                </td>
                <td
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  {{ item.application || "-" }}
                </td>
                <td
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  {{ item.account || "-" }}
                </td>
                <td
                  v-if="
                    activeTab !== 'mo-mt-history' &&
                    activeTab !== 'charge-history'
                  "
                >
                  {{ item.userIP || "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Summary -->
      <div class="summary-section">
        <div class="total-charge">
          <span class="total-label">Tổng cộng cước phí:</span>
          <span class="total-value">{{
            formatCurrency(store.summaryData[activeTab].total)
          }}</span>
        </div>
        <div class="pagination">
          <button class="page-btn">&lt;</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useServiceUsageStore } from "~/stores/serviceUsage";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const store = useServiceUsageStore();
const activeTab = ref("charge-history");

// Local filter data that syncs with store
const filterData = ref({
  subscriberNumber: store.filterData.subscriberNumber,
  selectedPackage: store.filterData.selectedPackage,
  startTime: store.filterData.startTime,
  endTime: store.filterData.endTime,
});

// Watch for filter changes and update store
watch(
  filterData,
  (newData) => {
    store.updateFilterData(newData);
  },
  { deep: true }
);

// Mock data for different tabs
const mockData = {
  "charge-history": [
    {
      transactionTime: new Date("2021-10-03T00:02:39"),
      transactionType: "Gia hạn",
      servicePackage: "SAODEP",
      subscriberNumber: "84948252190",
      channel: "SYSTEM",
      application: "SYSTEM",
      account: "",
      userIP: "",
      chargeFee: 5000,
    },
    {
      transactionTime: new Date("2021-10-02T23:59:59"),
      transactionType: "Gia hạn",
      servicePackage: "SAODEP",
      subscriberNumber: "84948252190",
      channel: "SYSTEM",
      application: "SYSTEM",
      account: "",
      userIP: "",
      chargeFee: 5000,
    },
    {
      transactionTime: new Date("2021-09-18T09:26:45"),
      transactionType: "Gia hạn",
      servicePackage: "SAODEP",
      subscriberNumber: "84948252190",
      channel: "SYSTEM",
      application: "SYSTEM",
      account: "",
      userIP: "",
      chargeFee: 1000,
    },
    {
      transactionTime: new Date("2021-08-28T15:30:12"),
      transactionType: "Gia hạn",
      servicePackage: "SAODEP",
      subscriberNumber: "84948252190",
      channel: "SYSTEM",
      application: "SYSTEM",
      account: "",
      userIP: "",
      chargeFee: 1000,
    },
    {
      transactionTime: new Date("2021-08-27T12:15:30"),
      transactionType: "Gia hạn",
      servicePackage: "SAODEP",
      subscriberNumber: "84948252190",
      channel: "SYSTEM",
      application: "SYSTEM",
      account: "",
      userIP: "",
      chargeFee: 2000,
    },
    {
      transactionTime: new Date("2021-08-11T19:45:03"),
      transactionType: "Đăng ký",
      servicePackage: "SAODEP",
      subscriberNumber: "84948252190",
      channel: "USSD",
      application: "SUBMAN_PORTAL",
      account: "",
      userIP: "",
      chargeFee: 0,
    },
  ],
  "registration-history": [
    {
      transactionTime: new Date("2022-01-28T22:08:48"),
      transactionType: "Hủy",
      servicePackage: "SAODEP",
      status: "Thành công",
      channel: "CSKH",
      application: "",
      account: "",
      userIP: "",
    },
    {
      transactionTime: new Date("2021-08-11T19:45:06"),
      transactionType: "Đăng ký",
      servicePackage: "SAODEP",
      status: "Thành công",
      channel: "USSD",
      application: "",
      account: "",
      userIP: "",
    },
  ],
  "usage-history": [
    {
      transactionTime: new Date("2021-10-03T10:15:30"),
      transactionType: "Sử dụng dịch vụ",
      servicePackage: "SAODEP",
      subscriberNumber: "84948252190",
      channel: "APP",
      application: "MOBILE_APP",
      account: "user123",
      userIP: "10.0.0.1",
      chargeFee: 1000,
    },
  ],
  "mo-mt-history": [
    {
      moReceiveTime: "",
      moContent: "",
      moStatus: "",
      moChargeFee: "",
      moRecipientNumber: "",
      mtSendTime: new Date("2021-08-11T19:45:06"),
      mtContent:
        "Mật khẩu dịch vụ EVA DEP của Quý Khách là: n7gsxq. Truy cập http://evadep.net.vn để sử dụng. Để lấy lại mật khẩu soạn MK gửi 1911. Chi tiết LH 02433502098 (cuộc gọi cố định). Trân trọng cảm ơn.",
      servicePackage: "SAODEP",
      mtStatus: "Đã gửi",
      mtChargeFee: "0",
      mtSenderNumber: "1911",
    },
  ],
  "event-subscribers": [
    {
      transactionTime: new Date("2021-10-03T11:20:00"),
      transactionType: "Tham gia event",
      servicePackage: "SAODEP",
      subscriberNumber: "84948252190",
      channel: "WEB",
      application: "EVENT_PORTAL",
      account: "event_user",
      userIP: "172.16.0.50",
      chargeFee: 0,
    },
  ],
};

const searchData = () => {
  // Mock API call - in real app, this would call actual API
  const data = mockData[activeTab.value] || [];
  store.updateTableData(activeTab.value, data);

  // Calculate total for summary (only for charge-history tab)
  if (activeTab.value === "charge-history") {
    const total = data.reduce((sum, item) => sum + (item.chargeFee || 0), 0);
    store.updateSummaryData(activeTab.value, { total });
  } else {
    store.updateSummaryData(activeTab.value, { total: 0 });
  }
};

const formatDateTime = (date) => {
  return new Date(date).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

// Load initial data
onMounted(() => {
  searchData();
});

// Watch for tab changes to load appropriate data
watch(activeTab, () => {
  searchData();
});
</script>

<style scoped>
.service-usage-page {
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

.sub-nav {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
}

.sub-nav-btn {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s;
  white-space: nowrap;
  font-size: 0.875rem;
}

.sub-nav-btn:hover {
  color: var(--text-primary);
}

.sub-nav-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.tab-content {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.filter-section {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-hover);
}

.filter-row {
  display: flex;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.filter-group label {
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background: var(--primary-dark);
}

.search-icon {
  font-size: 1rem;
}

.table-section {
  overflow-x: auto;
}

.table-container {
  min-width: 1200px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid var(--border-color);
}

.data-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
}

.data-table td {
  color: var(--text-primary);
}

.data-table tbody tr:hover {
  background: var(--bg-hover);
}

.summary-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-hover);
}

.total-charge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.total-label {
  font-weight: 500;
  color: var(--text-primary);
}

.total-value {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 1.125rem;
}

.pagination {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  background: var(--bg-page);
  color: var(--text-primary);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.page-btn:hover {
  background: var(--bg-hover);
}

.page-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
  }

  .sub-nav {
    flex-direction: column;
  }

  .sub-nav-btn {
    text-align: left;
  }

  .summary-section {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
