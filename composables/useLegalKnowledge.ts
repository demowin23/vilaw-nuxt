import { ref, readonly } from 'vue'
import { API_CONFIG } from '~/utils/config'

// Types
interface LegalKnowledge {
  id: number
  title: string
  image: string
  summary: string
  content: string
  category: string
  author: string
  status: 'draft' | 'published' | 'archived'
  view_count: number
  like_count: number
  created_by_name: string
  is_featured: boolean
  is_active: boolean
  ts_create: string
  ts_update: string
}

interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

interface LegalKnowledgeResponse {
  success: boolean
  data: LegalKnowledge[]
  count: number
  total: number
  pagination: {
    limit: number
    offset: number
    total: number
  }
}

interface CategoriesResponse {
  success: boolean
  data: Category[]
}

interface CreateLegalKnowledgeData {
  title: string
  image?: string
  summary?: string
  content: string
  category: string
  author: string
  status?: 'draft' | 'published' | 'archived'
  is_featured?: boolean
}

interface UpdateLegalKnowledgeData {
  title?: string
  image?: string
  summary?: string
  content?: string
  category?: string
  author?: string
  status?: 'draft' | 'published' | 'archived'
  is_featured?: boolean
}

// State
const isLoading = ref(false)

// Helper function để tạo headers
const createHeaders = (includeAuth = true, isFormData = false) => {
  const headers: Record<string, string> = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (includeAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Helper function để handle API calls
const apiCall = async <T>(url: string, options: RequestInit = {}, isFormData = false, isAdmin = false): Promise<T> => {
  const headers = createHeaders(isAdmin, isFormData);
  const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
    ...options,
    headers,
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || data.message || 'Có lỗi xảy ra');
    ;(error as any).response = { data, status: response.status };
    throw error;
  }
  return data;
};

export const useLegalKnowledge = () => {
  // 1. Lấy danh sách bài viết
  const getLegalKnowledge = async (params: {
    category?: string
    isPending?: boolean
    limit?: number
    offset?: number
    search?: string
    is_featured?: boolean
    include_pending?: boolean
    isAdmin?: boolean
  } = {}): Promise<LegalKnowledgeResponse> => {
    isLoading.value = true
    try {
      const queryParams = new URLSearchParams()
      
      if (params.category) queryParams.append('category', params.category)
      if (params.isPending) queryParams.append('isPending', params.isPending.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.offset) queryParams.append('offset', params.offset.toString())
      if (params.search) queryParams.append('search', params.search)
      if (params.is_featured !== undefined) queryParams.append('is_featured', params.is_featured.toString())
      if (params.include_pending !== undefined) queryParams.append('include_pending', params.include_pending.toString())
      
      // Nếu là admin thì dùng endpoint admin, ngược lại dùng endpoint thường
      const baseUrl = params.isAdmin ? '/legal-knowledge/admin/all' : '/legal-knowledge'
      const url = `${baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      
      const response = await apiCall<LegalKnowledgeResponse>(url, {
        method: 'GET'
      }, false, params.isAdmin)
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 2. Lấy danh sách categories
  const getCategories = async (): Promise<CategoriesResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<CategoriesResponse>('/legal-knowledge/categories', {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 3. Lấy chi tiết bài viết
  const getLegalKnowledgeById = async (id: number): Promise<{ success: boolean; data: LegalKnowledge }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; data: LegalKnowledge }>(`/legal-knowledge/${id}`, {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 4. Tạo bài viết mới (Admin only)
  const createLegalKnowledge = async (data: CreateLegalKnowledgeData|FormData, isFormData = false): Promise<{ success: boolean; message: string; data: LegalKnowledge }> => {
    isLoading.value = true;
    try {
      const response = await apiCall<{ success: boolean; message: string; data: LegalKnowledge }>(
        '/legal-knowledge',
        {
          method: 'POST',
          body: isFormData ? (data as FormData) : JSON.stringify(data),
        },
        isFormData
      );
      return response;
    } finally {
      isLoading.value = false;
    }
  };

  // 5. Cập nhật bài viết (Admin only)
  const updateLegalKnowledge = async (id: number, data: UpdateLegalKnowledgeData|FormData, isFormData = false): Promise<{ success: boolean; message: string; data: LegalKnowledge }> => {
    isLoading.value = true;
    try {
      const response = await apiCall<{ success: boolean; message: string; data: LegalKnowledge }>(
        `/legal-knowledge/${id}`,
        {
          method: 'PUT',
          body: isFormData ? (data as FormData) : JSON.stringify(data),
        },
        isFormData
      );
      return response;
    } finally {
      isLoading.value = false;
    }
  };

  // 6. Xóa bài viết (Admin only)
  const deleteLegalKnowledge = async (id: number): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string }>(`/legal-knowledge/${id}`, {
        method: 'DELETE'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 7. Duyệt/từ chối bài viết (Admin only)
  const approveLegalKnowledge = async (id: number, is_approved: boolean): Promise<{ success: boolean; message: string; data: LegalKnowledge }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string; data: LegalKnowledge }>(`/legal-knowledge/admin/${id}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ is_approved })
      }, false, true) // isAdmin = true để gửi token
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    isLoading: readonly(isLoading),
    
    // Methods
    getLegalKnowledge,
    getCategories,
    getLegalKnowledgeById,
    createLegalKnowledge,
    updateLegalKnowledge,
    deleteLegalKnowledge,
    approveLegalKnowledge
  }
} 