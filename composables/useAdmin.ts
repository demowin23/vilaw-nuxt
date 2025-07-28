import { ref, readonly } from 'vue'
import { API_CONFIG } from '~/utils/config'

// Types
interface AdminUser {
  id: number
  phone: string
  email: string
  fullName: string
  role: string
  isActive: boolean
  isPhoneVerified: boolean
  isEmailVerified: boolean
  avatar: string | null
  address: string | null
  dateOfBirth: string | null
  gender: string | null
  lastLogin: string
  createdAt: string
  updatedAt: string
}

interface AdminAction {
  id: number
  action_type: 'create_user' | 'update_user' | 'delete_user' | 'change_role'
  description: string
  admin_id: number
  target_user_id: number
  created_at: string
}

interface UsersResponse {
  success: boolean
  count: number
  total: number
  data: AdminUser[]
}

interface AdminActionsResponse {
  success: boolean
  count: number
  total: number
  data: AdminAction[]
}

interface CreateUserData {
  phone: string
  email: string
  fullName: string
  password: string
  role: 'admin' | 'lawyer' | 'user' | 'collaborator'
  address?: string
  dateOfBirth?: string
  gender?: string
}

interface UpdateUserData {
  fullName?: string
  role?: string
  isActive?: boolean
  email?: string
  address?: string
  dateOfBirth?: string
  gender?: string
}

// State
const isLoading = ref(false)

// Helper function để tạo headers với admin token
const createAdminHeaders = () => {
  const token = localStorage.getItem('auth_token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

// Helper function để handle API calls
const adminApiCall = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
    ...options,
    headers: createAdminHeaders(),
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.error || data.message || 'Có lỗi xảy ra')
    ;(error as any).response = { data, status: response.status }
    throw error
  }

  return data
}

export const useAdmin = () => {
  // 1. Lấy danh sách users
  const getUsers = async (params: {
    role?: 'admin' | 'lawyer' | 'user' | 'collaborator'
    is_active?: boolean
    limit?: number
    offset?: number
    search?: string
  } = {}): Promise<UsersResponse> => {
    isLoading.value = true
    try {
      const queryParams = new URLSearchParams()
      
      if (params.role) queryParams.append('role', params.role)
      if (params.is_active !== undefined) queryParams.append('is_active', params.is_active.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.offset) queryParams.append('offset', params.offset.toString())
      if (params.search) queryParams.append('search', params.search)

      const url = `/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      
      const response = await adminApiCall<UsersResponse>(url, {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 2. Tạo user mới
  const createUser = async (userData: CreateUserData): Promise<{ success: boolean; data: AdminUser; message: string }> => {
    isLoading.value = true
    try {
      const response = await adminApiCall<{ success: boolean; data: AdminUser; message: string }>('/admin/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 3. Cập nhật user
  const updateUser = async (userId: number, userData: UpdateUserData): Promise<{ success: boolean; data: AdminUser; message: string }> => {
    isLoading.value = true
    try {
      const response = await adminApiCall<{ success: boolean; data: AdminUser; message: string }>(`/admin/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 4. Xóa user
  const deleteUser = async (userId: number): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true
    try {
      const response = await adminApiCall<{ success: boolean; message: string }>(`/admin/users/${userId}`, {
        method: 'DELETE'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 5. Thay đổi role user
  const changeUserRole = async (userId: number, role: 'admin' | 'lawyer' | 'user' | 'collaborator'): Promise<{ success: boolean; data: AdminUser; message: string }> => {
    isLoading.value = true
    try {
      const response = await adminApiCall<{ success: boolean; data: AdminUser; message: string }>(`/admin/users/${userId}/change-role`, {
        method: 'PUT',
        body: JSON.stringify({ role })
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 6. Lấy lịch sử admin actions
  const getAdminActions = async (params: {
    action_type?: 'create_user' | 'update_user' | 'delete_user' | 'change_role'
    limit?: number
    offset?: number
  } = {}): Promise<AdminActionsResponse> => {
    isLoading.value = true
    try {
      const queryParams = new URLSearchParams()
      
      if (params.action_type) queryParams.append('action_type', params.action_type)
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.offset) queryParams.append('offset', params.offset.toString())

      const url = `/admin/actions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      
      const response = await adminApiCall<AdminActionsResponse>(url, {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    isLoading: readonly(isLoading),
    
    // Methods
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    changeUserRole,
    getAdminActions
  }
} 