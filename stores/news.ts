import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getApiConfig, getImageUrl } from '~/utils/config'

interface NewsParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  sortBy?: string
  sortOrder?: string
}

export const useNewsStore = defineStore('news', () => {
  // State
  const allNews = ref([])
  const featuredNews = ref([])
  const currentNews = ref(null)
  const relatedNews = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const getImage = (image: string) => {
    if (!image) return '/images/bai-tap-luat.webp'
    return getImageUrl(image)
  }

  // Actions
  const fetchAllNews = async (params: NewsParams = { page: 1, limit: 20 }) => {
    try {
      loading.value = true
      error.value = null
      
      const queryParams = new URLSearchParams({
        page: (params.page || 1).toString(),
        limit: (params.limit || 20).toString(),
      })

      if (params.search) queryParams.append('search', params.search)
      if (params.category) queryParams.append('category', params.category)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)

      const config = getApiConfig()
      const response = await fetch(`${config.BASE_URL}/legal-news?${queryParams}`)
      const data = await response.json()
      
      if (data.data) {
        allNews.value = data.data.map((item: any) => ({
          id: item.id,
          thumbnail: item.image,
          title: item.title,
          excerpt: item.description,
          category: item.category || 'Pháp luật',
          date: item.created_at,
          views: item.view_count || 0,
        }))
      }
      
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching all news:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedNews = async (limit = 5) => {
    try {
      loading.value = true
      error.value = null
      
      const config = getApiConfig()
      const response = await fetch(`${config.BASE_URL}/legal-news/popular?limit=${limit}`)
      const data = await response.json()
      
      if (data.data) {
        featuredNews.value = data.data.map((item: any) => ({
          ...item,
          image: item.image,
        }))
      }
      
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching featured news:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchNewsDetail = async (id: string | number) => {
    try {
      loading.value = true
      error.value = null
      
      const config = getApiConfig()
      const response = await fetch(`${config.BASE_URL}/legal-news/${id}`)
      const data = await response.json()
      
      if (data.data) {
        currentNews.value = {
          ...data.data,
          image: data.data.image,
        }
      }
      
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching news detail:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchRelatedNews = async (category: string, excludeId: number, limit = 4) => {
    try {
      loading.value = true
      error.value = null
      
      const queryParams = new URLSearchParams({
        page: '1',
        limit: limit.toString(),
        category: category || 'phap-luat'
      })

      const config = getApiConfig()
      const response = await fetch(`${config.BASE_URL}/legal-news?${queryParams}`)
      const data = await response.json()
      
      if (data.data) {
        relatedNews.value = data.data
          .filter((item: any) => item.id !== excludeId)
          .map((item: any) => ({
            ...item,
            image: item.image,
          }))
      }
      
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching related news:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchNews = async (query: string, params: NewsParams = { page: 1, limit: 20 }) => {
    try {
      loading.value = true
      error.value = null
      
      const queryParams = new URLSearchParams({
        page: (params.page || 1).toString(),
        limit: (params.limit || 20).toString(),
        search: query
      })

      const config = getApiConfig()
      const response = await fetch(`${config.BASE_URL}/legal-news/search?${queryParams}`)
      const data = await response.json()
      
      if (data.data) {
        allNews.value = data.data.map((item: any) => ({
          id: item.id,
          thumbnail: item.image,
          title: item.title,
          excerpt: item.description,
          category: item.category || 'Pháp luật',
          date: item.created_at,
          views: item.view_count || 0,
        }))
      }
      
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error searching news:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    allNews.value = []
    featuredNews.value = []
    currentNews.value = null
    relatedNews.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    allNews,
    featuredNews,
    currentNews,
    relatedNews,
    loading,
    error,
    
    // Getters
    getImage,
    
    // Actions
    fetchAllNews,
    fetchFeaturedNews,
    fetchNewsDetail,
    fetchRelatedNews,
    searchNews,
    clearError,
    resetState
  }
}) 