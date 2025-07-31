<template>
  <div class="reports-page">
    <div class="page-header">
      <h1>Báo cáo thống kê</h1>
      <p>Xem báo cáo và thống kê về hoạt động dịch vụ</p>
    </div>

    <!-- Sub-navigation tabs -->
    <div class="sub-nav">
      <button
        :class="['sub-nav-btn', { active: activeTab === 'revenue' }]"
        @click="activeTab = 'revenue'"
      >
        Thống kê doanh thu
      </button>
      <button
        :class="['sub-nav-btn', { active: activeTab === 'registration' }]"
        @click="activeTab = 'registration'"
      >
        Thống kê đăng ký/Hủy
      </button>
    </div>

    <!-- Revenue Statistics Tab -->
    <div v-if="activeTab === 'revenue'" class="tab-content">
      <!-- Date Range Filters -->
      <div class="filter-section">
        <div class="filter-row">
          <div class="filter-group">
            <label for="start-date">Thời gian bắt đầu:</label>
            <input
              type="date"
              id="start-date"
              v-model="startDate"
              class="form-input"
            />
          </div>
          <div class="filter-group">
            <label for="end-date">Thời gian kết thúc:</label>
            <input
              type="date"
              id="end-date"
              v-model="endDate"
              class="form-input"
            />
          </div>
          <button @click="searchRevenue" class="search-btn">
            <span class="search-icon">🔍</span>
            Tra cứu
          </button>
        </div>
      </div>

      <!-- Revenue Statistics Table -->
      <div class="table-section">
        <div class="table-container">
          <table class="revenue-table">
            <thead>
              <tr>
                <th rowspan="2">Thời gian</th>
                <th colspan="2">GÓI SAO ĐẸP (1000đ/ngày)</th>
                <th colspan="2">GÓI SAO ĐẸP (2000đ/ngày)</th>
                <th colspan="2">GÓI SAO ĐẸP (5000đ/ngày)</th>
                <th colspan="2">Tổng ngày</th>
              </tr>
              <tr>
                <th>Số lượt</th>
                <th>Doanh thu</th>
                <th>Số lượt</th>
                <th>Doanh thu</th>
                <th>Số lượt</th>
                <th>Doanh thu</th>
                <th>Số lượt</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in revenueData" :key="index">
                <td>{{ formatDate(row.date) }}</td>
                <td>{{ formatNumber(row.saoDep1000.count) }}</td>
                <td>{{ formatCurrency(row.saoDep1000.revenue) }}</td>
                <td>{{ formatNumber(row.saoDep2000.count) }}</td>
                <td>{{ formatCurrency(row.saoDep2000.revenue) }}</td>
                <td>{{ formatNumber(row.saoDep5000.count) }}</td>
                <td>{{ formatCurrency(row.saoDep5000.revenue) }}</td>
                <td>{{ formatNumber(row.dailyTotal.count) }}</td>
                <td>{{ formatCurrency(row.dailyTotal.revenue) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td><strong>Tổng cộng</strong></td>
                <td>
                  <strong>{{ formatNumber(totals.saoDep1000.count) }}</strong>
                </td>
                <td>
                  <strong>{{
                    formatCurrency(totals.saoDep1000.revenue)
                  }}</strong>
                </td>
                <td>
                  <strong>{{ formatNumber(totals.saoDep2000.count) }}</strong>
                </td>
                <td>
                  <strong>{{
                    formatCurrency(totals.saoDep2000.revenue)
                  }}</strong>
                </td>
                <td>
                  <strong>{{ formatNumber(totals.saoDep5000.count) }}</strong>
                </td>
                <td>
                  <strong>{{
                    formatCurrency(totals.saoDep5000.revenue)
                  }}</strong>
                </td>
                <td>
                  <strong>{{ formatNumber(totals.grandTotal.count) }}</strong>
                </td>
                <td>
                  <strong>{{
                    formatCurrency(totals.grandTotal.revenue)
                  }}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- Registration Statistics Tab -->
    <div v-if="activeTab === 'registration'" class="tab-content">
      <div class="placeholder-content">
        <h3>Thống kê đăng ký/Hủy</h3>
        <p>Nội dung thống kê đăng ký/hủy sẽ được hiển thị ở đây</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const activeTab = ref("revenue");
const startDate = ref("2021-10-01");
const endDate = ref("2021-10-12");

// Mock revenue data based on the image
const revenueData = ref([
  {
    date: new Date("2021-10-11"),
    saoDep1000: { count: 0, revenue: 0 },
    saoDep2000: { count: 0, revenue: 0 },
    saoDep5000: { count: 1099, revenue: 5495000 },
    dailyTotal: { count: 2545, revenue: 12725000 },
  },
  {
    date: new Date("2021-10-10"),
    saoDep1000: { count: 133, revenue: 133000 },
    saoDep2000: { count: 132, revenue: 264000 },
    saoDep5000: { count: 1470, revenue: 7350000 },
    dailyTotal: { count: 4127, revenue: 18292000 },
  },
  {
    date: new Date("2021-10-09"),
    saoDep1000: { count: 145, revenue: 145000 },
    saoDep2000: { count: 128, revenue: 256000 },
    saoDep5000: { count: 1389, revenue: 6945000 },
    dailyTotal: { count: 3903, revenue: 17292000 },
  },
  {
    date: new Date("2021-10-08"),
    saoDep1000: { count: 156, revenue: 156000 },
    saoDep2000: { count: 142, revenue: 284000 },
    saoDep5000: { count: 1523, revenue: 7615000 },
    dailyTotal: { count: 4158, revenue: 18423000 },
  },
  {
    date: new Date("2021-10-07"),
    saoDep1000: { count: 134, revenue: 134000 },
    saoDep2000: { count: 119, revenue: 238000 },
    saoDep5000: { count: 1412, revenue: 7060000 },
    dailyTotal: { count: 3994, revenue: 17656000 },
  },
]);

const totals = computed(() => {
  const totals = {
    saoDep1000: { count: 0, revenue: 0 },
    saoDep2000: { count: 0, revenue: 0 },
    saoDep5000: { count: 0, revenue: 0 },
    grandTotal: { count: 0, revenue: 0 },
  };

  revenueData.value.forEach((row) => {
    totals.saoDep1000.count += row.saoDep1000.count;
    totals.saoDep1000.revenue += row.saoDep1000.revenue;
    totals.saoDep2000.count += row.saoDep2000.count;
    totals.saoDep2000.revenue += row.saoDep2000.revenue;
    totals.saoDep5000.count += row.saoDep5000.count;
    totals.saoDep5000.revenue += row.saoDep5000.revenue;
    totals.grandTotal.count += row.dailyTotal.count;
    totals.grandTotal.revenue += row.dailyTotal.revenue;
  });

  return totals;
});

const searchRevenue = () => {
  // Mock API call to fetch revenue data
  console.log(
    "Searching revenue data for:",
    startDate.value,
    "to",
    endDate.value
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN");
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

const formatNumber = (number) => {
  return new Intl.NumberFormat("vi-VN").format(number);
};
</script>

<style scoped>
.reports-page {
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
}

.sub-nav-btn {
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s;
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
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input {
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

.revenue-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.revenue-table th,
.revenue-table td {
  padding: 0.75rem;
  text-align: center;
  border: 1px solid var(--border-color);
}

.revenue-table th {
  background: var(--bg-hover);
  font-weight: 600;
  color: var(--text-primary);
  vertical-align: middle;
}

.revenue-table th[rowspan] {
  vertical-align: middle;
}

.revenue-table td {
  color: var(--text-primary);
}

.revenue-table tbody tr:hover {
  background: var(--bg-hover);
}

.total-row {
  background: var(--primary-light);
  font-weight: 600;
}

.total-row td {
  color: var(--primary-color);
}

.placeholder-content {
  padding: 3rem;
  text-align: center;
  color: var(--text-secondary);
}

.placeholder-content h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
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
}
</style>
