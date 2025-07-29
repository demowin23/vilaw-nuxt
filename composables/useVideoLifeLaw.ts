import { ref, readonly } from 'vue'
import { API_CONFIG } from '~/utils/config'

// Types
interface VideoLifeLaw {
  id: number
  title: string
  thumbnail: string
  description: string
  video: string
  duration: number
  view_count: number
  like_count: number
  dislike_count: number
  hashtags: string[]
  user_action: 'like' | 'dislike' | null
  creator_name: string
  age_group: 'all' | '13+' | '16+' | '18+'
  type: string
  is_featured: boolean
  created_by_name: string
  is_active: boolean
  ts_create: string
  ts_update: string
}

interface VideoType {
  id: number
  name: string
  slug: string
  description?: string
}

interface AgeGroup {
  id: number
  name: string
  slug: string
  description?: string
}

interface VideoComment {
  id: number
  content: string
  user_name: string
  user_avatar: string
  user_role: string
  like_count: number
  user_liked: boolean
  reply_count: number
  replies: VideoComment[]
  ts_create: string
}

interface PopularHashtag {
  hashtag: string
  count: number
}

interface VideoLifeLawResponse {
  success: boolean
  data: VideoLifeLaw[]
  count: number
  total: number
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface VideoTypesResponse {
  success: boolean
  data: VideoType[]
}

interface AgeGroupsResponse {
  success: boolean
  data: AgeGroup[]
}

interface CommentsResponse {
  success: boolean
  data: VideoComment[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface PopularHashtagsResponse {
  success: boolean
  data: PopularHashtag[]
}

interface CreateVideoLifeLawData {
  title: string
  thumbnail?: File
  description?: string
  video?: File
  duration?: number
  age_group?: 'all' | '13+' | '16+' | '18+'
  type?: string
  hashtags?: string
  is_featured?: boolean
}

interface UpdateVideoLifeLawData {
  title?: string
  thumbnail?: File
  description?: string
  video?: File
  duration?: number
  age_group?: 'all' | '13+' | '16+' | '18+'
  type?: string
  hashtags?: string
  is_featured?: boolean
}

// State
const isLoading = ref(false)

// Helper function để tạo headers
const createHeaders = (includeAuth = true, isFormData = false) => {
  const headers: Record<string, string> = {}
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
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
const apiCall = async <T>(url: string, options: RequestInit = {}, isFormData = false, isAdmin = false): Promise<T> => {
  const headers = createHeaders(isAdmin, isFormData)
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

export const useVideoLifeLaw = () => {
  // 1. Lấy danh sách video
  const getVideoLifeLaw = async (params: {
    type?: string
    age_group?: 'all' | '13+' | '16+' | '18+'
    hashtag?: string
    sort_by?: 'ts_create' | 'view_count' | 'like_count' | 'dislike_count' | 'title' | 'duration'
    sort_order?: 'asc' | 'desc'
    limit?: number
    offset?: number
    search?: string
    is_featured?: boolean
    isAdmin?: boolean
    isPending?: boolean
  } = {}): Promise<VideoLifeLawResponse> => {
    isLoading.value = true
    try {
      const queryParams = new URLSearchParams()
      
      if (params.type) queryParams.append('type', params.type)
      if (params.age_group) queryParams.append('age_group', params.age_group)
      if (params.hashtag) queryParams.append('hashtag', params.hashtag)
      if (params.sort_by) queryParams.append('sort_by', params.sort_by)
      if (params.sort_order) queryParams.append('sort_order', params.sort_order)
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.offset) queryParams.append('offset', params.offset.toString())
      if (params.search) queryParams.append('search', params.search)
      if (params.is_featured !== undefined) queryParams.append('is_featured', params.is_featured.toString())
      if (params.isPending !== undefined) queryParams.append('isPending', params.isPending.toString())
      // Nếu là admin thì dùng endpoint admin, ngược lại dùng endpoint thường
      const baseUrl = params.isAdmin ? '/video-life-law/admin/all' : '/video-life-law'
      const url = `${baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      
      const response = await apiCall<VideoLifeLawResponse>(url, {
        method: 'GET'
      }, false, params.isAdmin)
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 2. Lấy video theo ID
  const getVideoLifeLawById = async (id: number): Promise<{ success: boolean; data: VideoLifeLaw }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; data: VideoLifeLaw }>(`/video-life-law/${id}`, {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 3. Lấy danh sách loại video
  const getVideoTypes = async (): Promise<VideoTypesResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<VideoTypesResponse>('/video-life-law/types', {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 4. Lấy danh sách độ tuổi
  const getAgeGroups = async (): Promise<AgeGroupsResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<AgeGroupsResponse>('/video-life-law/age-groups', {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 5. Tạo video mới
  const createVideoLifeLaw = async (data: CreateVideoLifeLawData|FormData, isFormData = false): Promise<{ success: boolean; message: string; data: VideoLifeLaw }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string; data: VideoLifeLaw }>(
        '/video-life-law',
        {
          method: 'POST',
          body: isFormData ? (data as FormData) : JSON.stringify(data),
        },
        isFormData,
        true // isAdmin = true
      )
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 6. Cập nhật video
  const updateVideoLifeLaw = async (id: number, data: UpdateVideoLifeLawData|FormData, isFormData = false): Promise<{ success: boolean; message: string; data: VideoLifeLaw }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string; data: VideoLifeLaw }>(
        `/video-life-law/${id}`,
        {
          method: 'PUT',
          body: isFormData ? (data as FormData) : JSON.stringify(data),
        },
        isFormData,
        true // isAdmin = true
      )
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 7. Xóa video
  const deleteVideoLifeLaw = async (id: number): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string }>(`/video-life-law/${id}`, {
        method: 'DELETE'
      }, false, true) // isAdmin = true
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 8. Like/Dislike video
  const likeVideo = async (id: number, action: 'like' | 'dislike'): Promise<{ success: boolean; message: string; data: { action: string } }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string; data: { action: string } }>(`/video-life-law/${id}/like`, {
        method: 'POST',
        body: JSON.stringify({ action })
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 9. Lấy danh sách comment
  const getComments = async (videoId: number, params: { page?: number; limit?: number } = {}): Promise<CommentsResponse> => {
    isLoading.value = true
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())

      const url = `/video-life-law/${videoId}/comments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      
      const response = await apiCall<CommentsResponse>(url, {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 10. Thêm comment
  const addComment = async (videoId: number, content: string, parentId?: number): Promise<{ success: boolean; message: string; data: VideoComment }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string; data: VideoComment }>(`/video-life-law/${videoId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          content,
          parent_id: parentId || null
        })
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 11. Like/Unlike comment
  const likeComment = async (commentId: number): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string }>(`/video-life-law/comments/${commentId}/like`, {
        method: 'POST'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 12. Xóa comment
  const deleteComment = async (commentId: number): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string }>(`/video-life-law/comments/${commentId}`, {
        method: 'DELETE'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 13. Lấy hashtags phổ biến
  const getPopularHashtags = async (): Promise<PopularHashtagsResponse> => {
    isLoading.value = true
    try {
      const response = await apiCall<PopularHashtagsResponse>('/video-life-law/hashtags/popular', {
        method: 'GET'
      })
      
      return response
    } finally {
      isLoading.value = false
    }
  }

  // 14. Duyệt/từ chối video (Admin only)
  const approveVideo = async (id: number, is_approved: boolean): Promise<{ success: boolean; message: string; data: VideoLifeLaw }> => {
    isLoading.value = true
    try {
      const response = await apiCall<{ success: boolean; message: string; data: VideoLifeLaw }>(`/video-life-law/admin/${id}/approve`, {
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
    getVideoLifeLaw,
    getVideoLifeLawById,
    getVideoTypes,
    getAgeGroups,
    createVideoLifeLaw,
    updateVideoLifeLaw,
    deleteVideoLifeLaw,
    approveVideo,
    likeVideo,
    getComments,
    addComment,
    likeComment,
    deleteComment,
    getPopularHashtags
  }
} 