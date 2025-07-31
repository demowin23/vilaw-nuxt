import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getApiConfig } from '~/utils/config'

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

interface VideoParams {
  type?: string
  age_group?: 'all' | '13+' | '16+' | '18+'
  hashtag?: string
  sort_by?: 'ts_create' | 'view_count' | 'like_count' | 'dislike_count' | 'title' | 'duration'
  sort_order?: 'asc' | 'desc'
  limit?: number
  offset?: number
  search?: string
  is_featured?: boolean
}

export const useVideoStore = defineStore('video', () => {
  // State
  const mostViewedVideos = ref<VideoLifeLaw[]>([])
  const allVideos = ref<VideoLifeLaw[]>([])
  const currentVideo = ref<VideoLifeLaw | null>(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/images/n.png'
    if (imagePath.startsWith('http')) return imagePath
    const config = getApiConfig()
    return `${config.BASE_URL.replace('/api/v1', '')}${imagePath}`
  }

  // Actions
  const fetchMostViewedVideos = async (limit = 10) => {
    try {
      loading.value = true
      error.value = null
      
      const config = getApiConfig()
      const response = await fetch(`${config.BASE_URL}/video-life-law/most-viewed?limit=${limit}`)
      const data = await response.json()
      
      if (data.success && data.data) {
        mostViewedVideos.value = data.data.map((video: VideoLifeLaw) => ({
          ...video,
          thumbnail: getImageUrl(video.thumbnail)
        }))
      }
      
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching most viewed videos:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchVideosByType = async (type: string, limit = 6) => {
    try {
      loading.value = true
      error.value = null
      
      const config = getApiConfig()
      const response = await fetch(`${config.BASE_URL}/video-life-law?type=${type}&limit=${limit}&sort_by=ts_create&sort_order=desc`)
      const data = await response.json()
      
      if (data.success && data.data) {
        return data.data.map((video: VideoLifeLaw) => ({
          ...video,
          thumbnail: getImageUrl(video.thumbnail)
        }))
      }
      
      return []
    } catch (err: any) {
      error.value = err.message
      console.error(`Error fetching videos for type ${type}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchAllVideos = async (params: VideoParams = {}) => {
    try {
      loading.value = true
      error.value = null
      
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

      const config = getApiConfig()
      const url = `${config.BASE_URL}/video-life-law${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success && data.data) {
        allVideos.value = data.data.map((video: VideoLifeLaw) => ({
          ...video,
          thumbnail: getImageUrl(video.thumbnail)
        }))
      }
      
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching all videos:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchVideoById = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      
      const config = getApiConfig()
      const response = await fetch(`${config.BASE_URL}/video-life-law/${id}`)
      const data = await response.json()
      
      if (data.success && data.data) {
        currentVideo.value = {
          ...data.data,
          thumbnail: getImageUrl(data.data.thumbnail)
        }
      }
      
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching video by ID:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    mostViewedVideos.value = []
    allVideos.value = []
    currentVideo.value = null
    loading.value = false
    error.value = null
  }

  return {
    // State
    mostViewedVideos,
    allVideos,
    currentVideo,
    loading,
    error,
    
    // Getters
    getImageUrl,
    
    // Actions
    fetchMostViewedVideos,
    fetchVideosByType,
    fetchAllVideos,
    fetchVideoById,
    clearError,
    resetState
  }
}) 