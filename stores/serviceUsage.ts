import { defineStore } from 'pinia'

type TabType = 'charge-history' | 'registration-history' | 'usage-history' | 'mo-mt-history' | 'event-subscribers'

interface FilterData {
  subscriberNumber: string
  selectedPackage: string
  startTime: string
  endTime: string
}

interface SummaryData {
  total: number
}

export const useServiceUsageStore = defineStore('serviceUsage', () => {
  // Filter data shared across all tabs
  const filterData = ref<FilterData>({
    subscriberNumber: '0948252190',
    selectedPackage: '',
    startTime: '2021-08-01',
    endTime: '2022-02-11'
  })

  // Table data for each tab
  const tableData = ref<Record<TabType, any[]>>({
    'charge-history': [],
    'registration-history': [],
    'usage-history': [],
    'mo-mt-history': [],
    'event-subscribers': []
  })

  // Summary data for each tab
  const summaryData = ref<Record<TabType, SummaryData>>({
    'charge-history': { total: 104000 },
    'registration-history': { total: 0 },
    'usage-history': { total: 0 },
    'mo-mt-history': { total: 0 },
    'event-subscribers': { total: 0 }
  })

  // Update filter data
  const updateFilterData = (newData: Partial<FilterData>) => {
    filterData.value = { ...filterData.value, ...newData }
  }

  // Update table data for specific tab
  const updateTableData = (tab: TabType, data: any[]) => {
    tableData.value[tab] = data
  }

  // Update summary data for specific tab
  const updateSummaryData = (tab: TabType, data: SummaryData) => {
    summaryData.value[tab] = data
  }

  return {
    filterData: readonly(filterData),
    tableData: readonly(tableData),
    summaryData: readonly(summaryData),
    updateFilterData,
    updateTableData,
    updateSummaryData
  }
}) 