import { ref, computed } from 'vue'

// Types
interface User {
  id: number
  phone: string
  email: string
  fullName: string
  role: string
  isPhoneVerified: boolean
  isEmailVerified: boolean
  avatar: string | null
  address: string | null
  dateOfBirth: string | null
  gender: string | null
  lastLogin: string
  createdAt: string
}

interface LoginResponse {
  success: boolean
  message: string
  token: string
  user: User
}

interface RegisterResponse {
  success: boolean
  message: string
  token: string
  user: User
}

interface ApiResponse {
  success: boolean
  message?: string
  error?: string
  data?: User
}

// State
const user = ref<User | null>(null)
const token = ref<string | null>(null)
const isLoading = ref(false)

// Computed
const isAuthenticated = computed(() => !!token.value && !!user.value)
const isAdmin = computed(() => user.value?.role === 'admin')

import { API_CONFIG, STORAGE_KEYS } from '~/utils/config'

// API Base URL
const API_BASE_URL = API_CONFIG.BASE_URL

// Helper function để tạo headers
const createHeaders = (includeAuth = true) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (includeAuth && token.value) {
    headers['Authorization'] = `Bearer ${token.value}`
  }
  
  return headers
}

// Helper function để handle API calls
const apiCall = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: createHeaders(options.method !== 'POST' || url.includes('/auth/')),
  })

  const data = await response.json()

  if (!response.ok) {
    // Throw error with API response data
    const error = new Error(data.error || data.message || 'Có lỗi xảy ra')
    ;(error as any).response = { data, status: response.status }
    throw error
  }

  return data
}

// Auth functions
export const useAuth = () => {
  // Initialize auth state from localStorage
  const initializeAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
      const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER)
      
      if (savedToken && savedUser) {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      }
    }
  }

  // Save auth state to localStorage
  const saveAuthState = (newToken: string, newUser: User) => {
    if (process.client) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken)
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(newUser))
    }
    token.value = newToken
    user.value = newUser
  }

  // Clear auth state
  const clearAuthState = () => {
    if (process.client) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
    }
    token.value = null
    user.value = null
  }

  // Send registration OTP
  const sendRegistrationOTP = async (phone: string): Promise<ApiResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<ApiResponse>('/auth/send-registration-otp', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      })
      return response
    } finally {
      isLoading.value = false
    }
  }

  // Register user
  const register = async (data: {
    phone: string
    otp: string
    fullName: string
    email: string
    password: string
  }): Promise<RegisterResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<RegisterResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      
      if (response.success) {
        saveAuthState(response.token, response.user)
      }
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // Send login OTP
  const sendLoginOTP = async (phone: string): Promise<ApiResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<ApiResponse>('/auth/send-login-otp', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      })
      return response
    } finally {
      isLoading.value = false
    }
  }

  // Login with OTP
  const loginWithOTP = async (phone: string, otp: string): Promise<LoginResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<LoginResponse>('/auth/login-otp', {
        method: 'POST',
        body: JSON.stringify({ phone, otp }),
      })
      
      if (response.success) {
        saveAuthState(response.token, response.user)
      }
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // Login with password
  const loginWithPassword = async (phone: string, password: string): Promise<LoginResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone, password }),
      })
      
      if (response.success) {
        saveAuthState(response.token, response.user)
      }
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // Get current user
  const getCurrentUser = async (): Promise<User> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; data: User }>('/auth/me', {
        method: 'GET',
      })
      
      if (response.success && response.data) {
        user.value = response.data
        if (process.client) {
          localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(response.data))
        }
      }
      
      return response.data
    } finally {
      isLoading.value = false
    }
  }

  // Update profile
  const updateProfile = async (data: {
    fullName?: string
    email?: string
    address?: string
    dateOfBirth?: string
    gender?: string
  }): Promise<ApiResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<ApiResponse>('/auth/update-profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      })
      
      if (response.success && response.data) {
        user.value = response.data
        if (process.client) {
          localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(response.data))
        }
      }
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = async (): Promise<void> => {
    isLoading.value = true
    try {
      await apiCall('/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuthState()
      isLoading.value = false
    }
  }

  // Initialize auth on mount
  if (process.client) {
    initializeAuth()
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    isAuthenticated,
    isAdmin,
    
    // Methods
    sendRegistrationOTP,
    register,
    sendLoginOTP,
    loginWithOTP,
    loginWithPassword,
    getCurrentUser,
    updateProfile,
    logout,
    clearAuthState,
  }
} 