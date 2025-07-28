import { ref } from 'vue'
import { API_CONFIG } from '~/utils/config'

interface LegalField {
  id: number
  name: string
  slug: string
  description?: string
  created_at: string
  updated_at: string
}

interface LegalFieldDropdown {
  value: number
  label: string
}

export const useLegalFields = () => {
  const legalFields = ref<LegalField[]>([])
  const legalFieldsDropdown = ref<LegalFieldDropdown[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // Helper function để tạo headers
  const createHeaders = (includeAuth = true) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (includeAuth) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }
    return headers
  }

  // Helper function để handle API calls
  const apiCall = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const headers = createHeaders(true) // Luôn gửi token cho tất cả requests
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      ...options,
      headers,
    })
    const data = await response.json()
    if (!response.ok) {
      const error = new Error(data.error || data.message || 'Có lỗi xảy ra')
      ;(error as any).response = { data, status: response.status }
      throw error
    }
    return data
  }

  // Lấy danh sách lĩnh vực pháp luật
  const getLegalFields = async () => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall('/legal-fields')
      legalFields.value = response.data || []
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Lấy danh sách lĩnh vực cho dropdown
  const getLegalFieldsDropdown = async () => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall('/legal-fields/dropdown')
      legalFieldsDropdown.value = response.data || []
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Lấy lĩnh vực theo ID
  const getLegalFieldById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/legal-fields/${id}`)
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Lấy lĩnh vực theo slug
  const getLegalFieldBySlug = async (slug: string) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/legal-fields/slug/${slug}`)
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Tạo lĩnh vực mới
  const createLegalField = async (data: Partial<LegalField>) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall('/legal-fields', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Cập nhật lĩnh vực
  const updateLegalField = async (id: number, data: Partial<LegalField>) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/legal-fields/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Xóa mềm lĩnh vực
  const deleteLegalField = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/legal-fields/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Xóa vĩnh viễn lĩnh vực
  const deleteLegalFieldPermanent = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/legal-fields/${id}/permanent`, {
        method: 'DELETE'
      })
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    legalFields,
    legalFieldsDropdown,
    loading,
    error,
    getLegalFields,
    getLegalFieldsDropdown,
    getLegalFieldById,
    getLegalFieldBySlug,
    createLegalField,
    updateLegalField,
    deleteLegalField,
    deleteLegalFieldPermanent
  }
} 