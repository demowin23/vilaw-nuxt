import { defineStore } from 'pinia'

interface UsersStats {
  total_users: number
  user_count: number
  lawyer_count: number
  admin_count: number
  collaborator_count: number
}

interface LegalKnowledgeStats {
  total_articles: number
  published_articles: number
}

interface LegalDocumentsStats {
  total_documents: number
  total_downloads: number
}

interface LegalNewsStats {
  total_news: number
  published_news: number
}

interface VideosStats {
  total_videos: number
  total_video_views: number
}

interface ChatsStats {
  total_conversations: number
  active_conversations: number
}

interface StatsData {
  users: UsersStats
  legalKnowledge: LegalKnowledgeStats
  legalDocuments: LegalDocumentsStats
  legalNews: LegalNewsStats
  videos: VideosStats
  chats: ChatsStats
}

interface ApiResponse {
  success: boolean
  data: StatsData
}

interface StatsState {
  data: StatsData
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

export const useStatsStore = defineStore('stats', {
  state: (): StatsState => ({
    data: {
      users: {
        total_users: 0,
        user_count: 0,
        lawyer_count: 0,
        admin_count: 0,
        collaborator_count: 0
      },
      legalKnowledge: {
        total_articles: 0,
        published_articles: 0
      },
      legalDocuments: {
        total_documents: 0,
        total_downloads: 0
      },
      legalNews: {
        total_news: 0,
        published_news: 0
      },
      videos: {
        total_videos: 0,
        total_video_views: 0
      },
      chats: {
        total_conversations: 0,
        active_conversations: 0
      }
    },
    loading: false,
    error: null,
    lastUpdated: null
  }),

  getters: {
    hasData: (state) => state.lastUpdated !== null,
    isStale: (state) => {
      if (!state.lastUpdated) return true
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      return state.lastUpdated < fiveMinutesAgo
    },
    
    // Computed stats for dashboard display
    dashboardStats: (state) => ({
      users: state.data.users.total_users,
      knowledge: state.data.legalKnowledge.total_articles,
      documents: state.data.legalDocuments.total_documents,
      news: state.data.legalNews.total_news,
      videos: state.data.videos.total_videos,
      chats: state.data.chats.total_conversations
    })
  },

  actions: {
    async fetchOverallStats() {
      try {
        this.loading = true
        this.error = null

        const api = useApi()
        const token = api.getAuthToken()
        
        if (!token) {
          throw new Error('Không có token xác thực')
        }

        const response = await api.get('/stats/overall') as ApiResponse

        // Check if API call was successful
        if (!response.success) {
          throw new Error('API trả về lỗi')
        }

        // Update state with response data
        this.data = response.data
        this.lastUpdated = new Date()
        this.error = null

      } catch (error: any) {
        console.error('Error fetching overall stats:', error)
        
        // Handle different error types
        if (error.status === 401) {
          this.error = 'Token không hợp lệ hoặc đã hết hạn'
        } else if (error.status === 403) {
          this.error = 'Không có quyền truy cập thống kê'
        } else if (error.status === 500) {
          this.error = 'Lỗi server, vui lòng thử lại sau'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'Không thể tải thống kê. Vui lòng thử lại.'
        }
      } finally {
        this.loading = false
      }
    },

    async refreshStats() {
      // Only fetch if data is stale or doesn't exist
      if (this.isStale || !this.hasData) {
        await this.fetchOverallStats()
      }
    },

    clearError() {
      this.error = null
    },

    reset() {
      this.data = {
        users: {
          total_users: 0,
          user_count: 0,
          lawyer_count: 0,
          admin_count: 0,
          collaborator_count: 0
        },
        legalKnowledge: {
          total_articles: 0,
          published_articles: 0
        },
        legalDocuments: {
          total_documents: 0,
          total_downloads: 0
        },
        legalNews: {
          total_news: 0,
          published_news: 0
        },
        videos: {
          total_videos: 0,
          total_video_views: 0
        },
        chats: {
          total_conversations: 0,
          active_conversations: 0
        }
      }
      this.loading = false
      this.error = null
      this.lastUpdated = null
    }
  }
}) 